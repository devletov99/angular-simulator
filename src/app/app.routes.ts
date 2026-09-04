import { Routes } from '@angular/router';
import { postResolver } from './features/posts/resolvers/post.resolver';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { unauthGuard } from './core/guards/unauth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./features/posts/components/posts/posts.component').then((m) => m.PostsComponent),
      },
      {
        path: 'posts/create',
        loadComponent: () =>
          import('./features/posts/components/post-create/post-create.component').then((m) => m.PostCreateComponent),
      },
      {
        path: 'posts/:id',
        loadComponent: () =>
          import('./features/posts/components/post-detail/post-detail.component').then((m) => m.PostDetailComponent),
        resolve: { post: postResolver },
      },
      {
        path: 'user-page',
        loadComponent: () =>
          import('./features/users/user-page/user-page.component').then((m) => m.UserPageComponent),
        canActivate: [],
      },
      {
        path: 'cd-triggers',
        loadComponent: () => 
          import('./homework-28/cd-triggers/cd-triggers.component').then((m) => m.CdTriggersComponent),
      },
      {
        path: 'cd-onPush',
        loadComponent: () => 
          import('./homework-28/cd-triggers-on-push/cd-triggers-on-push.component').then((m) => m.CdTriggersOnPushComponent),
      }
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [unauthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundPageComponent),
  },
];
