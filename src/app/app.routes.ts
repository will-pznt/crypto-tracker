import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Favorites } from './features/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'favorites', component: Favorites },
  { path: '**', redirectTo: '' },
];
