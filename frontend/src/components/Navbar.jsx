import React from 'react'
import { TbHomeFilled } from 'react-icons/tb'
import { IoMdListBox } from 'react-icons/io'
import { IoMailOpen } from 'react-icons/io5'
import { FaRegWindowClose } from 'react-icons/fa'
import { Link ,NavLink} from 'react-router-dom'
const Navbar = ({containerStyles,toggleMenu,menuOpened}) => {
  const navItems = [
    { to: '/',label:'Home',icon:<TbHomeFilled/>},
    { to: '/menu',label:'Menu',icon:<IoMdListBox/>},
    { to: '/contact',label:'Contact',icon:<IoMailOpen/>},

  ]
  return (
   <nav className={containerStyles}>
    {/* close button inside navbar */}
    {menuOpened && (
    <>
      <FaRegWindowClose onClick={toggleMenu} 
      className='text-xl self-end cursor-pointer relative left-8'/>
      {/* logo */}
      <Link to={'/'} className='bold-24 m-10'>
       <h4 className='text-secondary'>FoodSun</h4></Link>
    </>


  )}
  {navItems.map(({to, label, icon}) => (
    <div key={label} className='inline-flex'>
      <NavLink 
      to={to} 
      className={({isActive})=> isActive ? "active-link flexCenter gap-x-2" : "flexCenter gap-x-2"}>
     <span className='text-1' >{icon}</span>
     <h5 className='medium-16' >{label}</h5>
      </NavLink>
    </div>
  ))}
   </nav>
  )
}

export default Navbar