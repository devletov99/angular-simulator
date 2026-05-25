import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomePageComponent 
  },
  { 
    path: 'user-page', 
    loadComponent: () => 
      import('../user-page/user-page.component').then(m => m.UserPageComponent)
  },
  { 
    path: '**', 
    loadComponent: () =>
      import('../not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
];