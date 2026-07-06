import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, combineLatest, map, Observable, pipe, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { PluralizePipe } from '../../pipes/pluralize.pipe';
import { AddBoldDirective } from '../../directive/add-bold.directive';
import { IUser } from '../../interfaces/IUser';
import { UserCardComponent } from '../user/user-card.component';

@Component({
  selector: 'app-user-page',
  imports: [
    AsyncPipe,
    UserCardComponent,
    CreateUserComponent,
    UsersFilterComponent,
    PluralizePipe,
    AddBoldDirective,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {

  userService: UserService = inject(UserService);
  localStorage: LocalStorageService = inject(LocalStorageService);
  destroyRef: DestroyRef = inject(DestroyRef);

  usersQuantity!: number;

  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.userService.users$,
    this.filterSubject,
  ]).pipe(
    map(([users, filter]: [IUser[], string]) =>
      users.filter((user: IUser) => user.name.toLowerCase().includes(filter.toLowerCase())),
    ),
    tap((users: IUser[]) => (this.usersQuantity = users.length)),
  );

  ngOnInit(): void {
    this.userService
      .loadUsers()
      .pipe(tap((users: IUser[]) => this.userService.setUsers(users)))
      .subscribe();
  }

  updateUsers(): void {
    this.localStorage.removeElement('users');
    this.userService
      .loadUsers()
      .pipe(tap((users: IUser[]) => this.userService.setUsers(users)))
      .subscribe();
  }

  onFilterUsers(value: string): void {
    this.filterSubject.next(value);
  }

  onSubmitForm(user: IUser): void {
    this.userService.addUser(user);
  }

  onDeleteUser(user: IUser) {
    this.userService.deleteUser(user);
  }

}
