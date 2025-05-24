import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import List from './page/List'
import { Route, Routes } from 'react-router-dom'
import Orders from './page/Orders'
import Add from './page/Add'

export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency='$' 
import { ToastContainer, toast } from 'react-toastify';
import Login from './components/Login'
import OrderStatus from './page/OrderStatus'


function App() {
  const [token ,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <main>
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} /> 
      ) : (
      <div className='bg-primary text-[#404040]'>
        <Header />
        <div className='mx-auto max-w-[1440px] flex flex-col sm:flex-row mt-8 sm:mt-4'>
          <Sidebar  token={token} setToken={setToken} />
          <Routes>
            <Route path="/" element={<Add token={token}/>} />
            <Route path="/list" element={<List token={token}/>} />
            <Route path="/orders" element={<Orders token={token}/>} />
            <Route path="/order-status" element={<OrderStatus token={token} />} />
            </Routes>
        </div>
      </div>
      )}
    </main>
  
  )
}

export default App