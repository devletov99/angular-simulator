import { Routes } from '@angular/router';
import { postResolver } from './features/posts/resolvers/post.resolver';

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
    path: 'posts',
    loadComponent: () => 
      import('./features/posts/components/posts/posts.component').then(m => m.PostsComponent),
  },
  {
    path: 'posts/create',
    loadComponent: () => import('./features/posts/components/post-create/post-create.component').then(m => m.PostCreateComponent),
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./features/posts/components/post-detail/post-detail.component').then(m => m.PostDetailComponent),
    resolve: {
      post: postResolver
    }
  },
  { 
    path: '**', 
    loadComponent: () =>
      import('./components/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
];