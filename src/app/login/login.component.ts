import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>🏠 Sistema de Automação</h2>
        <form (ngSubmit)="login()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Usuário:</label>
            <input 
              type="text" 
              id="username"
              [(ngModel)]="username" 
              name="username"
              class="form-control"
              placeholder="admin"
              required>
          </div>
          
          <div class="form-group">
            <label for="password">Senha:</label>
            <input 
              type="password" 
              id="password"
              [(ngModel)]="password" 
              name="password"
              class="form-control"
              placeholder="admin123"
              required>
          </div>
          
          <button 
            type="submit" 
            class="btn btn-login"
            [disabled]="!loginForm.form.valid">
            Entrar
          </button>
          
          <div *ngIf="errorMessage" class="error-message">
            {{errorMessage}}
          </div>
        </form>
        
        <div class="login-info">
          <small>
            💡 <strong>Credenciais:</strong><br>
            Usuário: <code>admin</code><br>
            Senha: <code>admin123</code>
          </small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
      font-size: 24px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #555;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      transition: border-color 0.3s;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    .btn-login {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-login:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .btn-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      color: #e74c3c;
      text-align: center;
      margin-top: 15px;
      padding: 10px;
      background: #ffeaea;
      border-radius: 4px;
      border: 1px solid #e74c3c;
    }

    .login-info {
      margin-top: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      text-align: center;
    }

    .login-info small {
      color: #666;
      line-height: 1.4;
    }

    .login-info code {
      background: #e9ecef;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    // Usar o serviço de autenticação
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/projects']);
    } else {
      this.errorMessage = '❌ Usuário ou senha incorretos!';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  }
}
