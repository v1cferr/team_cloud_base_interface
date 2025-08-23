import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lamp, CreateLampRequest } from '../models/lamp';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LampService {
  private apiUrl = `${environment.apiUrl}/lamps`;
  private wsUrl = environment.wsUrl;
  private socket: WebSocket | null = null;
  private lampUpdatesSubject = new Subject<Lamp[]>();
  
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin123')
    })
  };

  constructor(private http: HttpClient) {
    this.connectWebSocket();
  }

  private connectWebSocket(): void {
    try {
      // Using SockJS/STOMP client might be better, but let's try simple WebSocket first
      this.socket = new WebSocket(this.wsUrl);
      
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        // Subscribe to lamp status updates
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify({ type: 'subscribe', topic: '/topic/lamps' }));
        }
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data)) {
            const mappedLamps = data.map((lamp: any) => ({
              ...lamp,
              isOn: lamp.status || lamp.isOn
            }));
            this.lampUpdatesSubject.next(mappedLamps);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected, attempting to reconnect...');
        setTimeout(() => this.connectWebSocket(), 5000);
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }

  getLampUpdates(): Observable<Lamp[]> {
    return this.lampUpdatesSubject.asObservable();
  }

  getLamps(): Observable<Lamp[]> {
    return this.http.get<Lamp[]>(this.apiUrl, this.httpOptions).pipe(
      map((lamps: any[]) => lamps.map(lamp => ({
        ...lamp,
        isOn: lamp.status || lamp.isOn
      })))
    );
  }

  getLampsByRoomId(roomId: number): Observable<Lamp[]> {
    return this.http.get<Lamp[]>(`${this.apiUrl}/room/${roomId}`, this.httpOptions).pipe(
      map((lamps: any[]) => lamps.map(lamp => ({
        ...lamp,
        isOn: lamp.status || lamp.isOn
      })))
    );
  }

  getLampsByProjectId(projectId: number): Observable<Lamp[]> {
    return this.http.get<Lamp[]>(`${this.apiUrl}/project/${projectId}`, this.httpOptions).pipe(
      map((lamps: any[]) => lamps.map(lamp => ({
        ...lamp,
        isOn: lamp.status || lamp.isOn
      })))
    );
  }

  getLampById(id: number): Observable<Lamp> {
    return this.http.get<Lamp>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  createLamp(lamp: CreateLampRequest): Observable<any> {
    return this.http.post(this.apiUrl, lamp, this.httpOptions);
  }

  updateLamp(id: number, lamp: { name: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/name`, lamp, this.httpOptions);
  }

  toggleLamp(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/toggle`, {}, this.httpOptions);
  }

  deleteLamp(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
