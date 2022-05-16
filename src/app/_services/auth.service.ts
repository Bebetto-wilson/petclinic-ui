import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// const baseURL = 'http://localhost:8081/api/v1/users/create';
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if (sessionStorage.getItem('token')!==null) {
        return true;
    }
    return false;
  }

  canAccess(){
    if (!this.isAuthenticated()) {
        //redirect to login
        this.router.navigate(['/login']);
    }
  }
  canAuthenticate(){
    if (this.isAuthenticated()) {
      //redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  register( user: any){
    // const userData = {firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, address: user.address, phone: user.phone};
      //send data to register api (firebase)
     return this.http
      .post<{idToken:string}>(
        'http://localhost:8081/api/v1/users/create',
        user
      );
  }

  storeToken(token:string){
      sessionStorage.setItem('token',token);
  }

  login(email:string,password:string){
    const loginPayload = {
      "email": email,
      "password": password
      }
      return this.http
      .post<{idToken:string}>(
          'http://localhost:8080/api/v1/login',
          loginPayload
      );
  }

  detail(){
    let token = sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]',
        {idToken:token}
    );
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }



}
