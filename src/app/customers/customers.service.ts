import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from './interface-invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) {}

  costomersArr : IClient[] = []

  addCustomers(obj : IClient){
    return this.http.post<IClient>('http://localhost:3000/customers', obj)
  }
  deleteCustomers(obj: IClient){
    return this.http.delete<IClient>('http://localhost:3000/customers/' + obj.id)
  }
  getCustomers(){
    return this.http.get<IClient[]>('http://localhost:3000/customers')
  }
}
