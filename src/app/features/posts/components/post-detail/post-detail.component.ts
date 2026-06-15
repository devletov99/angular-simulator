import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from "primeng/table";
import { IPost } from '../../../interfaces/IPost';
import { PostService } from '../../services/post.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [TableModule, AsyncPipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  postService: PostService = inject(PostService);

  ngOnInit(): void {
    const post: IPost = this.route.snapshot.data['post'];
    this.postService.setDetailPost(post);
  }

}
