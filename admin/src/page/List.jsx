import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { TbTrash } from 'react-icons/tb'

const List = ({token}) => {
  const [list,setList]=useState([])
  const fetchList=async()=>{
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      }else{
        toast.error('Failed to fetch products')
      }
      //console.log(response.data.products)
    } catch (error) {
      console.log(error)
      toast.error('Failed to fetch products')
    }
  }

  const removeProduct = async (id) => {
    try {
      // Gửi yêu cầu DELETE với ID trong URL
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` }  // Đảm bảo bạn truyền token trong headers nếu cần
      });
  
      if (response.data.success) {
        toast.success('Product removed successfully');
        fetchList(); // Lấy lại danh sách sản phẩm sau khi xóa
      } else {
        toast.error('Failed to remove product');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while removing the product');
    }
  };
  
  useEffect(() => {
    fetchList()
  }, [])
  return (
  <div className='px-2 sm:px-8'>
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr]
      items-center py-1 px-2 bg-white bold-14 sm:bold-16 mb-3 rounded'>
        <h5>Image</h5>
        <h5>Name</h5>
        <h5>Category</h5>
        <h5>Price</h5>
        <h5>Remove</h5>
      </div>
      {/* productlist  */}
      {list.map((item)=>(
        <div key={item._id} className='grid
         grid-cols-[1fr_1fr_1fr_1fr_1fr] 
        md:grid-cols-[1fr_3fr_1fr_1fr_1fr] 
        items-center gap-2 p-1 bg-white rounded-xl'>
          <img src={item.image} alt="" className='w-12 rounded-lg'/>
          <h5 className='text-sm font-semibold'>{item.name}</h5>
          <h5 className='text-sm font-semibold'>{item.category}</h5>
          <div className='text-sm font-semibold'>
  {currency}{item.price && Object.values(item.price).length > 0 ? Object.values(item.price)[0] : 'N/A'}
</div>
          <div ><TbTrash onClick={()=>removeProduct(item._id)} 
            className='text-right md:text-center cursor-pointer text-lg'/></div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default List