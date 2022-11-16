import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { IClient } from '../interface-invoice.interface';


@Component({
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss']
})
export class CustomersPage implements OnInit {

  list :boolean = true
  @ViewChild('f') mioForm! : NgForm;
  customersArr : IClient[]= [];
  error: undefined

  constructor(private interfacecustomers : CustomersService) { }

  ngOnInit(): void {
  }

  viewList() {
    this.list = true;
  }

  viewForm() {
    this.list = false;
  }
  addCustomers(){
  let obj : IClient = this.mioForm.value
  this.interfacecustomers.addCustomers(obj).subscribe(
    customer => {this.customersArr.push(customer)},
    err => {this.error = err, console.log(this.error) }
  )  
  }
  deleteCustomers(costomer : IClient){
    this.interfacecustomers.deleteCustomers(costomer)
    let index = this.customersArr.indexOf(costomer)
    this.customersArr.splice(index, 1)
  }
}
