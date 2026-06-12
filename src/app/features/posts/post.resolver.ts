import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { IPost } from '../interfaces/IPost';
import { PostService } from './services/post.service';

export const postResolver: ResolveFn<IPost> = (route, state) => {
  const postService: PostService = inject(PostService);
  return postService.getPost(+route.paramMap.get('id')!)
};
