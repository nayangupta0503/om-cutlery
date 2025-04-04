import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import login from '../assets/login.jpeg'
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, mergeCart } from '../redux/slices/cartSlice';

const Register = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [phoneValid, setPhoneValid] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const {user, guestId, loading} = useSelector((state)=> state.auth)
    const {cart} = useSelector((state)=> state.cart)

    // Get redirect parameter and check if it's checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout")

    useEffect(()=>{
      if(user){
        dispatch(fetchCart({ userId: user}));
        if(cart?.products.length > 0 && guestId){
          dispatch(mergeCart({guestId, user})).then(()=>{
            navigate(isCheckoutRedirect ? "/checkout" : "/")
          });
        }else{
          navigate(isCheckoutRedirect ? "/checkout" : "/")
        }
      }
    },[user, guestId, cart, navigate, isCheckoutRedirect, dispatch])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(phone.length !== 10 || isNaN(phone)){
            setPhoneValid(true)
            return
        }

        dispatch(registerUser({name, phone, email, password}))
    }

  return (
    <div className='flex'>
      <div className='flex-col items-center justify-center w-full p-8 md:w-1/2 md:p-12'>
        <form onSubmit={handleSubmit} className='w-full max-w-md p-8 bg-white border rounded-lg shadow-sm'>
            <div className='flex justify-center mb-6'>
                <h2 className='text-xl font-medium'>Om Cutlery</h2>
            </div>
            <h2 className='mb-6 text-2xl font-bold text-center'>Hey there! 👋</h2>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold">Name*</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e)=>setName(e.target.value)}
                  className='w-full p-2 border rounded'
                  placeholder='Enter Your Name'
                  required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold">Phone Number*</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e)=>{
                    setPhoneValid(false)
                    setPhone(e.target.value)
                  }}
                  className='w-full p-2 border rounded'
                  placeholder='Enter Your phone number'
                  required
                />
                <label className={`${phoneValid ? 'block text-red-500' : 'hidden'}`}>Please enter valid phone number</label>
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold">Email (optional)</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)}
                  className='w-full p-2 border rounded'
                  placeholder='Enter Your Email Addess'
                />
            </div>
            <div className='mb-4'>
                <label className='block mb-2 text-sm font-semibold'>Password*</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className='w-full p-2 border rounded'
                  placeholder='Enter your Password' 
                  required
                />
            </div>
            <button type="submit" className='w-full p-2 font-semibold text-white transition bg-black rounded-lg hover:bg-gray-800'>{loading ? "Loading..." : "Sign Up"}</button>
            <p className='mt-6 text-sm text-center'>
                Already have an Account?{" "}
                    <Link to={`/login?redirect=${encodeURIComponent(redirect)}`}         
                     className='text-blue-500'>
                     Login
                    </Link>
            </p>
        </form>
      </div>
      <div className='hidden w-1/2 bg-gray-800 md:block'>
        <div className='flex flex-col items-center justify-center h-full'>
            <img
             src={login} 
             alt="Login"
             className='h-[700px] w-full object-cover' 
            />
        </div>
      </div>
    </div>
  )
}

export default Register
