import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from '../../../../services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../../services/loader.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private loaderService: LoaderService = inject(LoaderService);
  errMessage: string | null = null;
  
  authForm: FormGroup = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  auth(): void {
    this.loaderService.showLoader()
    this.authService.login(this.authForm.value)
      .pipe(
        tap(() => this.router.navigate(['/'])),
        catchError((err: HttpErrorResponse) => {
          this.errMessage = err.status === 400 ? 'Неверный email или пароль.' : 'Не удалось войти. Попрбуйте позже.';
          console.log(err.status)
          return EMPTY;
        }),
        finalize(() => this.loaderService.hideLoader()),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }

}
