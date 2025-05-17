import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { FaMinus, FaPlus, FaRegWindowClose } from 'react-icons/fa'
import Footer from '../components/Footer'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const {foods,cartItems,currency,navigate,updateQuantity} =useContext(ShopContext)
  const [cartData,setCartData] =useState([])
  const [quantities,setQuantities]=useState([])

  useEffect(()=>{
    if(foods.length>0){
      const tempData=[]
      const initialQuantities={}
      for(const items in cartItems){
        for (const item in cartItems[items] )
        {
          if(cartItems[items][item]>0){
            tempData.push(
              {
                _id:items,
                size:item,
                quantity:cartItems[items][item]
              }
            );
            initialQuantities[`${items}-${item}`]=cartItems[items][item]
          }
        }
      }
     setCartData(tempData)
     setQuantities(initialQuantities)
    }
  },[cartItems,foods]
  )

  const increment = (id, size) => {
    const key = `${id}-${size}`;
    const newValue = quantities[key] + 1;
  
    // Update local quantities state
    setQuantities((prev) => ({ ...prev, [key]: newValue }));
  
    // Update the cartItems state in the context
    updateQuantity(id, size, newValue);
  };
  const decrement =(id,size)=>{
    const key =`${id}-${size}`;
    if(quantities[key]>1){
      const newValue=quantities[key]-1
      setQuantities(prev => ({...prev,[key]:newValue}))
      updateQuantity(id,size,newValue)
    }
  }

  return (
    <section className='max-padd-container mt-24'> 
      <div className='pt-6'>    
          <Title title1={'Cart'} title2={'List'} title1Styles={'h3'}/>
          {/* container */}
          <div>
            {cartData.map((item,i)=>{
              const productData =foods.find(product=>product._id===item._id)
              const key =`${item._id}-${item.size}`
              return (
                <div key={i} className='p-2 rounded-xl bg-white mt-2'>
                    <div className='flex items-center gap-x-3'>
                      <div className='flex items-start gap-6 p-2 bg-primary rounded-xl'>
                        <img src={productData.image} alt='' className='w-16 sm:w-18'/>
                      </div>
                      <div className='flex flex-col w-full'>
                        <div className='flexBetween'>
                          <h5 className='h5 !my-0 line-clamp-1'>
                            {productData.name}
                          </h5>
                          <FaRegWindowClose onClick={()=>updateQuantity(item._id,item.size)}/>
                        </div>
                        <p className='bold-14 my-0.5'>
                          {item.size}
                        </p>
                        <div className='flexBetween'>
                          <div className='flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary'>
                            <button onClick={()=>decrement(item._id,item.size)} className='p-1.5 bg-white text-secondary rounded-full shadow-md'><FaMinus/></button>
                            <p className='px-2'>{quantities[key]}</p>
                            <button onClick={()=>increment(item._id,item.size)}  className='p-1.5 bg-white text-secondary rounded-full shadow-md'><FaPlus/></button>
                          </div>
                          <h4 className='h4'>{currency}{productData.price[item.size]}</h4>
                        </div>
                      </div>
                    </div>
                </div>
              )
            })}
          </div>
          <div>
            <CartTotal/>
            <button onClick={()=>navigate('/place-order')} className='btn-dark'>Proceed to Checkout</button>
          </div>
      </div>
      <Footer/>
    </section>
  )
}

export default Cart