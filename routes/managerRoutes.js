const express=require("express")
const router=express.Router()
const managercontroller=require('../controllers/managerController')
const jwt=require("../config/jwt")



router.post('/addUpdateItem',jwt.verifyToken,managercontroller.addUpdateItem); 
router.post('/viewOrder',jwt.verifyToken,managercontroller.viewOrder);
router.get('/getItems',jwt.verifyToken,managercontroller.getItems);
router.get('/getOrderDetails',jwt.verifyToken,managercontroller.getOrderDetails);
router.post('/saveAccountInfo',jwt.verifyToken,managercontroller.saveAccountInfo); 
router.post('/getAccountInfo',jwt.verifyToken,managercontroller.getAccountInfo); 
router.post('/changePassword',jwt.verifyToken,managercontroller.changePassword); 
router.post('/addBanner',jwt.verifyToken,managercontroller.addBanner); 
router.get('/getBanners',jwt.verifyToken,managercontroller.getBanners); 
router.get('/removeBanner',jwt.verifyToken,managercontroller.removeBanner);
router.get('/getDashboard',jwt.verifyToken,managercontroller.getDashboard);
router.post('/addItem',jwt.verifyToken,managercontroller.addItem);
router.get('/getAddedItems',jwt.verifyToken,managercontroller.getAddedItems);

module.exports=router