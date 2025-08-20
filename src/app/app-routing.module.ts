import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LampsComponent } from './lamps/lamps.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:projectId/rooms', component: RoomsComponent },
  { path: 'projects/:projectId/rooms/:roomId/lamps', component: LampsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
