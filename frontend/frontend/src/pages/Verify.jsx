import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const Verify = () => {
  const {navigate ,token ,setCartItems} = useContext(ShopContext)
  const [searchParams,setSearchParams] = useSearchParams()
const success = searchParams.get('success')
const orderId = searchParams.get('orderId')

  const VerifyPayment = async () => {
    try {
      if(!token) {
        return null
      } 
      const response = await axios.post(
        backendUrl + '/api/order/verify',
        {success,orderId},
        {
          headers: { token }
        })
        if (response.data.success) {
          toast.success('Payment Verified')
          setCartItems({})
          navigate('/orders')
        }else{
          navigate('/cart')
        }
    } catch (error) {
      console.log(error)
      toast.error('Error verifying payment')
    }
  }
  useEffect(() => {
    VerifyPayment()
  }, [token])
  return (
    <div>Verify</div>
  )
}

export default Verify