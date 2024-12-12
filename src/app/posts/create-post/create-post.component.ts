import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: Post = { id: '', title: '', content: '' };
  isLoading = false;
  private mode = 'create';
  private postId = '';

  // Define enteredValue property
  enteredValue: string = ''; // Initialize with an appropriate type

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = <string>paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPostById(this.postId).subscribe(post => {
          this.isLoading = false;
          this.post = { id: post._id, title: post.title, content: post.content };
        });
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  // Ensure onAddPost method exists
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
      form.resetForm();
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
  }
}
