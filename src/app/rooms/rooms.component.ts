import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room, CreateRoomRequest } from '../models/room';
import { ProjectService } from '../project.service';
import { Project } from '../project';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Ambientes do Projeto: {{project?.name}}</h2>
      
      <!-- Add Room Form -->
      <div class="add-room-form">
        <h3>Adicionar Novo Ambiente</h3>
        <div class="form-group">
          <input 
            [(ngModel)]="newRoomName" 
            placeholder="Nome do ambiente"
            class="form-control"
            type="text">
          <button (click)="addRoom()" class="btn btn-primary">Adicionar Ambiente</button>
        </div>
      </div>

      <!-- Rooms List -->
      <div class="rooms-list">
        <h3>Ambientes</h3>
        <div *ngIf="rooms.length === 0" class="no-items">
          Nenhum ambiente encontrado
        </div>
        <div *ngFor="let room of rooms" class="room-item">
          <div class="room-info">
            <span class="room-name">{{room.name}}</span>
            <div class="room-actions">
              <button (click)="editRoom(room)" class="btn btn-edit">Editar</button>
              <button (click)="deleteRoom(room.id)" class="btn btn-delete">Excluir</button>
              <button (click)="viewLamps(room.id)" class="btn btn-view">Ver Lâmpadas</button>
            </div>
          </div>
          
          <!-- Edit Form -->
          <div *ngIf="editingRoom?.id === room.id" class="edit-form">
            <input 
              [(ngModel)]="editingRoom!.name" 
              class="form-control"
              type="text">
            <button (click)="updateRoom()" class="btn btn-save">Salvar</button>
            <button (click)="cancelEdit()" class="btn btn-cancel">Cancelar</button>
          </div>
        </div>
      </div>

      <button (click)="goBack()" class="btn btn-secondary">Voltar aos Projetos</button>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .add-room-form {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
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

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .btn-edit {
      background-color: #28a745;
      color: white;
      margin-right: 5px;
    }

    .btn-delete {
      background-color: #dc3545;
      color: white;
      margin-right: 5px;
    }

    .btn-view {
      background-color: #17a2b8;
      color: white;
    }

    .btn-save {
      background-color: #28a745;
      color: white;
      margin-right: 5px;
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

    .rooms-list h3 {
      margin-bottom: 15px;
    }

    .room-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
      background: white;
    }

    .room-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .room-name {
      font-weight: bold;
      font-size: 16px;
    }

    .room-actions {
      display: flex;
      gap: 5px;
    }

    .edit-form {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .no-items {
      text-align: center;
      color: #6c757d;
      font-style: italic;
      padding: 20px;
    }
  `]
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  project: Project | null = null;
  projectId: number = 0;
  newRoomName: string = '';
  editingRoom: Room | null = null;

  constructor(
    private roomService: RoomService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.loadProject();
      this.loadRooms();
    });
  }

  loadProject(): void {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => this.project = project,
      error: (error) => console.error('Error loading project:', error)
    });
  }

  loadRooms(): void {
    this.roomService.getRoomsByProjectId(this.projectId).subscribe({
      next: (rooms) => this.rooms = rooms,
      error: (error) => console.error('Error loading rooms:', error)
    });
  }

  addRoom(): void {
    if (this.newRoomName.trim()) {
      const newRoom: CreateRoomRequest = {
        name: this.newRoomName.trim(),
        projectId: this.projectId
      };

      this.roomService.createRoom(newRoom).subscribe({
        next: () => {
          this.newRoomName = '';
          this.loadRooms();
        },
        error: (error) => console.error('Error creating room:', error)
      });
    }
  }

  editRoom(room: Room): void {
    this.editingRoom = { ...room };
  }

  updateRoom(): void {
    if (this.editingRoom && this.editingRoom.name.trim()) {
      this.roomService.updateRoom(this.editingRoom.id, { 
        name: this.editingRoom.name.trim(),
        projectId: this.projectId
      }).subscribe({
        next: () => {
          this.editingRoom = null;
          this.loadRooms();
        },
        error: (error) => console.error('Error updating room:', error)
      });
    }
  }

  cancelEdit(): void {
    this.editingRoom = null;
  }

  deleteRoom(id: number): void {
    if (confirm('Tem certeza que deseja excluir este ambiente?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => this.loadRooms(),
        error: (error) => console.error('Error deleting room:', error)
      });
    }
  }

  viewLamps(roomId: number): void {
    this.router.navigate(['/projects', this.projectId, 'rooms', roomId, 'lamps']);
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}
