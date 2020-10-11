import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { PostService } from '../post.service';
import { PostPayload } from './post-payload';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;

  constructor(private formBuilder: FormBuilder, private localStorage: LocalStorageService, private postService: PostService, private router: Router) {
    this.addPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })

    this.postPayload = {
      content: '',
      title: '',
      status: '',
      user_id: 0,
      first_name: '',
      email: ''
    }
  }

  ngOnInit(): void {
  }


  addPost() {
    console.log(this.addPostForm.get('title').value);
    console.log(this.addPostForm.get('content').value);
    this.postPayload.content = this.addPostForm.get('content').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    this.postPayload.status = 'PUBLISHED';
    this.postPayload.user_id = this.localStorage.retrieve('loginData').id;
    this.postPayload.first_name = this.localStorage.retrieve('loginData').first_name;
    console.log(this.postPayload);

    //Add post API 
    this.postService.addPost(this.postPayload).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl("/home");

    }, error => {
      alert('Unsuccessful');
    });


  }

   //Save blog in draft
   saveInDraft() {
    this.postPayload.content = this.addPostForm.get('content').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    this.postPayload.status = 'DRAFT';
    this.postPayload.user_id = this.localStorage.retrieve('loginData').id;
    this.postPayload.first_name = this.localStorage.retrieve('loginData').first_name;
    console.log(this.postPayload);

    //Call API here.
    this.postService.addPost(this.postPayload).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl("/home");
    }, error => {
      alert('Unsuccessful');
    });
  }

}