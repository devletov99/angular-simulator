import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, map, Observable, of, tap } from 'rxjs';
import { IUser } from './app/assets/interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApi: UserApiService = inject(UserApiService);
  loader: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loader.loaderOn();
    return this.userApi.getUser()
      .pipe(   
        catchError(() => { this.messageService.showError('Пользователи не загружены'); 
          return of([])
        }),
        finalize(() => this.loader.loaderOff()),
      );
  }

}