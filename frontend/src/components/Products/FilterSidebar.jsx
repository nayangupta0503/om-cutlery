import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [filters, setFilters] = useState({
        category: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
    })

    const [priceRange, setPriceRange] = useState([0,100])

    const categories = ["Kitchen", "Bathroom"]

    const colors = [
        "Red",
        "Green",
        "Blue",
        "Black",
        "Yellow",
        "Gray",
        "White",
        "Pink",
    ]

    const sizes = ["Small", "Medium", "Large"]

    const materials = ["Plastic", "Steel", "Aluminium", "Fiber", "Iron"]

    const brands = [
        "Prakash",
        "Aristo",
        "Omax",
        "Royal",
        "Cello",
        "Supremewere"
    ]

    useEffect(()=>{
        const params = Object.fromEntries([...searchParams])

        setFilters({
            category : params.category || "",
            color: params.color || "",
            size : params.size ? param.size.split(',') : [],
            material: params.material ? param.material.split(',') : [],
            brand : params.brand ? param.brand.split(',') : [],
            minPrice : params.minPrice || 0,
            maxPrice : params.maxPrice || 100, 
        })
    },[searchParams])

  return (
    <div className='p-4'>
      <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>

      {/* Category Filter */}
      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Category</label>
        {categories.map((category)=>(
            <div key={category} className='flex items-center mb-1'>
                <input type="radio" name='category' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                <span className='text-gray-700'>{category}</span>
            </div>
        ))}
      </div>

      {/* color Filter */}
      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Color</label>
        <div className='flex flex-wrap gap-2'>
            {colors.map((color)=>(
                <button 
                key={color} 
                name='color' 
                className='w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105'
                style={{backgroundColor: color.toLowerCase() }}
                />
            ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Size</label>
            {sizes.map((size)=>(
                <div key={size} className='flex items-center mb-1'>
                    <input 
                    type="checkbox" 
                    name='size' 
                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                    />
                    <span className='text-gray-700'>{size}</span>
                </div>
            ))}
      </div>
    </div>
  )
}

export default FilterSidebar
