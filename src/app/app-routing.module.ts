import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MovieListComponent } from './views/movie-list/movie-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'list', component: MovieListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
