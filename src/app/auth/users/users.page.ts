import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.interface';

@Component({
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  constructor(private authService: AuthService) {}

  @ViewChild('f') form!: NgForm;
  form2!: FormGroup;
  users: User[] = [];
  detailUser!: User | null;

  ngOnInit(): void {
    this.getUsers();
    this.form2 = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      age: new FormControl(''),
      roles: new FormControl(''),
    });
  }

  getUsers() {
    this.authService.getUsers().subscribe((data) => (this.users = data));
  }

  userDetail(user: User) {
    this.detailUser = user;
  }

  addUser() {
    console.log(this.form.value);

    this.authService.signUp(this.form.value).subscribe((data) => {
      console.log(data), this.getUsers();
    });
  }

  updateUser(user: User) {
    console.log(this.form2.value);

    this.authService.updateUser(this.form2.value, user.id).subscribe((data) => {
      console.log(data), this.getUsers();
    });
  }
}
