import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.signUp(this.form.value).subscribe(
      (data) => {
        console.log(data),
          (this.error = undefined),
          this.route.navigate(['/login']);
      },
      (err) => {
        console.log(err), (this.error = err.error);
      }
    );
  }
}
