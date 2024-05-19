const db=require("../config/database")

const getAllItems=async (req,res)=>{

    try{
        const {tableCode,search,sessionId}=req.query;
        const delimiters = /[OT]/;
        const userId=tableCode.split(delimiters)[1];
        const tableId=tableCode.split(delimiters)[2];
        const sqlQuery = "exec [dbo].[sp_outlet] @paramid=1,@table_id='"+tableId+"',@search='"+search+"',@session_id='"+sessionId+"',@user_id='"+userId+"'";
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

const addToCart=async (req,res)=>{
    try{
        const {itemId,tableCode,sessionId,qty}=req.body;
        const delimiters = /[OT]+/;
        const tableId=tableCode.split(delimiters)[2];
        const sqlQuery = "exec [dbo].[sp_outlet] @paramid=2,@table_id='"+tableId+"',@item_id='"+itemId+"',@session_id='"+sessionId+"',@qty='"+qty+"'";
    db.addRecord(sqlQuery)
    .then((results) => {
        res.send(results);
    })
    .catch((error) => {
        res.status(500).json({ error: sqlQuery });
    });
    }
    catch(error){
        res.send('error')
    }
}
const getCart=async (req,res)=>{
    try{
        const {sessionId,tableCode}=req.query;
        const delimiters = /[OT]+/;
        const userId=tableCode.split(delimiters)[1];
        const tableId=tableCode.split(delimiters)[2];
        const sqlQuery = "exec [dbo].[sp_outlet] @paramid=3,@session_id='"+sessionId+"',@table_id='"+tableId+"',@user_id='"+userId+"'";
    db.getRecordSet(sqlQuery)
    .then((results) => {
        res.send(results);
    })
    .catch((error) => {
        res.status(500).json({ error: sqlQuery });
    });
    }
    catch(error){
        res.send('error')
    }
}


const confirmOrder=async (req,res)=>{
    try{
        const {sessionId,tableCode}=req.query;
        const delimiters = /[OT]+/;
        const userId=tableCode.split(delimiters)[1];
        const tableId=tableCode.split(delimiters)[2];
        const sqlQuery = "exec [dbo].[sp_outlet] @paramid=5,@session_id='"+sessionId+"',@table_id='"+tableId+"',@user_id='"+userId+"'";
    db.addRecord(sqlQuery)
    .then((results) => {
        res.send(results);
    })
    .catch((error) => {
        res.status(500).json({ error: sqlQuery });
    });
    }
    catch(error){
        res.send('error')
    }
}

const clearCart=async (req,res)=>{
    try{
        const {sessionId}=req.query;
        const sqlQuery = "exec [dbo].[sp_outlet] @paramid=4,@session_id='"+sessionId+"'";
    db.addRecord(sqlQuery)
    .then((results) => {
        res.send(results);
    })
    .catch((error) => {
        res.status(500).json({ error: sqlQuery });
    });
    }
    catch(error){
        res.send('error')
    }
}
const getOutletBanners=async (req,res)=>{
    try{
        const {tableCode}=req.query;
        const delimiters = /[OT]+/;
        const userId=tableCode.split(delimiters)[1];
        const tableId=tableCode.split(delimiters)[2];
        const sqlQuery = "exec [dbo].[sp_outlet] @paramid=6,@user_id='"+userId+"'";
    db.getRecordSet(sqlQuery)
    .then((results) => {
        res.send(results);
    })
    .catch((error) => {
        res.status(500).json({ error: sqlQuery });
    });
    }
    catch(error){
        res.send('error')
    }
}

const getOutletDetails=async (req,res)=>{
    try{
        const {tableCode}=req.query;
        const delimiters = /[OT]+/;
        const userId=tableCode.split(delimiters)[1];
        const tableId=tableCode.split(delimiters)[2];
        const sqlQuery = "exec [dbo].[sp_outlet] @paramid=7,@user_id='"+userId+"'";
    db.getRecordSet(sqlQuery)
    .then((results) => {
        res.send(results);
    })
    .catch((error) => {
        res.status(500).json({ error: sqlQuery });
    });
    }
    catch(error){
        res.send('error')
    }
}


module.exports={getAllItems,addToCart,getCart,clearCart,confirmOrder,getOutletBanners,getOutletDetails};