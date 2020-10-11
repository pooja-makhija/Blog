import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }

   //delete user
   deleteProfile() {
    let data = this.localStorage.retrieve('loginData');
    console.log(data);

    var r = confirm("You are about to delete your account, are you sure?");
    if (r == true) {
      this.authService.deleteUser(data.id).subscribe((res: any) => {
        this.router.navigateByUrl("home");
      }, error => {
        alert("Unable to fetch records.");
      })
      this.localStorage.clear('loginData');
    } else {
      console.log("false");
    }
  }

}
