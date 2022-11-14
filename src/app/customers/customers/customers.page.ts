import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss']
})
export class CustomersPage implements OnInit {

  list :boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  viewList() {
    this.list = true;
  }

  viewForm() {
    this.list = false;
  }
}
