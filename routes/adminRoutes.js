const express=require("express")
const router=express.Router()
const admincontroller=require('../controllers/adminController')
const jwt=require("../config/jwt")

router.post('/addManager',jwt.verifyToken,admincontroller.createManager);
router.get('/getManagers',jwt.verifyToken,admincontroller.getManagers);
router.get('/removeManager',jwt.verifyToken,admincontroller.removeManager);
router.post('/addItem',jwt.verifyToken,admincontroller.addItem);
router.get('/getItems',jwt.verifyToken,admincontroller.getItems);
router.get('/removeItem',jwt.verifyToken,admincontroller.removeItem);
router.post('/addTable',jwt.verifyToken,admincontroller.addTable);
router.get('/getOutletUsers',jwt.verifyToken,admincontroller.getOutletUsers);
router.get('/getOutletTables',jwt.verifyToken,admincontroller.getOutletTables);
router.post('/removeTable',jwt.verifyToken,admincontroller.removeTable);


module.exports=router