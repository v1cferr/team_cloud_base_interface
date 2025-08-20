import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, CreateRoomRequest } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/rooms';
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin123')
    })
  };

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl, this.httpOptions);
  }

  getRoomsByProjectId(projectId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/project/${projectId}`, this.httpOptions);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  createRoom(room: CreateRoomRequest): Observable<any> {
    return this.http.post(this.apiUrl, room, this.httpOptions);
  }

  updateRoom(id: number, room: { name: string, projectId: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, room, this.httpOptions);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
