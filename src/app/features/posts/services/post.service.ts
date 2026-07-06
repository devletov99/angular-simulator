import { DestroyRef, inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  map,
  Observable,
  of,
  ReplaySubject,
  switchMap,
  tap,
} from 'rxjs';
import { PostApiService } from './post-api.service';
import { MessageService } from '../../../services/message.service';
import { IPost } from '../interfaces/IPost';
import { IPostCreate } from '../interfaces/IPostCreate';
import { IPostResponse } from '../interfaces/IPostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  postApiService: PostApiService = inject(PostApiService);
  messageService: MessageService = inject(MessageService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  private totalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  total$: Observable<number> = this.totalSubject.asObservable();

  setPost(post: IPost[]): void {
    this.postsSubject.next(post);
  }

  setTotal(total: number): void {
    this.totalSubject.next(total);
  }

  getPosts(): IPost[] {
    return this.postsSubject.getValue();
  }

  getPost(id: number): Observable<IPost> {
    return this.postApiService.getPostById(id);
  }

  loadPost(limit: number, skip: number): Observable<IPostResponse> {
    return this.postApiService.getPosts(limit, skip).pipe(
      catchError(() => {
        return of({ posts: [], total: 0, skip: 0, limit });
      }),
    );
  }

  createPost(post: IPostCreate): Observable<IPost> {
    return this.postApiService
      .createPost(post)
      .pipe(tap((post: IPost) => this.setPost([...this.getPosts(), post])));
  }

  updatePost(updatedPost: IPost): Observable<IPost> {
    return this.postApiService.updatePost(updatedPost).pipe(
      tap(() => {
        const posts: IPost[] = this.getPosts().map((post: IPost) =>
          post.id === updatedPost.id ? updatedPost : post,
        );
        this.setPost(posts);
      }),
    );
  }

  deletePost(id: number): Observable<IPost> {
    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        const updatePosts: IPost[] = this.getPosts().filter((post: IPost) => post.id !== id);
        this.setPost(updatePosts);
      }),
    );
  }

}
