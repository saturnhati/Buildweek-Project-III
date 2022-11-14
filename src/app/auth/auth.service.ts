import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from './user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged: User | null = null;
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.restore();
  }

  restore() {
    const userLogin = localStorage.getItem('userLogin');
    if (userLogin) {
      let userLoggedIn = JSON.parse(userLogin);
      if (!this.helper.isTokenExpired(userLoggedIn.accessToken)) {
        this.isLogged = userLoggedIn;
      }
    } else {
      this.isLogged = null;
    }
  }

  signUp(obj: User) {
    return this.http.post<User>('http://localhost:3000/register', obj);
  }

  signIn(obj: User) {
    return this.http.post<User>('http://localhost:3000/login', obj).pipe(
      tap((data) => {
        console.log(data);
        this.isLogged = data;
      })
    );
  }

  getIsLogged() {
    return this.isLogged;
  }
}
