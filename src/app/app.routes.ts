import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => 
      import('./components/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  { 
    path: 'user-page', 
    loadComponent: () => 
      import('./components/user-page/user-page.component').then(m => m.UserPageComponent)
  },
  { 
    path: '**', 
    loadComponent: () =>
      import('./components/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
];