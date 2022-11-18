import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData, AuthService } from 'src/app/auth/auth.service';
import { IClient, InterfaceInvoice } from '../interface-invoice.interface';
import { InvoicesService } from '../invoices.service';
import { CustomersService} from '../customers.service'

@Component({
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  list: boolean = true;
  @ViewChild('f') mioForm!: NgForm;
  invoiceArr: InterfaceInvoice[] = [];
  customerArr: IClient[] = [];
  invoiceObj!: InterfaceInvoice | null;
  error: undefined;
  loggedUser!: AuthData | null;

  constructor(
    private invoicesService: InvoicesService,
    private authService: AuthService,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.getInvoices();
    this.customersService.getCustomers().subscribe((data) => (this.customerArr = data));
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
    obj.anno = new Date().getFullYear()
    this.invoicesService.addInvoice(obj).subscribe(
      (data) => {
        this.invoiceArr.push(data);
      },
      (err) => {
        (this.error = err), console.log(this.error);
      }
    );
    this.mioForm.reset()
  }

  deleteInvoice(invoice: InterfaceInvoice) {
    this.invoicesService.deleteInvoice(invoice).subscribe((data) => {
      console.log(data);
    });
    let index = this.invoiceArr.indexOf(invoice);
    this.invoiceArr.splice(index, 1);
  }

  invoicePayment(invoice: InterfaceInvoice) {
    if (invoice.stato === 'NON PAGATA') {
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
    } else if (invoice.stato === 'PAGATA') {
      this.invoicesService
        .updateInvoice({ stato: 'NON PAGATA' }, invoice.id)
        .subscribe(
          (data) => {
            console.log(data), this.getInvoices();
          },
          (err) => {
            (this.error = err), console.log(this.error);
          }
        );
    } 
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
