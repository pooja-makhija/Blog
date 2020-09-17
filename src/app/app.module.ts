import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './add-post/add-post.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    ShowHidePasswordModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EditorModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'add-post', component: AddPostComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }