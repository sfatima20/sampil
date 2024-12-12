import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';

import { CreatePostComponent } from './posts/create-post/create-post.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PostListComponent } from './posts/post-list/post-list.component';
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthInterceptor} from "./auth/auth-interceptor.interceptor";
import { JokeComponent } from './joke/joke.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreatePostComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    JokeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /*angular material imports*/
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule, CommonModule, MatProgressSpinnerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }