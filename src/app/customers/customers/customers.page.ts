import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthData } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.interface';
import { CustomersService } from '../customers.service';
import { IClient, InterfaceInvoice } from '../interface-invoice.interface';
import { InvoicesService } from '../invoices.service';

@Component({
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  list: boolean = true;
  @ViewChild('f') mioForm!: NgForm;
  customersArr: IClient[] = [];
  invoiceArr: InterfaceInvoice[] = [];
  error: undefined;
  customersObj!: IClient | null;
  loggedUser!: AuthData | null;
  data: string = new Date().toISOString().slice(0, 10);

  constructor(
    private customersService: CustomersService,
    private authService: AuthService,
    private invoicesService: InvoicesService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.loggedUser = this.authService.getIsLogged();
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
  showDetails(customer: IClient) {
    this.customersObj = customer;
  }
  getCustomer() {
    this.customersService
      .getCustomers()
      .subscribe((customer) => (this.customersArr = customer));
  }
  logout(user: AuthData) {
    this.authService.logout();
  }

  showForm(customer: IClient) {
    this.customersObj = customer;
  }

  addInvoice() {
    let obj: InterfaceInvoice = this.mioForm.value;
    obj.dataInserimento = JSON.stringify(Date.now());
    obj.dataUltimaModifica = JSON.stringify(Date.now());
    if (this.customersObj !== null) {
      obj.cliente = this.customersObj;
    }
    obj.anno = new Date().getFullYear();
    this.invoicesService.addInvoice(obj).subscribe(
      (data) => {
        this.invoiceArr.push(data);
      },
      (err) => {
        (this.error = err), console.log(this.error);
      }
    );
    this.mioForm.reset();
  }
}
