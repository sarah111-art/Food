import axios from 'axios'
import { toast } from 'react-toastify'
import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import Footer from '../components/Footer'
const Orders = () => {
  const {backendUrl, token,currency} = useContext(ShopContext)

const [orderData, setOrderData] = useState([])

const loadOrderData = async () => {
  try {
    if(!token) {
      toast.error('Please Login First')
      return
    }
    const response = await axios.post(
      backendUrl + '/api/order/userorders',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    
    if(response.data.success) {
      let allOrdersItem = []
      response.data.orders.map((order) => {
        order.items.map((item) => {
          item['status'] = order.status
          item['payment'] = order.payment
          item['paymentMethod'] = order.paymentMethod
          item['date'] = order.date
          allOrdersItem.push(item)
        })
      })
      setOrderData(allOrdersItem.reverse())
    }
    
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

useEffect(() => {
  loadOrderData()
},[token])
return (
  <section className="max-padd-container mt-16">
    <Title title1="Orders" title2="List" titleStyles="h3" />

    {orderData.length === 0 ? (
      <p className="text-center mt-12 text-gray-500">No orders found.</p>
    ) : (
      <div className="flex flex-col gap-4 mt-8">
        {orderData.map((item, i) => {
          const price = item.price?.[item.size] || 0
          const total = price * (item.quantity || 1)
          return (
            <div
              key={i}
              className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex items-center justify-between"
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-4">
                <div className="flex-none w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                    onError={e => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/64?text=No+Img'
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold mb-1">{item.name}</h5>
                  <p className="text-sm text-gray-600">
                    Price: {currency}
                    {price} &nbsp;|&nbsp; Qty: {item.quantity} &nbsp;|&nbsp; Size: {item.size}
                  </p>
                </div>
              </div>

              {/* Right: Status & Track Button */}
              <div className="text-right flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'pending' ? 'bg-yellow-400' : 'bg-green-500'
                    }`}
                  />
                  <span className="capitalize">{item.status}</span>
                </div>
                <button onClick={loadOrderData} className="btn-secondary !p-1 !px-3 !text-xs">
                  Track Order
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )}
    <Footer/>
  </section>
)
}

export default Orders

