import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../../interfaces/IPost';
import { PostService } from '../../services/post.service';
import { catchError, EMPTY, finalize, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPostCreate } from '../../interfaces/IPostCreate';
import { Router } from '@angular/router';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService)

  postCreateForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: ['', Validators.required],
  })

  onSubmitForm(): void {
    this.postService.createPost(this.postCreateForm.value)
      .pipe(
        tap(() => this.router.navigate(['/posts'])),
        catchError(() => {
          this.messageService.showError('Не удалось создатать пост');
          return EMPTY;
        })
      ).subscribe();
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

}
