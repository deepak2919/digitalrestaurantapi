const express = require("express");
const jwt = require("../config/jwt");
const db = require("../config/database");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const test = async (req, res) => {
  try {
    const { name, mobile } = req.query;
    // const query="insert into testtable(name,mobile) values('"+name+"','"+mobile+"') insert into testtable(name,mobile) values('"+name+"','"+mobile+"')";
    res.status(201).json(name + mobile);
    // const query="exec sp_test @name='"+name+"',@mobile='"+mobile+"'";
    // db.addRecord(query).then((result)=>{
    //     res.status(201).json(result);
    // }).catch(error=>{
    //     res.status(401).json(error)
    // })
  } catch (error) {
    res.send("error");
  }
};
const testPost = async (req, res, next) => {
  try {
    res.send(req.query.name);
  } catch (error) {
    res.send("error");
  }
};
const genratePDF = async (req, res) => {
  try {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the content type to PDF
    res.setHeader("Content-Type", "application/pdf");

    // Pipe the PDF content to the response stream
    doc.pipe(res);

    // Add content to the PDF
  doc
  .fontSize(16)
  .text('Invoice', { align: 'center' })
  .moveDown(0.5);

// Invoice details
doc
  .fontSize(12)
  .text('Invoice Number: INV-001')
  .text('Date: ' + new Date().toLocaleDateString())
  .moveDown(0.5);

// Table header
doc
  .fontSize(12)
  .text('Description', 50, 200)
  .text('Quantity', 300, 200)
  .text('Price', 400, 200)
  .text('Total', 500, 200);

// Table rows
const items = [
  { description: 'Item 1', quantity: 2, price: 50 },
  { description: 'Item 2', quantity: 1, price: 30 },
  { description: 'Item 3', quantity: 3, price: 20 },
];

let total = 0;
let y = 230;

items.forEach((item) => {
  const itemTotal = item.quantity * item.price;
  total += itemTotal;

  doc
    .fontSize(10)
    .text(item.description, 50, y)
    .text(item.quantity.toString(), 300, y)
    .text('$' + item.price.toFixed(2), 400, y)
    .text('$' + itemTotal.toFixed(2), 500, y);

  y += 20;
});

// Total
doc.moveDown(1);
doc.fontSize(12).text('Total: $' + total.toFixed(2), { align: 'right' });
    doc.end();
  } catch (error) {
    res.send(error.message);
  }
};
module.exports = { test, testPost, genratePDF };
