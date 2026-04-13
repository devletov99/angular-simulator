import { Component, DestroyRef, inject} from '@angular/core';
import { UserService } from '../user.service';
import { Observable, tap } from 'rxjs';
import { IUser } from '../app/assets/interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserCardComponent } from '../user/user-card.component';
import { CreateUserComponent } from "../create-user/create-user.component";
import { UsersFilterComponent } from "../users-filter/users-filter.component";


@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {

  userService: UserService = inject(UserService);
  destroyRef: DestroyRef = inject(DestroyRef);
  users$: Observable<IUser[]> = this.userService.users$;

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }

  updateUsers() {
    localStorage.removeItem('users');
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }

  onFilterUsers(value: string) {
    this.userService.filterUser(value);
  }

}