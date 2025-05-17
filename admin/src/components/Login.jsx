import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logoInImg from '../assets/login.png';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            console.log("Sending data:", { email, password }); // Log data being sent
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
            console.log(response);
            if (response.data.success) {
                setToken(response.data.token); // Save token to parent state
                localStorage.setItem('token', response.data.token); // Save token to localStorage
                toast.success("Login successful!");
                navigate('/'); // Redirect to homepage
            } else {
                toast.error(response.data.error); // Show error message if any
            }
        } catch (error) {
            console.log("Error:", error.response?.data?.error || error.message); // Log error if any
            toast.error(error.response?.data?.error || "Login failed!");
        }
    };

    return (
        <section className='absolute top-0 left-0 h-full w-full z-50 bg-white'>
            {/* container */}
            <div className='flex h-full w-full'>
                {/* img */}
                <div className='w-1/2 hidden sm:block'>
                    <img src={logoInImg} alt="login" className='object-cover h-full w-full' />
                </div>
                {/* form side */}
                <div className='flexCenter w-full sm:w-1/2'>
                    <form action="" onSubmit={onSubmitHandler}
                        className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gary-800 '>
                        <div className='w-full mb-4'>
                            <h3 className='bold-24'>Login</h3>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="email" className='medium-15'>Email</label>
                            <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Update email state
                                className='w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1' />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="password" className='medium-15'>Password</label>
                            <input
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Update password state
                                className='w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1' />
                        </div>
                        <button type='submit'
                            className='btn-dark w-full mt-5 !py-[7px] !rounded'>Login</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;