import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesPage } from './favourites.page';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    canActivate:[AuthGuard],
    path: '',
    component: FavouritesPage,
    canActivateChild:[AuthGuard]

  }

];

@NgModule({
  declarations: [FavouritesPage],
  imports: [CommonModule, RouterModule.forChild(routes),FormsModule],
})
export class UsersModule {}
