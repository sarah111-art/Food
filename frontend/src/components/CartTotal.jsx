import React, { useContext } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { currency, getCartAmount, delivery_charge } = useContext(ShopContext);

  // ensure we never work with NaN
  let subtotal = getCartAmount();
  if (isNaN(subtotal)) subtotal = 0;

  let shipping = subtotal === 0 ? 0 : delivery_charge;
  if (isNaN(shipping)) shipping = 0;

  let total = subtotal + shipping;
  if (isNaN(total)) total = 0;

  return (
    <div className='w-full'>
      <Title title1={'Cart'} title2={'Total'} title1Styles={'h3'} />
      
      <div className='flexBetween pt-3'>
        <h5 className='h5'>Subtotal:</h5>
        <p className='h5'>{currency}{subtotal.toFixed(2)}</p>
      </div>

      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />

      <div className='flexBetween pt-3'>
        <h5 className='h5'>Shipping Fee:</h5>
        <p className='h5'>{currency}{shipping.toFixed(2)}</p>
      </div>

      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />

      <div className='flex justify-between items-center pt-3'>
        <h5 className='h5'>Total Amount:</h5>
        <p className='h5'>{currency}{total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartTotal;
