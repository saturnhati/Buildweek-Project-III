import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData, AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.interface';
import { InterfaceInvoice } from '../interface-invoice.interface';
import { InvoicesService } from '../invoices.service';

@Component({
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {
  list: boolean = true;
  @ViewChild('f') mioForm!: NgForm;
  invoiceArr: InterfaceInvoice[] = [];
  invoiceObj!: InterfaceInvoice | null;
  error = undefined;
  loggedUser!: AuthData | null;

  constructor(
    private invoicesService: InvoicesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getInvoices();
    this.loggedUser = this.authService.getIsLogged();
  }

  getInvoices() {
    this.invoicesService
      .getInvoices()
      .subscribe((data) => (this.invoiceArr = data));
  }

  viewForm() {
    this.list = false;
  }

  viewList() {
    this.list = true;
  }

  addInvoice() {
    let obj: InterfaceInvoice = this.mioForm.value;
    obj.dataInserimento = JSON.stringify(Date.now());
    obj.dataUltimaModifica = JSON.stringify(Date.now());
    this.invoicesService.addInvoice(obj).subscribe(
      (data) => {
        this.invoiceArr.push(data);
      },
      (err) => {
        (this.error = err), console.log(this.error);
      }
    );
  }

  deleteInvoice(invoice: InterfaceInvoice) {
    this.invoicesService.deleteInvoice(invoice).subscribe((data) => {
      console.log(data);
    });
    let index = this.invoiceArr.indexOf(invoice);
    this.invoiceArr.splice(index, 1);
  }

  paidInvoice(invoice: InterfaceInvoice) {
    this.invoicesService
      .updateInvoice({ stato: 'PAGATA' }, invoice.id)
      .subscribe(
        (data) => {
          console.log(data), this.getInvoices();
        },
        (err) => {
          (this.error = err), console.log(this.error);
        }
      );
  }

  unpaidInvoice(invoice: InterfaceInvoice) {
    this.invoicesService
      .updateInvoice({ stato: 'NON PAGATA' }, invoice.id)
      .subscribe(
        (data) => {
          (data.stato = 'NON PAGATA'), console.log(data), this.getInvoices();
        },
        (err) => {
          (this.error = err), console.log(this.error);
        }
      );
  }

  showDetails(invoice: InterfaceInvoice) {
    this.invoiceObj = invoice;
    console.log(this.invoiceObj)
    console.log(invoice)
  }

  logout(user: AuthData) {
    this.authService.logout();
  }
}
