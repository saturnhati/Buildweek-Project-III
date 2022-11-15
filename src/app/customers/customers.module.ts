import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersPage } from './customers/customers.page';
import { InvoicesPage } from './invoices/invoices.page';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomersPage,
  },
  {
    path: 'invoices',
    component: InvoicesPage,
  },
];

const Components = [CustomersPage, InvoicesPage];

@NgModule({
  declarations: [...Components],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  exports: [...Components],
})
export class CustomersModule {}
