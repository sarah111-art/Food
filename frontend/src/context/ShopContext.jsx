import React, { createContext, use, useEffect, useState } from 'react';
//import {foods} from '../assets/data';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
export const ShopContext = createContext()

const ShopContextProvider =(props)=>{
    const currency ='$'
    const delivery_charge =10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [foods,setFoods]=useState([])
    const navigate = useNavigate()
    const [token ,setToken]=useState('')
    const [cartItems,setCartItems] = useState({})
    

    const addToCart =async (itemId,size)=>{
      if(!size){
        toast.error("Pls select the size first")
        return
      }
      let cartData = structuredClone(cartItems)
      if(cartData[itemId]){
        if(cartData[itemId][size])
        {
          cartData[itemId][size]+=1
        }else{
          cartData[itemId][size]=1
        }
      }else{
        cartData[itemId]={}
        cartData[itemId][size]=1
      }
      setCartItems(cartData)

      if(token){
        try {
          await axios.post(backendUrl+'/api/cart/add',{
            itemId,size
          },{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
        } catch (error) {
          console.log(error)
          toast.error("Error while adding the item to cart")
        }
      }
    }
    useEffect(()=>{
      console.log(cartItems)
    },[cartItems])

//getting total cart count
const getCartCount = () => {
  let totalCount = 0;
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      totalCount += cartItems[itemId][size]; 
    }
  }
  return totalCount;
};


//updating the item quantity
const updateQuantity = async (itemId, size, quantity) => {
  let cartData = structuredClone(cartItems);
  cartData[itemId][size] = quantity;
  setCartItems(cartData);

  if (token) {
    try {
      // Make sure the token is sent in the correct Authorization header format
      await axios.post(
        backendUrl + '/api/cart/update',
        { itemId, size, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly formatted token
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error('Error while updating the item in cart');
    }
  }
};


//getting cart amount
const getCartAmount=()=>{
  let totalAmount=0
  for (const items in cartItems)
  {
    let filtered =foods.find((food)=>food._id===items)
    for(const item in cartItems[items]){
      try{
        if(cartItems[items][item] > 0){
          totalAmount+=filtered.price[item] + cartItems[items][item]
        }
      }
    catch(error){
      console.log(error)
    }
  }

}
return totalAmount
}
//getting all food data
const getProductsData = async () => {
  try { 
    const response = await axios.get(backendUrl+'/api/product/list')
    if(response.status === 200 && response.data.success){
      setFoods(response.data.products)
    } else {
      toast.error("Error while fetching the data")
    }
  } catch (error) {
    console.error(error);
  }
}

//getting the cart data
const getUserCart = async (token) => {
  if (!token) {
    toast.error('No token found');
    return;
  }

  try {
    console.log("Sending token:", token);  // Debug log for token
    const response = await axios.post(
      backendUrl + '/api/cart/get',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Ensure this is the correct header format
        },
      }
    );
    if (response.status === 200 && response.data.success) {
      setCartItems(response.data.cartData);
    } else {
      toast.error('Error while fetching the cart data');
    }
  } catch (error) {
    console.error(error);
    toast.error('Error while fetching the cart data');
  }
};




useEffect(() => {
  if (token && localStorage.getItem('token')) {
    setToken(localStorage.getItem('token'));
    getUserCart(localStorage.getItem('token')); // Fetch the cart data once token is set
  }
  getProductsData(); // Fetch the food products
}, [token]);

    const contextValue={foods,currency,navigate,cartItems,setCartItems,addToCart,getCartCount,token ,setToken,updateQuantity,getCartAmount,delivery_charge,backendUrl}

  return (
    <ShopContext.Provider value={contextValue }>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;