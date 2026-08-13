import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} 
from '@angular/forms';
import { PostService } from '../../services/post.service';
import { catchError, EMPTY, finalize, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../../../services/message.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);

  postCreateForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: ['', Validators.required],
  });

  onSubmitForm(): void {
    this.postService
      .createPost(this.postCreateForm.value)
      .pipe(
        tap(() => this.router.navigate(['/posts'])),
        catchError(() => {
          this.messageService.showError('Не удалось создать пост');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

}
