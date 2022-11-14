export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  age: number;
  roles: 'ROLE_ADMIN' | 'ROLE_USER';
}
