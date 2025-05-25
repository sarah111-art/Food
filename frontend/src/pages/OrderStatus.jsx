import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import Title from '../components/Title'
import Footer from '../components/Footer'

const OrderStatus = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (!token) {
      toast.error('Please login to view order status')
      navigate('/login')
      return
    }
    const fetchOrder = async () => {
      try {
        const res = await axios.post(
          backendUrl + '/api/order/detail',
          { orderId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (res.data.success) setOrder(res.data.order)
        else toast.error('Order not found')
      } catch (err) {
        if (err.response && err.response.status === 401) {
          toast.error('Session expired. Please login again.')
          navigate('/login')
        } else {
          toast.error('Error loading order')
        }
      }
    }
    fetchOrder()
  }, [id, backendUrl, token, navigate])

  if (!order) return <div className="text-center mt-12">Loading...</div>

  return (
    <section className="max-padd-container mt-16 flex flex-col items-center">
      <Title title1="Order" title2="Status" titleStyles="h3" />
      <div className="bg-white rounded-lg shadow p-6 max-w-xl w-full flex flex-col items-center">
        <h4 className="font-bold mb-2 text-center">Order ID: {order._id}</h4>
        <div className="mb-2 text-center">
          <span className="font-semibold">Status:</span>{' '}
          <span className="capitalize">{order.status}</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold">Payment:</span>{' '}
          {(order.payment || order.status === 'delivered') ? 'Paid' : 'Not Paid'}
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold">Method:</span> {order.paymentMethod}
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold">Date:</span>{' '}
          {new Date(order.date).toLocaleString()}
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold">Items:</span>
          <ul className="list-disc ml-6 flex flex-col items-center">
            {order.items.map((item, idx) => (
              <li key={idx} className="mb-4 flex flex-col items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded mb-2 mx-auto"
                  />
                )}
                <span>
                  {item.name} x {item.quantity} ({item.size})
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <span className="font-semibold">Total:</span> {currency}
          {order.amount}
        </div>
      </div>
          <div className="mt-6 w-full flex justify-center">
        <button
          onClick={() => navigate('/menu')}
          className="px-6 py-2 bg-primary text-secondary rounded hover:bg-primary-dark transition"
        >
          Back to menu
        </button>
      </div>
      <div className="mt-10 w-full">
        <Footer />
      </div>
    </section>
  )
}

export default OrderStatus