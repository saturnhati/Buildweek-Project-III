import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from './interface-invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class CostomersService {

  constructor(private http: HttpClient) {}

  costomersArr : IClient[] = []

  addCostomers(obj : IClient){
    return this.http.post<IClient>('http://localhost:3000/customers', obj)
  }
  deleteCostomers(obj: IClient){
    return this.http.delete<IClient>('http://localhost:3000/customers' + obj.id)
  }
}
