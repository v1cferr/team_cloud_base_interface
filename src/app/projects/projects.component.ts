import { Component } from '@angular/core';
import { Project } from '../project';
import { PROJECTS } from '../mock-projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects = PROJECTS;
  selectedProject?: Project;
  
  onSelect(project: Project): void {
    this.selectedProject = project;
  }
}
