import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { TfiPackage } from 'react-icons/tfi'

const ITEMS_PER_PAGE = 10;

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)

  const fetchAllOrders = async () => {
    if (!token) {
      toast.error('Please Login First')
      return
    }
    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        {
          headers: { token }
        }
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

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: e.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Status Updated')
        fetchAllOrders()
      }
    } catch (error) {
      toast.error('Error updating status')
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  // Sắp xếp đơn hàng theo ngày mới nhất lên đầu
  const sortedOrders = [...orders].sort((a, b) => b.date - a.date)

  // Pagination logic
  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE)
  const paginatedOrders = sortedOrders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  // Hiển thị màu cho trạng thái
  const statusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'confirmed': return 'text-blue-500';
      case 'delivered': return 'text-green-600';
      case 'cancelled': return 'text-red-500';
      default: return '';
    }
  }

  return (
    <div className='px-2 sm:px-8'>
      <div className='flex flex-col gap-4 mt-8'>
        {paginatedOrders.map((order) => (
          <div
            key={order._id}
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border border-gray-300 p-4 rounded-lg'
          >
            <div className='flex items-center justify-center'>
              <TfiPackage className='text-3xl text-secondary' />
            </div>
            <div>
              <div className='flex flex-col gap-2'>
                <div className='medium-14'>Items:</div>
                <div className='flex flex-col relative top-0.5'>
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.name} x {item.quantity} <span>"{item.size}"</span>
                      {index < order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>
              </div>
              <p>
                <span>Name:</span>
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <p>
                <span>Address:</span>
              </p>
              <span>{order.address.street + ', '}</span>
              <span>
                {order.address.city +
                  ', ' +
                  order.address.state +
                  ', ' +
                  order.address.country +
                  ', ' +
                  order.address.zipcode}
              </span>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p>
                <span className='text-tertiary medium-14'>Total:</span>
                {order.items.length}
              </p>
              <p>
                <span className='text-tertiary medium-14'>Method:</span>
                {order.paymentMethod}
              </p>
              <p>
                <span className='text-tertiary medium-14'>Payment:</span>
                {order.payment ? 'Paid' : 'Not Paid'}
              </p>
              <p>
                <span className='text-tertiary medium-14'>Date:</span>
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>
                <span className='text-tertiary medium-14'>Price:</span>
                {currency}
                {order.amount}
              </p>
              <p>
                <span className='text-tertiary medium-14'>Status:</span>
                <span className={statusColor(order.status) + ' font-semibold ml-2'}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className='p-1 ring-1 rounded-md border border-gray-300 mt-2'
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
        {/* Pagination controls */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">{page} / {totalPages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Orders