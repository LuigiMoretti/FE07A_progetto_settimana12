import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesPage } from './movies.page';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {canActivate:[AuthGuard], path: '', component: MoviesPage },
];

@NgModule({
  declarations: [MoviesPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MoviesModule {}
