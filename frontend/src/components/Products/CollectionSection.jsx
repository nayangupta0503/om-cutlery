import React from 'react'
import kitchenImage from '../../assets/kitchen.jpeg'
import bathroomImage from '../../assets/bathroom.jpeg'
import { Link } from 'react-router-dom'

function CollectionSection() {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
            {/* Kitchen Collection */}
            <div className='relative flex-1'>
                <img src={kitchenImage} alt="Kitchen Items" className='w-full h-[700px] object-cover'/>
                <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>Kitchen Items</h2>
                    <Link to='collection/all?type=kitchen' className='text-gray-900 underline'>Shop Now</Link>
                </div>
            </div>
            {/* Bathroom Items */}
            <div className='relative flex-1'>
                <img src={bathroomImage} alt="Bathroom Items" className='w-full h-[700px] object-cover'/>
                <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>Bathroom Items</h2>
                    <Link to='collection/all?type=bathroom' className='text-gray-900 underline'>Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CollectionSection
