import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, filter, finalize, map, Observable, of, tap, combineLatest } from 'rxjs';
import { IUser } from './app/assets/interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApi: UserApiService = inject(UserApiService);
  loader: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);
  
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  usersFilter$: Observable<string> = this.filterSubject.asObservable();
    

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    const value: string | null = localStorage.getItem('users');

    if (value) {
      const user: IUser[] = JSON.parse(value);
      return of(user);
    } else {
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

  onDeleteUser(user: IUser): void {
    const users: IUser[] = this.usersSubject.value.filter((userToRemove: IUser) => userToRemove.id !== user.id);
    this.usersSubject.next(users);
  }

  addUser(user: IUser): void {
    const newUser: IUser = {
      ...user,
      id: Date.now()
    }

    this.usersSubject.next([...this.getUsers(), newUser]);
    localStorage.setItem('users', JSON.stringify(this.getUsers()));
  }

  filterUser(value: string): void{
    this.filterSubject.next(value);
  }

}