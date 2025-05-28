import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import  adminAuth  from '../middleware/adminAuth.js';
const productRoute = express.Router();

productRoute.post('/add',upload.single('image'),addProduct)
productRoute.delete('/remove/:id',removeProduct); 
// productRoute.post('/add',adminAuth,upload.single('image'),addProduct)
// productRoute.delete('/remove/:id', adminAuth, removeProduct); 
productRoute.get('/list',listProduct)
productRoute.get('/single',singleProduct)

export default productRoute;