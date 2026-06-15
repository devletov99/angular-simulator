import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SkeletonModule } from 'primeng/skeleton';
import { PostService } from '../../services/post.service';
import { AsyncPipe } from '@angular/common';
import { EMPTY, switchMap, tap } from 'rxjs';
import { IPost } from '../../../interfaces/IPost';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from '../../../enums/Menu';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPostsResponse } from '../../../interfaces/IPostResponse';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, ContextMenuModule, AsyncPipe],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  destroyRef: DestroyRef = inject(DestroyRef);

  rows: number = 5;
  itemsMenu: MenuItem[] = [];
  selectedPost: IPost | null = null;
  dialogRef: DynamicDialogRef | null = null;
  isLoading: boolean = true;
 
  ngOnInit(): void {
    this.loadPosts(0);

    this.itemsMenu = [
      { label: ContextMenu.DETAILED, icon: 'pi pi-eye', command: () => { 
        if (this.selectedPost) {
          this.openPost(this.selectedPost.id) }
        }},
      
      { label: ContextMenu.EDIT, icon: 'pi pi-eye', command: () => { 
        if (this.selectedPost) {
          this.openModalEdit(this.selectedPost);
        }
      }},

      { label: ContextMenu.DELETED, icon: 'pi pi-fw pi-times', command: () => { 
        if (this.selectedPost) { 
          this.postService.deletePost(this.selectedPost.id);
        }
      }},
    ]
  }

  private loadPosts(skip: number): void {
    this.postService.loadPost(this.rows, skip)
    .pipe(
      tap((response: IPostsResponse) => { 
        this.postService.setPost(response.posts);
        this.postService.setTotal(response.total);
        this.isLoading = false;
      }),
    ).subscribe();
  }

  onPageChange(event: TablePageEvent): void {
    this.rows = event.rows;
    this.loadPosts(event.first);
  }
  
  onRowDoubleClick(post: IPost): void {
    this.openPost(post.id);
  }

  openPost(id: number): void {
    this.router.navigate(['/posts', id]);
  }

  openModalEdit(post: IPost): void {
    this.postService.getPost(post.id)
      .pipe(
        switchMap((fullPost: IPost) => {
          this.dialogRef = this.dialogService.open(PostEditDialogComponent, { 
            header: 'Редактирование поста', 
            data: { post: fullPost }
          });
          return this.dialogRef?.onClose || EMPTY;
        }),
        tap((updatedPost: IPost) => {
          if (updatedPost) {
            const postWithId: IPost = { ...updatedPost, id: post.id }
            this.postService.updatePost(postWithId);
            console.log(postWithId)
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }
  
}
