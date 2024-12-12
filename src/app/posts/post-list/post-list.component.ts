import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../post.service'
import {Post} from "../post.model";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading: boolean = false;
  userIsAuthenticated: boolean = false;
  private postSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public postService: PostService, private authService: AuthService) {
    this.postSub = new Subscription();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((status: boolean) => {
      this.userIsAuthenticated = status;
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPost();
    this.postSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe( (status:boolean)=>{
      this.userIsAuthenticated = status;
    });
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}