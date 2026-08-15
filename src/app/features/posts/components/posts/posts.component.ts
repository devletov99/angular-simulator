import { Component, inject, OnInit } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SkeletonModule } from 'primeng/skeleton';
import { PostService } from '../../services/post.service';
import { AsyncPipe } from '@angular/common';
import { catchError, EMPTY, of, switchMap, take, tap } from 'rxjs';
import { IPost } from '../../interfaces/IPost';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from '../../enums/ContextMenu';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { IPostResponse } from '../../interfaces/IPostResponse';
import { MessageService } from '../../../../services/message.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-posts',
  imports: [
    TableModule, 
    SkeletonModule, 
    ContextMenuModule, 
    AsyncPipe,
    TranslatePipe,
  ],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  private messageService: MessageService = inject(MessageService);

  rows: number = 5;
  itemsMenu: MenuItem[] = [];
  selectedPost: IPost | null = null;
  private dialogRef: DynamicDialogRef | null = null;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadPosts(0, this.rows);

    this.itemsMenu = [
      {
        label: ContextMenu.DETAILED,
        icon: 'pi pi-eye',
        command: () => {
          this.router.navigate(['/posts', this.selectedPost!.id]);
        },
      },
      {
        label: ContextMenu.EDIT,
        icon: 'pi pi-eye',
        command: () => {
          this.openEditModal(this.selectedPost!);
        },
      },
      {
        label: ContextMenu.DELETED,
        icon: 'pi pi-fw pi-times',
        command: () => {
          this.postService
            .deletePost(this.selectedPost!.id)
            .pipe(
              catchError(() => {
                this.messageService.showError('Не удалось удалить пост');
                return of(null);
              }),
            )
            .subscribe();
        },
      },
    ];
  }

  private loadPosts(skip: number, rows: number): void {
    this.postService
      .loadPost(skip, rows)
      .pipe(
        tap((response: IPostResponse) => {
          this.postService.setPost(response.posts);
          this.postService.setTotal(response.total);
          this.isLoading = false;
        }),
        catchError(() => {
          this.messageService.showError('');
          this.isLoading = false;
          return of();
        }),
      )
      .subscribe();
  }

  onPageChange(event: TablePageEvent): void {
    this.rows = event.rows;
    this.loadPosts(event.first, this.rows);
  }

  onRowDoubleClick(post: IPost): void {
    this.router.navigate(['/posts', post.id]);
  }

  openEditModal(post: IPost): void {
    this.postService
      .getPost(post.id)
      .pipe(
        switchMap((fullPost: IPost) => {
          this.dialogRef = this.dialogService.open(PostEditDialogComponent, {
            header: 'Редактирование поста',
            data: { post: fullPost },
          });
          return this.dialogRef?.onClose || EMPTY;
        }),
        tap((updatedPost: IPost) => {
          if (updatedPost) {
            const postWithId: IPost = { ...updatedPost, id: post.id };
            this.postService.updatePost(postWithId);
          }
        }),
        take(1),
      )
      .subscribe();
  }

}
