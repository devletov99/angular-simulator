import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/IPost';
import { IPostCreate } from '../interfaces/IPostCreate';
import { IPostsResponse } from '../interfaces/IPostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number): Observable<IPostsResponse> {
    const params: HttpParams = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString())
      .set('select', 'title,tags,views');

    return this.httpClient.get<IPostsResponse>(this.apiUrl, { params });
  }

  getPostById(id: number): Observable<IPost> {
    return this.httpClient.get<IPost>(`${this.apiUrl}/${id}`);
  }

  deletePost(id: number): Observable<IPost> {
    return this.httpClient.delete<IPost>(`${this.apiUrl}/${id}`)
  }

  publishPost(post: IPostCreate) {
    return this.httpClient.post<IPost>(`${this.apiUrl}/add`, post)
  }

}
