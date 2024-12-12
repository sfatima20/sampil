import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {CreatePostComponent} from "./posts/create-post/create-post.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {authGuard} from "./auth/auth.guard";
import {JokeComponent} from "./joke/joke.component";

const routes: Routes = [
  {path:'', component: PostListComponent},
  {path:'create', component: CreatePostComponent, canActivate: [authGuard]},
  {path:'edit/:postId', component: CreatePostComponent, canActivate: [authGuard]},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'joke', component: JokeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }