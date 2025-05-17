import express from 'express';
import { allOrders,UpdateStatus, placeOrder, placeOrderStripe, userOrders, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/authUser.js';

const orderRouter = express.Router();

orderRouter.post('/list',allOrders)
orderRouter.post('/status',adminAuth, UpdateStatus);
orderRouter.post('/place', authUser,placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);
orderRouter.post('/userorders',authUser,userOrders);

orderRouter.post('/verifyStripe',authUser, verifyStripe);
export default orderRouter;