import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, tap } from 'rxjs';
import { IUser } from '../app/assets/interfaces/IUser';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {

  private userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((user: IUser[]) => this.userService.setUsers(user)),
      ).subscribe();
  }

}