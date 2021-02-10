const { Router } = require('express');
const router = Router();

const invoicesCrtl = require('../controllers/invoice.controller.js');

router.get('/', invoicesCrtl.getInvoices);  // ruta para obtener todas las facturas
router.post('/', invoicesCrtl.createInvoice); // ruta para crear una factura
router.get('/:id', invoicesCrtl.getInvoice); // ruta para obtener una factura 
router.delete('/:id', invoicesCrtl.deleteInvoice); // ruta para eliminar una factura
//router.put('/:id', invoicesCrtl.updateInvoice); // ruta para actualizar un dato de la factura 
router.put('/:id' , invoicesCrtl.sendEmail);

module.exports = router;