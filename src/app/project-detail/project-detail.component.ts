import { Component, Input } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  @Input() project?: Project;

  constructor(private projectService: ProjectService){}

  update(): void {
    if (this.project) {
      this.projectService.updateProject(this.project).subscribe(() => console.log("update project"))
    }
  }

}
