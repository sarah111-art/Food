import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import Footer from '../components/Footer'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    foods,
    getCartAmount,
    delivery_charge,
    token
  } = useContext(ShopContext)

  const [method, setMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    zipcode: '',
    country: '',
    city: '',
    state: ''
  })

  const onChangeHandle = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandle = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
  
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(foods.find(food => food._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log(orderItems)
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charge
      }
  
      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          console.log(response)
          if (response.status === 200) {
            setCartItems({})
            toast.success('Order placed successfully!')
            navigate('/orders')
          } else {
            toast.error('Something went wrong')
          }
          
          break;
          case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }

          )
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }else
          {
            toast.error(responseStripe.data.message)
          }
        default:
          break;
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to place order')
    }
  }
  

  return (
    <section className='max-padd-container mt-24'>
      <form onSubmit={onSubmitHandle} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            <Title title1={'Delivery'} title2={'Info'} title1Styles={'h3'} />
            <div className='flex flex-col gap-4'>
              <input required onChange={onChangeHandle} value={formData.firstName} type="text" name='firstName' placeholder='First Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
              <input required onChange={onChangeHandle} value={formData.lastName} type="text" name='lastName' placeholder='Last Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            </div>
            <input required onChange={onChangeHandle} value={formData.email} type="text" name='email' placeholder='Email' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            <input required onChange={onChangeHandle} value={formData.phone} type="text" name='phone' placeholder='Phone Number' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            <input required onChange={onChangeHandle} value={formData.street} type="text" name='street' placeholder='Street' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            <input required onChange={onChangeHandle} value={formData.city} type="text" name='city' placeholder='City' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            <input required onChange={onChangeHandle} value={formData.state} type="text" name='state' placeholder='State' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            <div className='flex flex-col gap-4'>
              <input required onChange={onChangeHandle} value={formData.zipcode} type="text" name='zipcode' placeholder='Zip Code' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
              <input required onChange={onChangeHandle} value={formData.country} type="text" name='country' placeholder='Country' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
            </div>
          </div>

          <div>
            <CartTotal />
            <div className='my-6'>
              <h3 className='bold-20 mb-5'>Payment <span>Method</span></h3>
              <div className='flex items-center gap-4'>
                <div onClick={() => setMethod('stripe')} className={`${method === 'stripe' ? 'btn-secondary' : 'btn-light'} !p-1 text-xs cursor-pointer`}>Stripe</div>
                <div onClick={() => setMethod('cod')} className={`${method === 'cod' ? 'btn-secondary' : 'btn-light'} !p-1 text-xs cursor-pointer`}>Cash on Delivery</div>
              </div>
            </div>
            <button className='btn-dark !rounded' type='submit'>Place Order</button>
          </div>
        </div>
      </form>
      <Footer />
    </section>
  )
}

export default PlaceOrder
