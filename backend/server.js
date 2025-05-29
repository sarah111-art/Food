import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import contactRoute from './routes/contactRoute.js';

const app = express();
const port = process.env.PORT || 5000;
connectDB(); // Connect to MongoDB
connectCloudinary(); // Connect to Cloudinary
//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/user',userRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/contact', contactRoute);
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// This is a test update