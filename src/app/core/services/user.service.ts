import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthService } from './auth.service';
import { IAuthUser } from '../interfaces/IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private authService: AuthService = inject(AuthService);

  userState: WritableSignal<IAuthUser | null> = signal(this.authService.getUser());

}
