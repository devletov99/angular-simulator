import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../../services/loader.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private loaderService: LoaderService = inject(LoaderService);
  errMessage: string | null = null;

  authForm: FormGroup = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  auth(): void {
    this.loaderService.showLoader();
    this.authService
      .login(this.authForm.value)
        .pipe(
          tap(() => this.router.navigate(['/'])),
          catchError((err: HttpErrorResponse) => {
            this.errMessage =
              err.status === 400
                ? 'Неверный email или пароль.'
                : 'Не удалось войти. Попрбуйте позже.';
            return EMPTY;
          }),
          finalize(() => this.loaderService.hideLoader()),
        ).subscribe();
  }

}
