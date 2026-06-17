import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../../interfaces/IPost';
import { PostService } from '../../services/post.service';
import { finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPostCreate } from '../../interfaces/IPostCreate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  @Output() createPost: EventEmitter<IPostCreate> = new EventEmitter<IPostCreate>()

  private fb: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);
  private router: Router = inject(Router);

  postCreateForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: ['', Validators.required],
  })

  onSubmitForm(): void {
    this.postService.createPost(this.postCreateForm.value)
      .pipe(
        tap((post: IPost) => { 
          this.postService.setPost([post, ...this.postService.getPosts()]);
          this.router.navigate(['/posts']);
        }),
      ).subscribe();
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

}
