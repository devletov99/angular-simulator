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
  
  users$: Observable<IUser[]> = combineLatest([this.usersSubject, this.filterSubject])
    .pipe(
      map(([users, filter]) => users.filter((user: IUser) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      )),
  );

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    const value = localStorage.getItem('users');

    if (value) {
      const user = JSON.parse(value);
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

  deleteUser(user: IUser) {
    const users: IUser[] = this.usersSubject.value.filter((userToRemove: IUser) => userToRemove !== user);
    this.usersSubject.next(users);
  }

  addUser(user: IUser): void {
    this.usersSubject.next([...this.getUsers(), user]);
    localStorage.setItem('users', JSON.stringify(this.getUsers()));
  }

  updateId(form: FormGroup) {
    form.patchValue({
      id: Date.now(),
    });
  }
  
  setDefaultValues(group: FormGroup, defaultValue: string) {
    for (const name in group.controls) {
      const control: AbstractControl = group.controls[name];

      if (control instanceof FormGroup) {
        this.setDefaultValues(control, defaultValue);
      } else if (!control.hasValidator(Validators.required)) {
        control.patchValue(defaultValue);
      }
    }
  }

  filterUser(value: string) {
    this.filterSubject.next(value);
  }

}