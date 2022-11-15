import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from './user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    roles: 'user' | 'admin';
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged: AuthData | null = null;
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private route: Router) {
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

  logout() {
    this.isLogged = null;
    localStorage.removeItem('userLogin');
    this.route
      .navigateByUrl('/login', { skipLocationChange: true })
      .then(() => {
        this.route.navigate(['/home']);
      });
  }

  signUp(obj: User) {
    return this.http.post<User>('http://localhost:3000/register', obj);
  }

  signIn(obj: User) {
    let role = obj.roles;
    return this.http.post<AuthData>('http://localhost:3000/login', obj).pipe(
      tap((data) => {
        console.log(data);
        this.isLogged = data;
      })
    );
  }

  getIsLoggedAdmin() {
    if (this.isLogged?.user.roles == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  getIsLogged() {
    return this.isLogged;
  }

  getUsers() {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getUser(id: number) {
    return this.http.get<User>('http://localhost:3000/users/' + id);
  }

  updateUser(data: User, id: number | undefined) {
    return this.http.patch<User>('http://localhost:3000/users/' + id, data);
  }

  deleteUser(id: number | undefined) {
    return this.http.delete('http://localhost:3000/users/' + id);
  }
}
