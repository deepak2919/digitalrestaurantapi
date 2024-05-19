const express=require('express')
const router=express.Router()
const testcontroller=require('../controllers/testController')
const verifyToken=require('../config/jwt')
const testvalidator=require('../validators/testValidators')


router.get('/',testvalidator.testValidate,testcontroller.test);
router.post('/',testcontroller.testPost);
router.get('/gpdf',testcontroller.genratePDF);

module.exports=router;