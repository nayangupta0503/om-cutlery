import React from 'react'
import kitchenImage from '../../assets/kitchen.jpeg'
import bathroomImage from '../../assets/bathroom.jpeg'
import { Link } from 'react-router-dom'

function CollectionSection() {
  return (
    <section className='px-4 py-16 lg:px-0'>
        <div className='container flex flex-col gap-8 mx-auto md:flex-row'>
            {/* Kitchen Collection */}
            <div className='relative flex-1'>
                <img src={kitchenImage} alt="Kitchen Items" className='w-full h-[700px] object-cover'/>
                <div className='absolute p-4 bg-white bottom-8 left-8 bg-opacity-90'>
                    <h2 className='mb-3 text-2xl font-bold text-gray-900'>Kitchen Items</h2>
                    <Link to='/collections/all?category=Kitchen' className='text-gray-900 underline'>Shop Now</Link>
                </div>
            </div>
            {/* Bathroom Items */}
            <div className='relative flex-1'>
                <img src={bathroomImage} alt="Bathroom Items" className='w-full h-[700px] object-cover'/>
                <div className='absolute p-4 bg-white bottom-8 left-8 bg-opacity-90'>
                    <h2 className='mb-3 text-2xl font-bold text-gray-900'>Bathroom Items</h2>
                    <Link to='/collections/all?category=Bathroom' className='text-gray-900 underline'>Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CollectionSection
