import React, { useContext, useState } from 'react'
import loginImg  from '../assets/Login.png'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
  const {token, setToken,navigate,backendUrl} = useContext(ShopContext)
  const [currState, setCurrState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try{
      if(currState === 'Sign Up'){
        const response = await axios.post(backendUrl+'/api/user/register', {
          name,
          email,
          password
        }) 
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Account created successfully')
        }else{
          toast.error(response.data.message)
        }
      }else{
        const response = await axios.post(backendUrl+'/api/user/login', {
          email,
          password
        })
        
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Login successfully')
          navigate('/')
        } else {
          toast.error(response.data.message)
        }
        
      }
    }catch(err){
      console.log(err)
      toast.error('Something went wrong')
    }
  }



  return (
    <section className='absolute top-0 left-0 h-full w-full z-50 bg-white'>
      {/* container */}
      <div className='flex h-full w-full'>
        {/* img side */}
        <div className='w-1/2 hidden sm:block'> 
          <img src={loginImg} className='object-cover aspect-square h-full w-full'/>
        </div>
        {/* form side  */}
        <div className='flex w-full sm:w-1/2 justify-center items-center'>
          <form action="" onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800'>
            <div className='w-full mb-4'>
              <h3 className='bold-36'>{currState}</h3>
            </div>
            {currState === 'Sign Up' && (
              <div className=''>
                <label htmlFor="name" className='medium-14'> Name</label>
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" name='name' placeholder='Name' className='w-full px-3 py-1 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />
              </div>
            )}
            <div>
              <label htmlFor="email" className='medium-14'>Email</label>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" name='email' placeholder='Email' className='w-full px-3 py-1 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />

            </div>
            <div>
              <label htmlFor="password" className='medium-14'>PassWord</label>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name='password' placeholder='PassWord' className='w-full px-3 py-1 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none' />

            </div>
            <button type='submit'  className='btn-dark w-full mt-5 !py-[7px] !rounded'>{currState==='Sign Up'?'Sign Up' :'Login'}</button>
            <div>
              <div className='text-center text-sm my-4 '>
                Forgot your password?
              </div>
              {currState==='Login' ?(
                <div className='text-center text-sm my-4 '>Don't have an account?
                <span onClick={()=>setCurrState('Sign Up')} className='cursor-pointer underline'> Create account</span>
                </div>
                ):(
                  <div className='text-center text-sm my-4 '>Already have an account?
                  <span onClick={()=>setCurrState('Login')} className='cursor-pointer underline'> Login</span>
                </div>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login