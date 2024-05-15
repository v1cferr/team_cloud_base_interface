import { Component } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  project: Project = {
    id: 1,
    name: 'Test'
  }
}
