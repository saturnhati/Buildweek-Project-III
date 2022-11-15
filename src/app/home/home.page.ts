import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthData, AuthService } from '../auth/auth.service';
import { User } from '../auth/user.interface';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  loggedUser!: AuthData | null;

  constructor(private authService: AuthService) { }

  ngOnChanges() { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getIsLogged();
    console.log(this.loggedUser?.user.firstname);
  }
}
