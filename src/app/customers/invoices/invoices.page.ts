import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData, AuthService } from 'src/app/auth/auth.service';
import { InterfaceInvoice } from '../interface-invoice.interface';
import { InvoicesService } from '../invoices.service';

@Component({
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss']
})
export class InvoicesPage implements OnInit {

  list: boolean = true
  @ViewChild('f') mioForm!: NgForm;
  invoiceArr: InterfaceInvoice[] = []
  error = undefined
  loggedUser!: AuthData | null

  constructor(private invoicesService: InvoicesService, private authService: AuthService) { }
  

  ngOnInit(): void {
    this.getInvoices()
    this.loggedUser = this.authService.getIsLogged()
  }

  getInvoices() {
    this.invoicesService.getInvoices().subscribe(data => this.invoiceArr = data)
  }

  viewForm() {
    this.list = false
  }

  viewList() {
    this.list = true
  }

  addInvoice() {
    let obj: InterfaceInvoice = this.mioForm.value
    obj.dataInserimento = JSON.stringify(new Date())
    obj.dataUltimaModifica = JSON.stringify(new Date())
    this.invoicesService.addInvoice(obj).subscribe(
      data => { this.invoiceArr.push(data) },
      err => {this.error = err, console.log(this.error)}
    )
  }

  deleteInvoice(invoice : InterfaceInvoice) {
    this.invoicesService.deleteInvoice(invoice).subscribe(data => { console.log(data) }
    )
    let index = this.invoiceArr.indexOf(invoice)
    this.invoiceArr.splice(index, 1)
  }

  paidInvoice(invoice: InterfaceInvoice) {
    this.invoicesService.updateInvoice({ stato: "PAGATA" }, invoice.id).subscribe(
      data => {
        data.stato = "PAGATA", console.log(data),
          this.getInvoices();
      },
      err => { this.error = err, console.log(this.error) }
    );
  }

  unpaidInvoice(invoice: InterfaceInvoice) {
    this.invoicesService.updateInvoice({ stato: "NON PAGATA" }, invoice.id).subscribe(
      data => {
        data.stato = "NON PAGATA", console.log(data),
          this.getInvoices();
      },
      err => { this.error = err, console.log(this.error) }
    );
  }
}
