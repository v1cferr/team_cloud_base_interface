import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LampService } from '../services/lamp.service';
import { RoomService } from '../services/room.service';
import { Lamp, CreateLampRequest } from '../models/lamp';
import { Room } from '../models/room';

@Component({
  selector: 'app-lamps',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Lâmpadas do Ambiente: {{room?.name}}</h2>
      
      <!-- Add Lamp Form -->
      <div class="add-lamp-form">
        <h3>Adicionar Nova Lâmpada</h3>
        <div class="form-group">
          <input 
            [(ngModel)]="newLampName" 
            placeholder="Nome da lâmpada"
            class="form-control"
            type="text">
          <button (click)="addLamp()" class="btn btn-primary">Adicionar Lâmpada</button>
        </div>
      </div>

      <!-- Real-time Status Indicator -->
      <div class="status-indicator">
        <span class="status-dot" [class.online]="isConnected"></span>
        {{isConnected ? 'Conectado' : 'Desconectado'}} - Atualizações em tempo real
      </div>

      <!-- Lamps List -->
      <div class="lamps-list">
        <h3>Lâmpadas</h3>
        <div *ngIf="lamps.length === 0" class="no-items">
          Nenhuma lâmpada encontrada
        </div>
        <div *ngFor="let lamp of lamps" class="lamp-item" [class.lamp-on]="lamp.isOn">
          <div class="lamp-info">
            <div class="lamp-details">
              <span class="lamp-name">{{lamp.name}}</span>
              <span class="lamp-status" [class.status-on]="lamp.isOn">
                {{lamp.isOn ? 'LIGADA' : 'DESLIGADA'}}
              </span>
            </div>
            
            <div class="lamp-actions">
              <button 
                (click)="toggleLamp(lamp.id)" 
                class="btn btn-toggle"
                [class.btn-on]="lamp.isOn"
                [class.btn-off]="!lamp.isOn">
                {{lamp.isOn ? '💡 Desligar' : '🔘 Ligar'}}
              </button>
              <button (click)="editLamp(lamp)" class="btn btn-edit">✏️ Editar</button>
              <button (click)="deleteLamp(lamp.id)" class="btn btn-delete">🗑️ Excluir</button>
            </div>
          </div>
          
          <!-- Edit Form -->
          <div *ngIf="editingLamp?.id === lamp.id" class="edit-form">
            <input 
              [(ngModel)]="editingLamp!.name" 
              class="form-control"
              type="text">
            <button (click)="updateLamp()" class="btn btn-save">Salvar</button>
            <button (click)="cancelEdit()" class="btn btn-cancel">Cancelar</button>
          </div>
        </div>
      </div>

      <button (click)="goBack()" class="btn btn-secondary">Voltar aos Ambientes</button>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .add-lamp-form {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .form-control {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      padding: 10px;
      background: #e9ecef;
      border-radius: 4px;
      font-size: 14px;
    }

    .status-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #dc3545;
      animation: pulse 2s infinite;
    }

    .status-dot.online {
      background-color: #28a745;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      margin-right: 5px;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-toggle {
      font-weight: bold;
      min-width: 100px;
    }

    .btn-on {
      background-color: #ffc107;
      color: #212529;
      box-shadow: 0 0 15px rgba(255, 193, 7, 0.5);
    }

    .btn-off {
      background-color: #6c757d;
      color: white;
    }

    .btn-edit {
      background-color: #28a745;
      color: white;
    }

    .btn-delete {
      background-color: #dc3545;
      color: white;
    }

    .btn-save {
      background-color: #28a745;
      color: white;
    }

    .btn-cancel {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
      margin-top: 20px;
    }

    .lamps-list h3 {
      margin-bottom: 15px;
    }

    .lamp-item {
      border: 2px solid #ddd;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 15px;
      background: white;
      transition: all 0.3s ease;
    }

    .lamp-item.lamp-on {
      border-color: #ffc107;
      background: linear-gradient(145deg, #fff9e6, #ffffff);
      box-shadow: 0 4px 20px rgba(255, 193, 7, 0.2);
    }

    .lamp-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
    }

    .lamp-details {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .lamp-name {
      font-weight: bold;
      font-size: 18px;
      color: #333;
    }

    .lamp-status {
      font-weight: 600;
      font-size: 14px;
      padding: 4px 12px;
      border-radius: 20px;
      text-align: center;
      min-width: 80px;
    }

    .lamp-status.status-on {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .lamp-status:not(.status-on) {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .lamp-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .edit-form {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .no-items {
      text-align: center;
      color: #6c757d;
      font-style: italic;
      padding: 40px;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .lamp-info {
        flex-direction: column;
        align-items: stretch;
      }
      
      .lamp-actions {
        justify-content: center;
      }
      
      .form-group {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `]
})
export class LampsComponent implements OnInit, OnDestroy {
  lamps: Lamp[] = [];
  room: Room | null = null;
  projectId: number = 0;
  roomId: number = 0;
  newLampName: string = '';
  editingLamp: Lamp | null = null;
  isConnected: boolean = false;
  private lampUpdatesSubscription: Subscription | null = null;

  constructor(
    private lampService: LampService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.roomId = +params['roomId'];
      this.loadRoom();
      this.loadLamps();
      this.subscribeToLampUpdates();
    });
  }

  ngOnDestroy(): void {
    if (this.lampUpdatesSubscription) {
      this.lampUpdatesSubscription.unsubscribe();
    }
  }

  loadRoom(): void {
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (room) => this.room = room,
      error: (error) => console.error('Error loading room:', error)
    });
  }

  loadLamps(): void {
    this.lampService.getLampsByRoomId(this.roomId).subscribe({
      next: (lamps) => {
        this.lamps = this.sortLamps(lamps);
      },
      error: (error) => console.error('Error loading lamps:', error)
    });
  }

  private sortLamps(lamps: Lamp[]): Lamp[] {
    return lamps.sort((a, b) => {
      // Lâmpadas LIGADAS primeiro (status true = 1, false = 0)
      // Depois ordena por nome alfabeticamente
      const statusA = a.isOn ? 1 : 0;
      const statusB = b.isOn ? 1 : 0;
      
      if (statusB !== statusA) {
        return statusB - statusA; // Ligadas (1) antes de desligadas (0)
      }
      
      // Se o status for igual, ordena alfabeticamente por nome
      return a.name.localeCompare(b.name);
    });
  }

  subscribeToLampUpdates(): void {
    this.lampUpdatesSubscription = this.lampService.getLampUpdates().subscribe({
      next: (updatedLamps) => {
        this.isConnected = true;
        // Update only lamps from this room
        this.lamps = this.lamps.map(lamp => {
          const updatedLamp = updatedLamps.find(ul => ul.id === lamp.id);
          return updatedLamp || lamp;
        });
        // Reordena as lâmpadas após atualização
        this.lamps = this.sortLamps(this.lamps);
      },
      error: (error) => {
        this.isConnected = false;
        console.error('WebSocket error:', error);
      }
    });
  }

  addLamp(): void {
    if (this.newLampName.trim()) {
      const newLamp: CreateLampRequest = {
        name: this.newLampName.trim(),
        roomId: this.roomId
      };

      this.lampService.createLamp(newLamp).subscribe({
        next: () => {
          this.newLampName = '';
          this.loadLamps();
        },
        error: (error) => console.error('Error creating lamp:', error)
      });
    }
  }

  editLamp(lamp: Lamp): void {
    this.editingLamp = { ...lamp };
  }

  updateLamp(): void {
    if (this.editingLamp && this.editingLamp.name.trim()) {
      this.lampService.updateLamp(this.editingLamp.id, { name: this.editingLamp.name.trim() }).subscribe({
        next: () => {
          this.editingLamp = null;
          this.loadLamps();
        },
        error: (error) => console.error('Error updating lamp:', error)
      });
    }
  }

  cancelEdit(): void {
    this.editingLamp = null;
  }

  toggleLamp(id: number): void {
    this.lampService.toggleLamp(id).subscribe({
      next: () => this.loadLamps(),
      error: (error) => console.error('Error toggling lamp:', error)
    });
  }

  deleteLamp(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta lâmpada?')) {
      this.lampService.deleteLamp(id).subscribe({
        next: () => this.loadLamps(),
        error: (error) => console.error('Error deleting lamp:', error)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/projects', this.projectId, 'rooms']);
  }
}
