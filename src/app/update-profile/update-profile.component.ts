import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth.service';
import { RegisterPayload } from '../auth/register/register-payload';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  updateForm: FormGroup;
  updatePayload: RegisterPayload;

  id: number;


  constructor(private localStorage: LocalStorageService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.updatePayload = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      contact_number:null,
      linkedin_url:null,
      status: 'ACTIVE',
      username: '',
      description: null
    }
  }

  ngOnInit(): void {
    let localData = this.localStorage.retrieve('loginData');
    this.id = localData.id;

    this.updateForm = this.formBuilder.group({
      lastName: [localData.last_name, [Validators.required]],
      firstName: [localData.first_name, [Validators.required]],
      username: [localData.username, [Validators.required]],
      email: [localData.email, [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],

    });

  }

  onSubmit() {
    // this.updatePayload.id = this.updateForm.get('email').value;
    this.updatePayload.email = this.updateForm.get('email').value;
    this.updatePayload.first_name = this.updateForm.get('firstName').value;
    this.updatePayload.last_name = this.updateForm.get('lastName').value;
   // this.updatePayload.contact_number = this.updateForm.get('number').value;
    //this.updatePayload.linkedin_url =  this.updateForm.get('linkedin').value;
    this.updatePayload.username = this.updateForm.get('username').value;
    //this.updatePayload.description =  this.updateForm.get('description').value;

    this.authService.updateProfile(this.updatePayload, this.id).subscribe(data => {
      alert("User updated successfully");
    }, error => {
      alert("error occurred");
    });


  }

}