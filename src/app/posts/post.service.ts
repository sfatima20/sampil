import {Post} from "./post.model"
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {map} from "rxjs/operators"
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();


  constructor(private http: HttpClient, private router: Router) {
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  getPost() {
    // return this.posts;  //by reference
    // return [...this.posts];  //copy of the list of post
    this.http.get<{ success: boolean, data: any }>('http://localhost:3000/api/posts')
      .pipe(map(postData => {
        return postData.data.map((payLoad: any) => {
          return {
            title: payLoad.title,
            content: payLoad.content,
            id: payLoad._id
          };
        });
      }))
      .subscribe((transformedData) => {
        this.posts = transformedData;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostById(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string) {
    const post: Post = {id: '', title: title, content: content}

    this.http.post<{ success: boolean, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        const postId = res.postId;
        post.id = postId;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {id: id, title: title, content: content};
    this.http.put<{ success: boolean }>('http://localhost:3000/api/posts/' + id, post).subscribe(res => {
      const updatedPost = [...this.posts];
      const oldPostIndex = updatedPost.findIndex(p => p.id === post.id);
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id != postId);
        this.postUpdated.next([...this.posts]);
      });
  }

}