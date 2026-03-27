import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from './app/assets/interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApi: UserApiService = inject(UserApiService);
  loader: LoaderService = inject(LoaderService);
  
  private users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.users.asObservable();

  setUsers(user: IUser[]): void {
    this.users.next(user);
  }

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  loadUsers(): Observable<IUser[]> {
    this.loader.loaderOn();

    return this.userApi.getUser().pipe(
      tap((user: IUser[]) => this.setUsers(user)),
      catchError(() => of([])),
      finalize(() => this.loader.loaderOff())
    );
  }
  
}