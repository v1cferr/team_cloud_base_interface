import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private readonly CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  constructor() {}

  login(username: string, password: string): boolean {
    if (username === this.CREDENTIALS.username && password === this.CREDENTIALS.password) {
      localStorage.setItem('auth-token', 'authenticated');
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('auth-token');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return localStorage.getItem('auth-token') !== null;
  }
}
