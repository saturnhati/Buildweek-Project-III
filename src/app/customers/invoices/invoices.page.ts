import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private invoicesService: InvoicesService ) { }

  ngOnInit(): void {
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
    this.invoicesService.deleteInvoice(invoice)
    let index = this.invoiceArr.indexOf(invoice)
    this.invoiceArr.splice(index, 1)
  }
}
