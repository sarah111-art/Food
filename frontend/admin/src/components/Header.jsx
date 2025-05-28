import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
const Header = () => {
  return (
    <header className='max padd-container flexCenter py-4 bg-white'>
      {/* logo */}
      <Link to="/" className='bold-24 flex items-baseline'>
        <img src={logo} alt="Logo" height={24} width={24}
        className='hidden sm:flex'/>
        <span className='text-secondary'>Food</span>Sun
      </Link >
    </header>
  )
}

export default Header