const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema ({
    codigoFactura: {type: Number, required: true, unique: true},
    cliente: { type: String, required: true},
    ciudad: { type: String, required: true}, 
    nit: { type: String, required: true, unique: true},
    totalfactura: { type: Number, required: true},
    subTotal: {type: Number, required: true },
    iva: { type: Number, required: true },
    retencion: { type: Number, required: true },
    fechaCreacion: { type: Date, required: true },
    estado: { type: String, required: true }, 
    pagada: { type: Boolean, default: false },
    fechaPago: { type: Date },
    email: { type: String, required: true, unique: true }

},{
    timestamps: true,
    versionKey: false
})




module.exports = model('Invoice', invoiceSchema);