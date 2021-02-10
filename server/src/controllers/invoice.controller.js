const invoiceCtrl = {};

const Invoice = require("../models/invoice");
const nodemailer = require("nodemailer");

//metodo para obtener todas las facturas
invoiceCtrl.getInvoices = async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
};

//metodo para crear una factura
invoiceCtrl.createInvoice = async (req, res) => {
  const newInvoice = new Invoice(req.body);
  await newInvoice.save();
  res.send({
    message: "Invoice created",
  });
};

//metodo para obtener una factura
invoiceCtrl.getInvoice = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  res.json(invoice);
};

//metodo para actualizar el estado de la factura
invoiceCtrl.updateInvoice = async (req, res) => {
  await Invoice.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: "Invoice update",
  });
};

//metodo para eliminar una factura
invoiceCtrl.deleteInvoice = async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({
    status: "Invoice delete",
  });
};

//metodo para enviar correo y cambiar el estado
invoiceCtrl.sendEmail = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  let asunto = invoice.estado + " que ha pasado a: ";

  if (invoice.estado == "Primer Recordatorio") {
    asunto += "Segundo recordatorio";
    await Invoice.findByIdAndUpdate(req.params.id, {
      estado: "Segundo Recordatorio",
    });
    enviar(asunto, req, res, invoice.email);
  } else if (invoice.estado == "Segundo Recordatorio") {
    asunto += "Desactivado";
    await Invoice.findByIdAndUpdate(req.params.id, {
      estado: "Desactivado",
    });
    enviar(asunto, req, res, invoice.email);
  }
};

function enviar(asunto, req, res, email) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    post: 587,
    secure: false,
    auth: {
      user: "felipa.ferry19@ethereal.email",
      pass: "6jjkUamrNZszsS2Asp",
    },
  });

  const mailOptions = {
    from: "Remitente",
    to: email,
    subject: "Notificacion de Cambio de Estado de Factura",
    text: asunto,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("Email enviado");
      res.status(200).jsonp(req.body);
    }
  });
}

module.exports = invoiceCtrl;
