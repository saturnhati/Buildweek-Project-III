import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { IClient } from '../interface-invoice.interface';

@Component({
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  list: boolean = true;
  @ViewChild('f') mioForm!: NgForm;
  customersArr: IClient[] = [];
  error: undefined;

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customersService
      .getCustomers()
      .subscribe((data) => (this.customersArr = data));
  }

  viewList() {
    this.list = true;
  }

  viewForm() {
    this.list = false;
  }
  addCustomers() {
    let obj: IClient = this.mioForm.value;
    console.log(obj);
    obj.dataInserimento = JSON.stringify(Date.now());
    this.customersService.addCustomers(obj).subscribe(
      (customer) => {
        this.customersArr.push(customer);
      },
      (err) => {
        (this.error = err), console.log(this.error);
      }
    );
  }
  deleteCustomers(customer: IClient) {
    this.customersService.deleteCustomers(customer);
    let index = this.customersArr.indexOf(customer);
    this.customersArr.splice(index, 1);
  }
}
