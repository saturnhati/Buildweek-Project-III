import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss']
})
export class InvoicesPage implements OnInit {

  list :boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  viewForm() {
    this.list = false
  }

  viewList() {
    this.list = true
  }
}
