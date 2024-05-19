const express=require('express')
const jwt=require("../config/jwt")
const db=require("../config/database")


const getAllOutlets=async (req,res)=>{
    try{
        const sqlQuery = "exec [dbo].[sp_site] @paramid=1";
    db.getRecordSet(sqlQuery)
    .then((results) => {
        res.send(results);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to reset password' });
    });
    }
    catch(error){
        res.send('error')
    }
}

const getAllTables=async (req,res)=>{
    try{
        const {userId}=req.query;
        const sqlQuery = "exec [dbo].[sp_site] @paramid=2,@user_id='"+userId+"'";
    db.getRecordSet(sqlQuery)
    .then((results) => {
        res.send(results);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to reset password' });
    });
    }
    catch(error){
        res.send('error')
    }
}
module.exports={getAllOutlets,getAllTables};