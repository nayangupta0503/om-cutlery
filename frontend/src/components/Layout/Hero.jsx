import React from 'react'
import heroImg from '../../assets/hero-img.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='relative'>
        <img className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' src={heroImg} alt="Loading" />
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-5'>
            <div className='p-6 text-center text-white'>
                <h1 className='mb-4 text-4xl font-bold tracking-tighter uppercase md:text-9xl'>
                    Kitchen <br/> Ready
                </h1>
                <p className='mb-6 text-sm tracking-tighter md:text-lg'>Explore our kitchen-ready products</p>
                <Link to="/collections/all?category=Kitchen" className="px-6 py-2 text-lg bg-white rounded-sm text-gray-950">Shop Now</Link>
            </div>
        </div>
    </section>
  )
}

export default Hero
