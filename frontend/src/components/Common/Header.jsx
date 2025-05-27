import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

function Header() {
  return (
    <div className="pt-[6.5rem] md:pt-[6.5rem] lg:pt-[6.5rem] sm:pt-[6.5rem]">
      <header className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200'>
        <Topbar />
        <Navbar />
      </header>
    </div>
  )
}

export default Header
