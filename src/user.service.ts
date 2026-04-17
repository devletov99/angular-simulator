import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { IUser } from './app/assets/interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApi: UserApiService = inject(UserApiService);
  loader: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);
  localStorage: LocalStorageService = inject(LocalStorageService);
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorage.setValue('users', users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    const userStorage: IUser[] = this.localStorage.getValue<IUser[]>('users') ?? [];

    if (userStorage.length > 0) {
      return of(userStorage);
    } else {
      this.loader.showLoader();
      return this.userApi.getUsers()
        .pipe(  
          catchError(() => { 
            this.messageService.showError('Пользователи не загружены'); 
            return of([]);
          }),
          finalize(() => this.loader.hideLoader()),
        );
      }  
  }

  onDeleteUser(user: IUser): void {
    const users: IUser[] = this.getUsers().filter((userToRemove: IUser) => userToRemove.id !== user.id);
    this.setUsers(users);
  }

  addUser(user: IUser): void {
    this.setUsers([...this.getUsers(), user]);
  }

}