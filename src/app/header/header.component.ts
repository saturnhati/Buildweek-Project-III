import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData, AuthService } from '../auth/auth.service';
import { User } from '../auth/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  isLogged!: AuthData | null;
  userLogged!: User | null;

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
