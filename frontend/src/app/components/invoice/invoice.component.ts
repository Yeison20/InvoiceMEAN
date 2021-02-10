import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { NgForm } from '@angular/forms';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(public invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  resetForm(form: NgForm){
    form.reset();
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(
      (res) => {
        this.invoiceService.invoices = res;
      },
      (err) => console.log(err)
    );
  }

  addInvoice(form: NgForm) {
    this.invoiceService.createInvoice(form.value).subscribe(
      (res) => {
        this.getInvoices();
        form.reset();
      },
      (err) => console.log(err)
    );
  }

  deleteInvoice(id: string) {
    if (confirm('¿Esta seguro de eliminar el registro?')) {
      this.invoiceService.deleteInvoice(id).subscribe(
        (res) => {
          this.getInvoices();
        },
        (err) => console.log(err)
      );
    }
  }

  sendState(id: string) {
    this.invoiceService.sendState(id).subscribe(
      (res) => {
        this.getInvoices();
      },
      (err) => console.log(err)
    );
  }


}
