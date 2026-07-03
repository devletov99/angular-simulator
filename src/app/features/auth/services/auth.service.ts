import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, tap } from 'rxjs';
import { ILogin } from '../interfaces/ILogin';
import { LocalStorageService } from '../../../services/local-storage.service';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { IAuthUser } from '../interfaces/IAuthUser';
import { IToken } from '../interfaces/IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpClient: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private apiUrl: string = 'https://dummyjson.com/auth';

  private currentUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  currentUser$: Observable<IAuthUser | null> = this.currentUserSubject.asObservable();

  setUser(user: IAuthUser): void {
    this.currentUserSubject.next(user);
  }

  setTokens(tokens: IToken): void {
    this.localStorageService.setValue('tokens', tokens);
  }

  getUser(): IAuthUser | null {
    return this.currentUserSubject.getValue();
  }

  getTokens(): IToken | null {
    return this.localStorageService.getValue<IToken>('tokens')
  }

  login(credentials: ILogin): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${ this.apiUrl }/login`, credentials)
      .pipe(
        tap((response: IAuthResponse) => {
          this.setUser(response);
          this.setTokens({ 
              accessToken: response.accessToken,  
              refreshToken: response.refreshToken
          });
        }),
      )
  }

  getCurrentUser(): Observable<IAuthUser> {
    if (this.getTokens()) {
      return this.httpClient.get<IAuthUser>(`${ this.apiUrl }/me`, {
        headers: { 
          Authorization: `Bearer ${ this.getTokens()?.accessToken }` 
        }
      })
        .pipe(
          tap((user: IAuthUser) => this.setUser(user)),
        );
    }
    return EMPTY;
  }

  refresh(): Observable<IAuthResponse> {
    const tokens: IToken | null = this.getTokens();
    return this.httpClient.post<IAuthResponse>(`${ this.apiUrl }/refresh`, { refreshToken: tokens?.refreshToken })
      .pipe(
        tap((response: IAuthResponse) => this.setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        })),
      )
  }

  logout(): void {
    this.localStorageService.removeElement('tokens');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
  
}
