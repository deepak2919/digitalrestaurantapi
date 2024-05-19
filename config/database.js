var express = require('express');
var app = express();
var sql = require("mssql")
const config = {
    user: 'sa',
    password: '123',
    server: 'DESKTOP-0439QB4\\SQLEXPRESS', 
    database: 'db_dr',
    options: {
    encrypt: false,
    trustServerCertificate: true
    }
};

// Common function to execute SQL Server queries and return the response
async function getRecordSet(query) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query(query);
      sql.close().then(() => {
        //console.log('Connection closed');
      }).catch((err) => {
        //console.error('Error closing database connection:', err);
      });
      return result.recordset; // Return the result as an array of records
     
    } catch (error) {
      throw error;
    }
  }
  
 
  async function addRecord(query) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query(query);
      sql.close().then(() => {
        //console.log('Connection closed');
      }).catch((err) => {
        //console.error('Error closing database connection:', err);
      });
      return result.recordset; // Return the result as an array of records
    } catch (error) {
      throw error;
    }
  }
module.exports = {getRecordSet,addRecord};