import { Component } from '@angular/core';
import { Project } from '../project';
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
  
  delete(project: Project): void {
    this.projectService.deleteProject(project.id).subscribe(() => this.loadProjects());
    this.selectedProject = undefined;
  }

  add(name: string): void {
    this.projectService.insertProject({name} as Project).subscribe(() => this.loadProjects());
  }
  
  onSelect(project: Project): void {
    this.selectedProject = project;
  }
}
