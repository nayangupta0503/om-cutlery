import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const cart ={ 
    produts: [
    {
      productId: 1,
      name: "T-Shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "Xl",
      color: "Blue",
      quantity: 1,
      price: 24,
      image: "https://picsum.photos/200?random=1",
    },
  ],
  totalPrice: 39
}

const Checkout = () => {

    const [checkoutId, setCheckoutId] = useState(null)
    const navigate = useNavigate()
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    const handleCreateCheckout = (e)=>{
        e.preventDefault()
        navigate('/order-confirmation')
    }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
      {/* Left Section */}
      <div className='bg-white rounded-lg p-6'>
        <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
            <h3 className='text-lg mb-4'>Contact Details</h3>
            <div className='mb-4'>
                <label className='block text-gray-700'></label>
                <input 
                type="email" 
                value="user@example.com" 
                className='w-full p-2 border rounded'
                disabled
                />
            </div>
            <h3 className='text-lg mb-4'>Delivery</h3>
            <div className='mb-4 grid grid-cols-2 gap-4'>
                <div>
                    <label className='block text-gray-700'>First Name</label>
                    <input 
                    type="text"
                    value={shippingAddress.firstName} 
                    onChange={(e)=> setShippingAddress({
                        ...shippingAddress,
                        firstName: e.target.value
                    })}
                    className='w-full p-2 border rounded' r
                    equired 
                    />
                </div>
                <div>
                    <label className='block text-gray-700'>Last Name</label>
                    <input 
                    type="text"
                    value={shippingAddress.lastName} 
                    onChange={(e)=> setShippingAddress({
                        ...shippingAddress,
                        lastName: e.target.value
                    })}
                    className='w-full p-2 border rounded' r
                    equired 
                    />
                </div>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700'>Address</label>
                <input 
                type="text" 
                value={shippingAddress.address} 
                onChange={(e)=>setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                })}
                className='w-full p-2 border rounded'
                required
                />
            </div>  
            <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
                    <label className='block text-gray-700'>City</label>
                    <input 
                    type="text"
                    value={shippingAddress.city} 
                    onChange={(e)=> setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value
                    })}
                    className='w-full p-2 border rounded' r
                    equired 
                    />
                </div>
                <div>
                    <label className='block text-gray-700'>Postal Code</label>
                    <input 
                    type="text"
                    value={shippingAddress.postalCode} 
                    onChange={(e)=> setShippingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value
                    })}
                    className='w-full p-2 border rounded' r
                    equired 
                    />
                </div>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700'>Country</label>
                <input 
                type="text" 
                value={shippingAddress.country} 
                onChange={(e)=>setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                })}
                className='w-full p-2 border rounded'
                required
                />
            </div> 
            <div className='mb-4'>
                <label className='block text-gray-700'>Phone</label>
                <input 
                type="tel" 
                value={shippingAddress.phone} 
                onChange={(e)=>setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                })}
                className='w-full p-2 border rounded'
                required
                />
            </div> 
            <div className='mt-6'>
                {!checkoutId ? (
                    <button type='submit' className='w-full bg-black text-wrap text-white py-3 rounded'>Order Now</button>
                ):(
                    <div>
                        <h3 className='text-lg mb-4'>Pay with UPI</h3>
                    </div>
                )}
            </div>
        </form>
      </div>
      {/* Right Section */}
      <div className='bg-gray-50 p-6 rounded-lg'>
        <h3 className='text-lg mb-4'>Order Summary</h3>
        <div className='border-t py-4 mb-4'>
            {cart.produts.map((product, index)=>(
                <div key={index} className='flex items-start justify-between py-2 border-b'>
                    <div className='flex items-start'>
                        <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4' />
                        <div>
                            <h3 className='text-md'>{product.name}</h3>
                            <p className='text-gray-500'>Size: {product.size}</p>
                            <p className='text-gray-500'>Color: {product.color}</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-xl'>&#8377;{product.price?.toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between items-center text-lg mb-4'>
            <p>Subtotal</p>
            <p>&#8377;{cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className='flex justify-between items-center text-lg'>
            <p>Shipping</p>
            <p>Free</p>
        </div>
        <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
            <p>Total</p>
            <p>&#8377;{cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
