const express=require("express")
const router=express.Router()
const sitecontroller=require('../controllers/siteController')
const jwt=require("../config/jwt")

router.get('/getAllOutlets',sitecontroller.getAllOutlets);
router.get('/getAllTables',sitecontroller.getAllTables);

module.exports=router