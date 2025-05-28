import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

function Header() {
  return (
      <header className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200'>
        <Topbar />
        <Navbar />
      </header>
  )
}

export default Header
