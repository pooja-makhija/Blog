import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload } from './auth/login-payload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators';
import { RegisterPayload } from 'src/app/auth/register/register-payload';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://127.0.0.1:8000/api/";

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  //login api
  login(loginPayload: LoginPayload): Observable<boolean> {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.baseUrl + 'user/login', loginPayload, { headers: headers }).pipe(map(data => {
      this.localStorageService.store('loginData', data);
      return true;
    }));
  }

  //register api
  register(registerPayload: RegisterPayload): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.baseUrl + 'user/signup', registerPayload, { headers: headers })
  }

   //Update user profile
   updateProfile(updatePayload: RegisterPayload, id: Number): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch(this.baseUrl + 'user/userUpdate/' + id, updatePayload, { headers: headers });
  }

   //delete user
   deleteUser(id: Number) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete(this.baseUrl + 'user/userDelete/' + id, { headers: headers });
  }

  //Is authenticated method to check whether user has logged in or not.
  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('loginData') != null;
  }

  logout() {
    this.localStorageService.clear('loginData');
  }
}
