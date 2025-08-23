import { Injectable } from '@angular/core';
import { Project, CreateProjectRequest } from './project';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = `${environment.apiUrl}/projects`;
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin123')
    })
  };

  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.projectsUrl, this.httpOptions)
  }

  getProjectById(id: number): Observable<Project> {
    return this.httpClient.get<Project>(`${this.projectsUrl}/${id}`, this.httpOptions);
  }

  updateProject(project: Project): Observable<any> {
    return this.httpClient.put(`${this.projectsUrl}/${project.id}`, { name: project.name }, this.httpOptions)
  }

  insertProject(project: CreateProjectRequest): Observable<any> {
    return this.httpClient.post(this.projectsUrl, project, this.httpOptions);
  }

  deleteProject(id: Number): Observable<any> {
    return this.httpClient.delete(`${this.projectsUrl}/${id}`, this.httpOptions);
  }

}