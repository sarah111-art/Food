import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Verify from './pages/Verify'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import OrderStatus from './pages/OrderStatus'



const App = () => {
  return (
    <main className='overflow-x-hidden text-[#404040] bg-primary'>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/order/:id" element={<OrderStatus />} />
    </Routes>
    <ToastContainer />
    </main>
  )
}

export default App