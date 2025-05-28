import express from 'express';
import { allOrders,UpdateStatus, placeOrder, placeOrderStripe, userOrders, verifyStripe, cancelOrder, orderDetail } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/authUser.js';

const orderRouter = express.Router();

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth, UpdateStatus);
orderRouter.post('/place', authUser,placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);
orderRouter.post('/userorders',authUser,userOrders);
orderRouter.post('/cancel',authUser,cancelOrder);
orderRouter.post('/verifyStripe',authUser, verifyStripe);
orderRouter.post('/detail',authUser, orderDetail);
export default orderRouter;