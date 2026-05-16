import { Component, DestroyRef, inject, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { BehaviorSubject, combineLatest, map, Observable, pipe, tap } from 'rxjs';
import { IUser } from '../app/assets/interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user/user-card.component';
import { CreateUserComponent } from "../create-user/create-user.component";
import { UsersFilterComponent } from "../users-filter/users-filter.component";
import { LocalStorageService } from '../local-storage.service';
import { PluralizePipe } from '../pipes/pluralize.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddBoldDirective } from '../directive/add-bold.directive';

@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent, PluralizePipe, AddBoldDirective],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {

  userService: UserService = inject(UserService);
  localStorage: LocalStorageService = inject(LocalStorageService);
  destroyRef: DestroyRef = inject(DestroyRef);

  usersQuantity!: number;

  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  filteredUsers$: Observable<IUser[]> = combineLatest([this.userService.users$, this.filterSubject])
    .pipe(
      map(([users, filter]) => users.filter((user: IUser) => user.name.toLowerCase().includes(filter.toLowerCase()))),
    );

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();

    this.filteredUsers$.pipe(
      tap(users => this.usersQuantity = users.length),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
    
  }

  updateUsers(): void {
    this.localStorage.removeElement('users');
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
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