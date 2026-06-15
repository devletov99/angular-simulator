import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, map, Observable, of, ReplaySubject, switchMap, tap } from 'rxjs';
import { PostApiService } from './post-api.service';
import { MessageService } from '../../../services/message.service';
import { IPost } from '../interfaces/IPost';
import { IPostCreate } from '../interfaces/IPostCreate';
import { IPostsResponse } from '../interfaces/IPostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  postApiService: PostApiService = inject(PostApiService);
  messageService: MessageService = inject(MessageService);
  destroyRef: DestroyRef = inject(DestroyRef);
 
  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject <IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  private postSubject: ReplaySubject<IPost> = new ReplaySubject<IPost>(1)
  post$: Observable<IPost> = this.postSubject.asObservable()

  private totalRecord: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  total$: Observable<number> = this.totalRecord.asObservable();

  setPost(post: IPost[]): void {
    this.postsSubject.next(post);
  }

  setDetailPost(post: IPost): void {
    this.postSubject.next(post)
  }

  getPosts(): IPost[] {
    return this.postsSubject.getValue();
  }

  getPost(id: number): Observable<IPost> {
   return this.postApiService.getPostById(id);
  }

  loadPost(limit: number, skip: number): Observable<IPostsResponse> {
    return this.postApiService.getPosts(limit, skip)
     .pipe(
      tap(),
      catchError(() => {
        this.messageService.showError('Посты не загружены');
        return of({ posts: [], total: 0, skip: 0, limit });
      }),
     );
  }

  publishPost(post: IPostCreate): Observable<IPost> {
    return this.postApiService.publishPost(post)
      .pipe(
        catchError(() => { 
          this.messageService.showError('Не удалось опубликовать.');
          return of();
        })
      );
  }

  updatePost(updatedPost: IPost) {
    const updated: IPost[] = this.getPosts()
      .map(post => {
        if (post.id === updatedPost.id) {
          return { ...post, ...updatedPost }
        }
        return post;
      });
    this.setPost(updated);
  }

  deletePost(id: number): void {
    this.postApiService.deletePost(id)
      .pipe(
        tap(() => {
          const updatePosts: IPost[] = this.getPosts().filter(post => post.id !== id);
          this.setPost(updatePosts);
        }),
        catchError(() => {
          this.messageService.showError('Не удалось удалить пост');
          return of(null);
      }),
      ).subscribe();
  }

  setTotal(total: number) {
    this.totalRecord.next(total);
  }
  
}
