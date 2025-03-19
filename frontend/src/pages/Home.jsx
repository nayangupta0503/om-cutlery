import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import CollectionSection from '../components/Products/CollectionSection'
import NewArrival from '../components/Products/NewArrival'
import ProductsDetails from '../components/Products/ProductsDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import {useDispatch, useSelector} from "react-redux";
import { fetchProductsByFilters } from '../redux/slices/productsSlice'
import axios from 'axios'

const Home = () => {
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state)=> state.products)
  const [bestSellerProduct, setBestSellerProduct] = useState(null)

  useEffect(()=>{
    dispatch(fetchProductsByFilters({
      category: "Kitchen",
      limit: 8,
    }));
    // Fetch the best seller products
    const fetchBestSeller = async() =>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchBestSeller();
  },[dispatch])

  return (
    <div>
        <Hero/>
        <CollectionSection/>
        <NewArrival/>

        {/* Best Seller */}
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        {bestSellerProduct ? (
        <ProductsDetails productId={bestSellerProduct._id} />
        ):(
          <p className='text-center'>loading best seller product...</p>
        )}

        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>
            Top Kitchen Essentinals
          </h2>
          <ProductGrid products={products} loading={loading} error={error}/>
        </div>

        <FeaturedCollection />
        
        <FeaturesSection />
    </div>
  )
}

export default Home
