import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './register/register.page';
import { LoginPage } from './login/login.page';
import { RouterModule, Routes } from '@angular/router';
import { UsersPage } from './users/users.page';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'users',
    component: UsersPage,
  },
];

const Component = [RegisterPage, LoginPage, UsersPage];

@NgModule({
  declarations: [...Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  exports: [...Component],
})
export class AuthModule {}
