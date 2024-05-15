import { Component } from '@angular/core';
import { Project } from '../project';
import { PROJECTS } from '../mock-projects';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects : Project[] = [];
  selectedProject?: Project;

  constructor(private projectService: ProjectService){}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }
  
  onSelect(project: Project): void {
    this.selectedProject = project;
  }
}
