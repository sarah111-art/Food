import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const OrderStatus = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      toast.error('Please Login First')
      return
    }
    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error('Failed to fetch orders')
      }
    } catch (error) {
      toast.error('Error fetching orders')
    }
  }

  useEffect(() => {
    fetchAllOrders()
    // eslint-disable-next-line
  }, [token])

  // Thống kê số đơn hàng theo ngày
  const statsByDate = orders.reduce((acc, order) => {
    const date = new Date(order.date).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(statsByDate).map(([date, count]) => ({
    date,
    count,
  }))

  return (
    <div className="px-2 sm:px-8 my-8">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-4">
Order statistics by day</h2>
        <ResponsiveContainer width={500} height={500}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#FFA500" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default OrderStatus