//import { currency } from "../../admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const currency = 'usd';
const Delivery_Charges = 10; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
      const userId = req.userId;  // lấy từ token đã decode trong middleware
      const { items, amount, address, paymentMethod = 'cod' } = req.body;
  
      if (!items || !amount || !address) {
        return res.status(400).json({ message: 'Missing order data' });
      }
  
      const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod,
        payment: false,
        date: Date.now(),
         status: 'pending' 
      };
  
      const newOrder = new orderModel(orderData);
      await newOrder.save();
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
  
      res.status(200).json({ message: 'Order Placed Successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
// const placeOrderStripe = async (req, res) => {
//   try {
//     const { items, amount, address,userId } = req.body
//     const {origin} =req.headers
//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod :"stripe",
//       payment: false,
//       date: Date.now()
//     };
//     const newOrder = new orderModel(orderData)
//     await newOrder.save()
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency:currency,
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price[item.size] * 100 *277,
//       },
//       quantity: item.quantity,

//     }))
//   line_items.push({
//   price_data: {
//     currency: currency,
//     product_data: {
//       name: "Delivery_Charges",
//     },
//     unit_amount: Delivery_Charges * 100 * 277},
//   quantity: 1,
//   })
//   const session = await stripe.checkout.sessions.create({
//     success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//     cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//     line_items,
//     mode: 'payment',

//   })
//   res.json({ success: true, session_url: session.url })
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message })
//   }
//  }
const placeOrderStripe = async (req, res) => {
  try {
    // 1. Lấy userId từ middleware authUser
    const userId = req.userId

    // 2. Lấy phần còn lại từ body
    const { items, amount, address } = req.body
    const { origin } = req.headers

    if (!items || !amount || !address) {
      return res.status(400).json({ success: false, message: 'Missing data' })
    }

    // 3. Tạo order trước (status pending)
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'stripe',
      payment: false,
      date: Date.now(),
       status: 'pending' 
    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()

    // 4. Chuyển items thành line_items cho Stripe
    const line_items = items.map(item => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: Math.round(item.price[item.size] * 100),  // ko nhân thêm 277
      },
      quantity: item.quantity,
    }))

    // Thêm phí giao hàng
    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: 'Delivery Charges' },
        unit_amount: Math.round(Delivery_Charges * 100),
      },
      quantity: 1,
    })

    // 5. Tạo session Checkout
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
    })

    // 6. Trả về session URL
    res.status(200).json({ success: true, session_url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}
const allOrders = async (req, res) => { 
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
    
  } catch (error) {
    confirm.log(error.message);
    res.json({ success: false, message:error.message })
  }
}
const userOrders = async (req, res) => { 
  try {
    // Lấy userId trực tiếp từ middleware authUser
    const userId = req.userId

    const orders = await orderModel.find({ userId })

    res.json({ success: true, orders })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}


const UpdateStatus = async (req, res) => { 

  try {
    const { orderId, status } = req.body
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Status Updated' })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}

const verifyStripe = async (req, res) => {
  const { success, orderId, userId } = req.body
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.json({ success: true, message: 'Payment Successful' })
    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false, message: 'Payment Failed' })
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}
//cancel orders
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.userId;
    const order = await orderModel.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.status && order.status !== "pending") {
      return res.status(400).json({ error: "Order cannot be cancelled" });
    }
    // Kiểm tra thời gian đặt hàng
    const now = Date.now();
    const orderTime = new Date(order.date).getTime();
    if (now - orderTime > 2 * 60 * 1000) {
      return res.status(400).json({ error: "Cancel time expired (over 2 minutes)" });
    }

    order.status = "cancelled";
    await order.save();
    res.json({ success: true, message: "Order cancelled" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
//order detail
const orderDetail = async (req, res) => {
  try {
    const { orderId } = req.body;
    // Nếu là user, chỉ cho xem đơn của mình (nếu cần bảo mật)
    const userId = req.userId;
    const order = await orderModel.findOne({ _id: orderId, userId });
    //const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    UpdateStatus,
    verifyStripe, 
    cancelOrder,
    orderDetail,

}

