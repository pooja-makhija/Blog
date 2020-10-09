import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidationService } from './confirm-password.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { RegisterPayload } from 'src/app/auth/register/register-payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  registerPayload: RegisterPayload;

  constructor(private formBuilder: FormBuilder , private customValidation: CustomValidationService, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      first_name:['', [Validators.required]],
      last_name:['', [Validators.required]],
      username:['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required]],
      password_confirmation:['', [Validators.required]],
      number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      description: ['', [Validators.required]],
      linkedin: ''
    },

    {
      validator: [this.customValidation.confirmedValidator('password', 'password_confirmation')]
    });

    this.registerPayload={
      email:'',
      password:'',
      first_name:'',
      last_name:'',
      contact_number:'',
      linkedin_url:'',
      status:'ACTIVE',
      username:'',
      description:''
    }

  }

  ngOnInit(): void {
  }

  onSubmit(){

    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.first_name = this.registerForm.get('first_name').value;
    this.registerPayload.last_name = this.registerForm.get('last_name').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.contact_number = this.registerForm.get('number').value;
    this.registerPayload.linkedin_url = this.registerForm.get('linkedin').value;
    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.description = this.registerForm.get('description').value;

    this.authService.register(this.registerPayload).subscribe(data => {
      alert("User register successfully. Now go to login page");
      this.router.navigateByUrl("/login");
    }, error => {
      alert("error occurred");
    });

  }

}
