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
  @ViewChild('f2') form2!: NgForm;
  users: User[] = [];
  detailUser!: User | null;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers().subscribe((data) => (this.users = data));
  }

  userDetail(user: User) {
    this.detailUser = user;
  }

  addUser() {
    this.authService.signUp(this.form.value).subscribe((data) => {
      this.getUsers();
      this.form.reset();
    });
  }

  openForm(obj: User) {
    this.form2.setValue({
      firstname: obj.firstname,
      lastname: obj.lastname,
      email: obj.email,
      age: obj.age,
      roles: obj.roles,
    });
  }

  updateUser(user: User) {
    this.authService.updateUser(this.form2.value, user.id).subscribe((data) => {
      this.getUsers(), this.userDetail(data);
    });
  }

  deleteUser(user: User) {
    this.authService.deleteUser(user.id).subscribe((data) => {
      this.getUsers(), (this.detailUser = null);
    });
  }
}
