import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import Item from './Item'
import {ShopContext} from '../context/ShopContext'
const PopularFood = () => {
    const {foods}=useContext(ShopContext)
    const [popularFoods, setPopularFoods] = useState([])

    useEffect(() => {
        const data =foods.filter(item=> item.popular)
        setPopularFoods(data.slice(0,5))}, [foods])
  return (
   <section className='max-padd-container py-16'>
    <Title title1={'Popular'} title2={'Foods'} titleStyles={'text-center !pb-20'} 
    paraStyles={'!block'}/>
    {/* container */}
    <div className='grid grid-cols-1 
            xs:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 xl:grid-cols-5 gap-8 gap-y-36'>
        {popularFoods.map(food=>(
            <div key={food._id} >
                <Item food={food}/>
                </div>
        ))}
    </div>
   </section>
  )
}

export default PopularFood