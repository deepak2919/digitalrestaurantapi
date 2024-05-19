const express=require("express")
const router=express.Router()
const logincontroller=require('../controllers/loginController')

router.post('/loginadmin',logincontroller.loginadmin);
router.post('/loginmanager',logincontroller.loginmanager);

module.exports=router