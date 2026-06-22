import { Routes } from '@angular/router';
import { postResolver } from './features/posts/resolvers/post.resolver';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { guestGuard } from './features/auth/guards/guest.guard';

export const routes: Routes = [
 
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { 
        path: '', 
        loadComponent: () => 
          import('./components/home-page/home-page.component').then(m => m.HomePageComponent),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./features/posts/components/posts/posts.component').then(m => m.PostsComponent),
      },
      {
        path: 'posts/create',
        loadComponent: () =>
          import('./features/posts/components/post-create/post-create.component').then(m => m.PostCreateComponent),
      },
      {
        path: 'posts/:id',
        loadComponent: () =>
          import('./features/posts/components/post-detail/post-detail.component').then(m => m.PostDetailComponent),
        resolve: { post: postResolver }
      },
      { 
        path: 'user-page', 
        loadComponent: () => 
          import('./components/user-page/user-page.component').then(m => m.UserPageComponent),
      },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/components/login/login.component').then(m => m.LoginComponent),
      }
    ]
  },
  { 
    path: '**', 
    loadComponent: () =>
      import('./components/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent),
  },
];
