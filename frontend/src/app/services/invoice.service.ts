import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  URL_API = 'http://localhost:4000/api/invoice';

  selectedInvoice: Invoice = {
    codigoFactura: null,
    cliente: '',
    ciudad: '',
    nit: '',
    totalfactura: null,
    subTotal: null,
    iva: null,
    retencion: null,
    fechaCreacion: '',
    estado: '',
    pagada: false,
    fechaPago: '',
    email: '',
  };
  invoices: Invoice[];

  constructor(private http: HttpClient) {}

  getInvoices() {
    return this.http.get<Invoice[]>(this.URL_API);
  }

  createInvoice(invoice: Invoice) {
    return this.http.post(this.URL_API, invoice);
  }

  deleteInvoice(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  sendState(id: string) {
    return this.http.put(`${this.URL_API}/${id}`, {});
  }


}
