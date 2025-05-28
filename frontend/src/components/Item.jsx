// import React, { useState } from 'react'
// import { FaStar, FaStarHalfStroke } from 'react-icons/fa6'
// import { TbShoppingBagPlus } from 'react-icons/tb'

// const Item = ({ food }) => {
//   const [size, setSize] = useState(''); // Define size state

//   return (
//     <div className='rounded-xl bg-white relative'>
//       {/* photo */}
//       <div className='flexCenter m-6 rounded-full absolute left-0 right-0 -top-[99px] '>
//         <img
//           src={food.image}
//           alt=''
//           height={177}
//           width={177}
//           className='object-contain aspect-square rounded-xl'
//         />
//       </div>
//       {/* info */}
//       <div className='mx-4 bg-white pt-20'>
//         {/* title & des */}
//         <div className='py-3'>
//           <h4 className='bold-16 line-clamp-1 mb-1'>{food.name}</h4>
//           <div className='flex items-start justify-between pb-1'>
//             <h5 className='medium-14 mb-1'> {food.category}</h5>
//             <div className='flex items-center justify-start gap-x-1 text-secondary bold-14'>
//               <FaStar />
//               <FaStar />
//               <FaStar />
//               <FaStar />
//               <FaStarHalfStroke />
//               <span className='text-tertiary'>4.5</span>
//             </div>
//           </div>
//           <p className='line-clamp-2'>{food.description}</p>
//         </div>
//         {/* food sizes */}
//         <div className='flexBetween mb-2'>
//           <div className='flex gap-1'>
//             {[...food.sizes]
//               .sort((a, b) => {
//                 const order = ['H', 'F', 'S', 'M', 'L', 'XL'];
//                 return order.indexOf(a) - order.indexOf(b);
//               })
//               .map((item, i) => (
//                 <button
//                   onClick={() => setSize(item)}
//                   key={i}
//                   className={`${
//                     item === size ? 'ring-1 ring-state-900/10' : ''
//                   } h-6 w-8 bg-primary text-xs font-semibold rounded-sm`}
//                 >
//                   {item}
//                 </button>
//               ))}
//           </div>
//           <button className='flexCenter gap-x-1 text-[18px] bg-secondary text-white rounded-sm p-[3px]'>
//             <TbShoppingBagPlus />
//           </button>
//         </div>
//         {/* order info */}
//         <div className='flexBetween rounded-xl pn-3 text-[13px] font-semibold'>
//           <div className='flex flex-col gap-1'>
//             <h5>Prep</h5>
//             <p className='text-xs'>Sm</p>
//           </div>
//           <hr className='' />
//           <div className='flex flex-col gap-1'>
//             <h5>Cook</h5>
//             <p className='text-xs'>20 min</p>
//           </div>
//           <hr className='' />
//           <div className='flex flex-col gap-1'>
//             <h5>Price</h5>
//             <p className='text-xs'>$15</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Item;
import React, { useContext, useState } from 'react';
import { FaStar, FaStarHalfStroke } from 'react-icons/fa6';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { ShopContext } from '../context/ShopContext';

const Item = ({ food }) => {
  const [size, setSize] = useState(food.sizes[0]); // Đặt size mặc định
  const {currency ,addToCart}=useContext(ShopContext)
  return (
    <div className='rounded-xl bg-white relative'>
      {/* photo */}
      <div className='flexCenter m-6 rounded-full absolute left-0 right-0 -top-[99px] pizza-spin'>
        <img
          src={food.image}
          alt={food.name}
          height={177}
          width={177}
          className='object-contain aspect-square rounded-xl'
        />
      </div>
      {/* info */}
      <div className='mx-4 bg-white pt-20'>
        {/* title & description */}
        <div className='py-3'>
          <h4 className='bold-16 line-clamp-1 mb-1'>{food.name}</h4>
          <div className='flex items-start justify-between pb-1'>
            <h5 className='medium-14 mb-1'>{food.category}</h5>
            <div className='flex items-center justify-start gap-x-1 text-secondary bold-14'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfStroke />
              <span className='text-tertiary'>4.5</span>
            </div>
          </div>
          <p className='line-clamp-2'>{food.description}</p>
        </div>
        {/* food sizes */}
        <div className='flexBetween mb-2'>
          <div className='flex gap-1'>
            {[...food.sizes]
              .sort((a, b) => {
                const order = ['H', 'F', 'S', 'M', 'L', 'XL'];
                return order.indexOf(a) - order.indexOf(b);
              })
              .map((item, i) => (
                <button
                  onClick={() => setSize(item)}
                  key={i}
                  className={`${
                    item === size ? 'ring-1 ring-state-900/10' : ''
                  } h-6 w-8 bg-primary text-xs font-semibold rounded-sm`}
                >
                  {item}
                </button>
              ))}
          </div>
          <button onClick={()=>addToCart(food._id,size)} className='flexCenter gap-x-1 text-[18px] bg-secondary text-white rounded-sm p-[3px]'>
            <TbShoppingBagPlus />
          </button>
        </div>
        {/* order info */}
        <div className='flexBetween rounded-xl p-3 text-[13px] font-semibold'>
          <div className='flex flex-col gap-1'>
            <h5>Prep</h5>
            <p className='text-xs'>Sm</p>
          </div>
          <hr className='' />
          <div className='flex flex-col gap-1'>
            <h5>Cook</h5>
            <p className='text-xs'>20 min</p>
          </div>
          <hr className='' />
          <div className='flex flex-col gap-1'>
 <h5>Price</h5>
  <p className='text-xs'>
   ${food.price?.[size] ?? 'N/A'}
 </p> </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
