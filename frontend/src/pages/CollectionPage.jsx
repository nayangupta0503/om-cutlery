import React, { useEffect, useState, useRef } from 'react'
import {FaFilter} from 'react-icons/fa'
import FilterSidebar from '../components/Products/FilterSidebar'
import SortOption from '../components/Products/SortOption'
import ProductGrid from '../components/Products/ProductGrid'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/slices/productsSlice'

const CollectionPage = () => {
    const {collection} = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state)=>state.products)
    const queryParams = Object.fromEntries([...searchParams])
    const sidebarRef = useRef(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(()=>{
      dispatch(fetchProductsByFilters({collection, ...queryParams}))
    },[dispatch, collection, searchParams])
    
    const toggleSidebar =()=>{
        setIsSidebarOpen(!isSidebarOpen)
    }

    const handleClickOutside = (e) =>{
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setIsSidebarOpen(false)
        }
    }

    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
          document.removeEventListener("mousedown", handleClickOutside);
        }
    },[])

  return (
    <div className='flex flex-col lg:flex-row'>
        {/* Mobile Filter */}
        <button 
        className='lg:hidden border p-2 flex justify-center items-center'
        onClick={toggleSidebar}
        >
            <FaFilter className='mr-2'/> Filters
        </button>

        {/* filter sidebar */}
        <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar/>
        </div>
        <div className='flex-grow p-4'>
            <h2 className='text-2xl uppercase mb-4'>All Collection</h2>

            {/* Sort Option */}
            <SortOption/>

            <ProductGrid products={products} loading={loading} error={error}/>
        </div>
    </div>
  )
}

export default CollectionPage
