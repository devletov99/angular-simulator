import { Component, DestroyRef, inject, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { combineLatest, map, Observable, pipe, tap } from 'rxjs';
import { IUser } from '../app/assets/interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user/user-card.component';
import { CreateUserComponent } from "../create-user/create-user.component";
import { UsersFilterComponent } from "../users-filter/users-filter.component";
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent, ReactiveFormsModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {

  userService: UserService = inject(UserService);

  filteredUsers$: Observable<[IUser[], string]> = combineLatest([this.userService.users$, this.userService.usersFilter$]);

  users$: Observable<IUser[]> = this.filteredUsers$.pipe(
    map(([users, filter]) => users.filter((user: IUser) => user.name.toLowerCase().includes(filter.toLowerCase()))),
  );


  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
  }

  updateUsers(): void {
    localStorage.removeItem('users');
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
  }

  onFilterUsers(value: string): void {
    this.userService.filterUser(value);
  }

  onSubmitForm(user: IUser): void {
    this.userService.addUser(user);
  }
    
}