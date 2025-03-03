/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
//import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductsDetails from './components/Products/ProductsDetails'
import Checkout from './components/Cart/Checkout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'

function App() {

  return (
    <BrowserRouter>
    <Toaster position="top-right"></Toaster>
      <Routes>
        <Route path="/" element={<UserLayout />}>
        {/* user layout */}
          <Route index element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='collections/:collection' element={<CollectionPage/>} />
          <Route path='product/:id' element={<ProductsDetails/>} />
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='order-confirmation' element={<OrderConfirmationPage/>}/>
          <Route path='order/:id' element={<OrderDetailsPage/>}/>
        </Route>

        <Route>{/* admin layout */}</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
