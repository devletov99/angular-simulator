import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../../../interfaces/IPost';
import { PostService } from '../../services/post.service';
import { finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPostCreate } from '../../../interfaces/IPostCreate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  @Output() createPost: EventEmitter<IPostCreate> = new EventEmitter<IPostCreate>()

  fb: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);
  destroyRef: DestroyRef = inject(DestroyRef);
  router: Router = inject(Router);

  formPostCreate: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: ['', Validators.required],
  })

  onSubmitForm(): void {
    const formValue = this.formPostCreate.getRawValue();
    const post: IPostCreate  = {
      ...formValue, tags: formValue.tags.split(',').map((tag: string) => tag.trim()),
    }

    this.postService.publishPost(post)
      .pipe(
        tap(post => { 
          this.postService.setPost([post, ...this.postService.getPosts()]);
          this.router.navigate(['/posts'])
        }),
      ).subscribe();
  }

}
