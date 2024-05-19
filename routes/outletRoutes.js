const express=require("express")
const router=express.Router()
const outletcontroller=require('../controllers/outletController')
const jwt=require("../config/jwt")

router.get('/getAllItems',outletcontroller.getAllItems);
router.post('/addToCart',outletcontroller.addToCart);
router.get('/getCart',outletcontroller.getCart);
router.get('/clearCart',outletcontroller.clearCart);
router.get('/confirmOrder',outletcontroller.confirmOrder);
router.get('/getOutletBanners',outletcontroller.getOutletBanners);
router.get('/getOutletDetails',outletcontroller.getOutletDetails);

module.exports=router