import React from 'react'
import { Link } from 'react-router-dom';
import featured from '../../assets/featured.jpeg'

function FeaturedCollection() {
  return (
  <section className='py-16 px-4 lg:px-0'>
    <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
        {/* left content */}
        <div className='lg:w-1/2 p-8 text-center lg:text-left'>
            <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                Durability and Design
            </h2>
            <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
                Stylish Essentials for Your Table
            </h2>
            <p className='text-lg text-gray-600 mb-6'>
            At Om Cutlery, we offer high-quality plastic and cutlery items designed to make every meal easier and more enjoyable. Whether you're hosting a dinner or enjoying a quick lunch, our products combine durability with style to fit seamlessly into your everyday routine.
            </p>
            <Link to="/collection/all" className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800'>
            Shop Now
            </Link>
        </div>

        {/* Right Content */}
        <div className='lg:w-1/2'>
            <img src={featured} alt="Featured Collection"
            className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' 
            />
        </div>
    </div>
  </section>
  );
};

export default FeaturedCollection
