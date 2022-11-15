import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CostomersService } from '../costomers.service';
import { IClient } from '../interface-invoice.interface';


@Component({
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss']
})
export class CustomersPage implements OnInit {

  list :boolean = true
  @ViewChild('f') mioForm! : NgForm;
  costomersArr : IClient[]= [];
  error: undefined

  constructor(private interfacecostomers : CostomersService) { }

  ngOnInit(): void {
  }

  viewList() {
    this.list = true;
  }

  viewForm() {
    this.list = false;
  }
  addCostomers(){
  let obj : IClient = this.mioForm.value
  this.interfacecostomers.addCostomers(obj).subscribe(
    costomer => {this.costomersArr.push(costomer)},
    err => {this.error = err, console.log(this.error) }
  )  
  }
  deleteCostomers(costomer : IClient){
    this.interfacecostomers.deleteCostomers(costomer)
    let index = this.costomersArr.indexOf(costomer)
    this.costomersArr.splice(index, 1)
  }
}
