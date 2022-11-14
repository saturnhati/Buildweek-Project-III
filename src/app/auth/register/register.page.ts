import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.interface';

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('f') form!: NgForm;
  error = undefined;
  show = false;
  showError = false;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    let newObj: User = this.form.value;
    newObj.roles = 'ROLE_USER';
    this.authService.signUp(newObj).subscribe(
      (data) => {
        console.log(data),
          (this.error = undefined),
          setTimeout(() => {
            this.route.navigate(['/login']);
          }, 1500),
          (this.show = true),
          setTimeout(() => {
            this.show = false;
          }, 1500);
      },
      (err) => {
        console.log(err),
          (this.error = err.error),
          (this.showError = true),
          setTimeout(() => {
            this.showError = false;
          }, 1500);
      }
    );
  }
}
