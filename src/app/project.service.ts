import { Injectable } from '@angular/core';
import { Project } from './project';
import { PROJECTS } from './mock-projects';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }


  getProjects(): Observable<Project[]> {
    const projects = of(PROJECTS);
    return projects;
  }

}
