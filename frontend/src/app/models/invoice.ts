export interface Invoice {
    codigoFactura: number
    cliente: string
    ciudad: string 
    nit: string
    totalfactura: number
    subTotal: number
    iva: number
    retencion: number
    fechaCreacion: string
    estado: string 
    pagada: boolean
    fechaPago: string  
    email: string
    createdAt?: string
    updatedAt?: string
    _id?: string
}