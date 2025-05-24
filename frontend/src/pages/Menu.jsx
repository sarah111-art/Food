import React, { useContext, useEffect, useState } from 'react'
import { LuSettings2 } from 'react-icons/lu'
import { RiSearch2Line } from 'react-icons/ri'
import { categories } from '../assets/data'
import Title from '../components/Title';
import Footer from '../components/Footer';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Item';

const Menu = () => {
  const {foods} = useContext(ShopContext)
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  const [search,setSearch]=useState("")

  const toggleFilter=(value,setState)=>{
    setState ((prev)=>prev.includes(value)? prev.filter((item)=>item !==value):[...prev,value])
  }
  const applyFilters = ()=>{
    let filtered =[...foods];

    if(search){
      filtered = filtered.filter((food)=>
      food.name.toLowerCase().includes(search.toLocaleLowerCase())
      )
    }

    if(category.length){
      filtered=filtered.filter((food)=>
      category.includes(food.category))
    }
    return filtered
  }
const applySorting = (foodsList) => {
  const sortedFoods = [...foodsList];

  switch (sortType) {
    case "low":
      return sortedFoods.sort((a, b) => {
        const aPrice = a.price ? Object.values(a.price)[0] : 0;
        const bPrice = b.price ? Object.values(b.price)[0] : 0;
        return aPrice - bPrice;
      });

    case "high":
      return sortedFoods.sort((a, b) => {
        const aPrice = a.price ? Object.values(a.price)[0] : 0;
        const bPrice = b.price ? Object.values(b.price)[0] : 0;
        return bPrice - aPrice;
      });

    default:
      return sortedFoods;
  }
};


const toggleShowCategories=()=>{
  setShowCategories(!showCategories)
}

  useEffect(()=>{
    let filtered=applyFilters()
    let sorted =applySorting(filtered)
    setFilteredFoods(sorted)
  },[category,sortType,foods,search])

  return (
    <section className='max-padd-container mt-24'>
      {/* search box */}
      <div className='w-full max-w-2xl flexCenter'>
        <div className='inline-flex items-center justify-center bg-white
        overflow-hidden w-full rounded-full p-4 px-5
        '>
          <div className='text-lg cursor-pointer'>
            <RiSearch2Line />
          </div>
          <input value={search} onChange={(e)=>setSearch(e.target.value,setCategory)} type='text' placeholder='Search here....' className='border-none outline-none w-full text-sm pl-4' />
          <div onClick={toggleShowCategories} className='flexCenter cursor-pointer text-lg border-1 pl-2'>
            <LuSettings2 />
          </div>
        </div>
      </div>

      {/* categories filter */}
      {showCategories && (
        <div className='my-14'> 
          <h2 className='h4 mb-4 hidden sm:flex'>Categories :</h2>
          <div className='flexCenter sm:flexStart flex-wrap gap-x-12 gap-y-4'>
            {categories.map((cat) => (
              <label key={cat.name}>
                <input value={cat.name} onChange={(e)=>toggleFilter(e.target.value,setCategory)} type='checkbox' className='hidden peer' />
                <div className='flexCenter flex-col gap-2 peer-checked:text-secondary cursor-pointer'>
                  <div className='bg-white h-20 w-20 flexCenter rounded-full'>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className='object-cover h-10 w-10'
                    />
                  </div>
                  <span className='medium-14'>{cat.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
        // food container
      )}
      <div  className='my-8 mb-20'>
        <div className='flexCenter !item-start gap-7 flex-wrap pb-16
        max-sm:flexCenter text-center max-sm:pb-24'>
          <Title title1={'Our'} title2={'Food List'} titleStyles={'!pb-0'} paraStyles={'!block'}/>
          <div className='flexCenter gap-x-2'>
            <span className='hidden sm:flex medium-16'>Sort by :</span>
            <select onChange={(e)=>setSortType(e.target.value)}  className='text-sm p-2.5 outline-none bg-white
            text-gray-30 rounded'>
              <option className='relavant'>Relavant</option>
              <option value='low'>Low</option>
              <option value='high'>High</option>
            </select>
          </div>
        </div>
      <div className='grid grid-cols-1 
            xs:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 xl:grid-cols-5 gap-8 gap-y-36 mt-14 xl:mt-28'>
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food)=>(
                <Item food={food} key={food._id}/>
                ))
              ):(<p className='capitalize'>No foods found for selected filters</p>)}
        </div>
      </div>
      <Footer/>
    </section>
  );
};


export default Menu;