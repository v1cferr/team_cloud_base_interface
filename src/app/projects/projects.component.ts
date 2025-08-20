import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Project, CreateProjectRequest } from '../project';
import { ProjectService } from '../project.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>🏠 Sistema de Automação Residencial</h1>
        <button (click)="logout()" class="btn btn-logout">Sair</button>
      </div>
      
      <!-- Add Project Form -->
      <div class="add-project-form">
        <h2>Criar Novo Projeto</h2>
        <div class="form-group">
          <input 
            [(ngModel)]="newProjectName" 
            placeholder="Nome do projeto"
            class="form-control"
            type="text"
            (keyup.enter)="addProject()">
          <button (click)="addProject()" class="btn btn-primary">Criar Projeto</button>
        </div>
      </div>

      <!-- Projects List -->
      <div class="projects-list">
        <h2>Meus Projetos</h2>
        <div *ngIf="projects.length === 0" class="no-projects">
          <p>🎯 Nenhum projeto encontrado</p>
          <p>Crie seu primeiro projeto de automação residencial!</p>
        </div>
        
        <div class="projects-grid">
          <div *ngFor="let project of projects" class="project-card">
            <div class="project-header">
              <h3>{{project.name}}</h3>
              <div class="project-actions">
                <button (click)="editProject(project)" class="btn btn-edit" title="Editar projeto">
                  ✏️
                </button>
                <button (click)="deleteProject(project)" class="btn btn-delete" title="Excluir projeto">
                  🗑️
                </button>
              </div>
            </div>
            
            <!-- Edit Form -->
            <div *ngIf="editingProject?.id === project.id" class="edit-form">
              <input 
                [(ngModel)]="editingProject!.name" 
                class="form-control"
                type="text"
                (keyup.enter)="updateProject()">
              <div class="edit-actions">
                <button (click)="updateProject()" class="btn btn-save">Salvar</button>
                <button (click)="cancelEdit()" class="btn btn-cancel">Cancelar</button>
              </div>
            </div>
            
            <div class="project-content">
              <p class="project-description">Gerencie ambientes e dispositivos</p>
              <button (click)="viewRooms(project.id)" class="btn btn-primary btn-full">
                🏠 Gerenciar Ambientes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    h1 {
      color: #2c3e50;
      font-size: 2.5rem;
      margin: 0;
    }

    .btn-logout {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.3s;
    }

    .btn-logout:hover {
      background: #c0392b;
    }

    .add-project-form {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 40px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    .add-project-form h2 {
      margin-bottom: 20px;
      font-size: 1.5rem;
    }

    .form-group {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .form-control {
      flex: 1;
      padding: 12px 16px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .form-control:focus {
      outline: none;
      box-shadow: 0 2px 15px rgba(0,0,0,0.2);
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .btn-primary {
      background: linear-gradient(135deg, #4CAF50, #45a049);
      color: white;
    }

    .btn-edit {
      background-color: #3498db;
      color: white;
      padding: 8px 12px;
      margin-right: 8px;
    }

    .btn-delete {
      background-color: #e74c3c;
      color: white;
      padding: 8px 12px;
    }

    .btn-save {
      background-color: #27ae60;
      color: white;
      margin-right: 8px;
    }

    .btn-cancel {
      background-color: #95a5a6;
      color: white;
    }

    .btn-full {
      width: 100%;
      margin-top: 15px;
    }

    .projects-list h2 {
      color: #2c3e50;
      margin-bottom: 25px;
      font-size: 1.8rem;
    }

    .no-projects {
      text-align: center;
      padding: 60px 20px;
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 25px;
    }

    .project-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
      border: 1px solid #ecf0f1;
      transition: all 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .project-header h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.3rem;
      flex: 1;
    }

    .project-actions {
      display: flex;
      gap: 5px;
    }

    .project-content {
      padding-top: 15px;
    }

    .project-description {
      color: #7f8c8d;
      margin-bottom: 10px;
      font-size: 0.95rem;
    }

    .edit-form {
      margin-bottom: 15px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .edit-actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    @media (max-width: 768px) {
      .form-group {
        flex-direction: column;
        align-items: stretch;
      }
      
      .projects-grid {
        grid-template-columns: 1fr;
      }
      
      .project-header {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      
      .project-actions {
        justify-content: center;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  newProjectName: string = '';
  editingProject: Project | null = null;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => this.projects = projects,
      error: (error) => console.error('Error loading projects:', error)
    });
  }

  addProject(): void {
    if (this.newProjectName.trim()) {
      const newProject: CreateProjectRequest = {
        name: this.newProjectName.trim()
      };

      this.projectService.insertProject(newProject).subscribe({
        next: () => {
          this.newProjectName = '';
          this.loadProjects();
        },
        error: (error) => console.error('Error creating project:', error)
      });
    }
  }

  editProject(project: Project): void {
    this.editingProject = { ...project };
  }

  updateProject(): void {
    if (this.editingProject && this.editingProject.name.trim()) {
      this.projectService.updateProject(this.editingProject).subscribe({
        next: () => {
          this.editingProject = null;
          this.loadProjects();
        },
        error: (error) => console.error('Error updating project:', error)
      });
    }
  }

  cancelEdit(): void {
    this.editingProject = null;
  }

  deleteProject(project: Project): void {
    if (confirm(`Tem certeza que deseja excluir o projeto "${project.name}"?`)) {
      this.projectService.deleteProject(project.id).subscribe({
        next: () => this.loadProjects(),
        error: (error) => console.error('Error deleting project:', error)
      });
    }
  }

  viewRooms(projectId: number): void {
    this.router.navigate(['/projects', projectId, 'rooms']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
