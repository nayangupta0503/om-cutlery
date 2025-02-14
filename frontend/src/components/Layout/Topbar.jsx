import React from 'react'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io'
import {RiTwitterXLine} from 'react-icons/ri'

function Topbar() {
  return (
    <div className='bg-rabbit-red text-white'>
      <div className='container mx-auto flex justify-between items-center py-3 px-4'>
        <div className='hidden md:flex items-center space-x-4'>
            <a className='hover:text-gray-300' href='#'>
                <TbBrandMeta className='h-4 w-4'/>
            </a>
            <a href='#' className='hover:text-gray-300'>
                <IoLogoInstagram className='h-4 w-4'/>
            </a>
            <a href='#' className='hover:text-gray-300'>
                <RiTwitterXLine className='h-4 w-4'/>
            </a>
        </div>
        <div className='text-sm text-center flex-grow'>
            <span>All Types Of Plastic And Cutlery Items Are Available</span>
        </div>
        <div className='hidden md:text-sm md:block'>
            <a href='tel:+91 9574860773' className='text-sm hover:text-gray-300'>
                Call Us
            </a>
        </div>
      </div>
    </div>
  )
}

export default Topbar
