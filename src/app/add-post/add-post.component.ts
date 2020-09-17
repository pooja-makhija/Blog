import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }


  addPost() {
    console.log(this.addPostForm.get('title').value);
    console.log(this.addPostForm.get('content').value);

    //Call API here.

  }

}