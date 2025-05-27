import React from 'react'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io'
import {RiTwitterXLine} from 'react-icons/ri'

function Topbar() {
  return (
    <div className='text-white bg-rabbit-red'>
      <div className='container flex items-center justify-between px-4 py-3 mx-auto'>
        <div className='items-center hidden space-x-4 md:flex'>
            <a className='hover:text-gray-300' href='#'>
                <TbBrandMeta className='w-4 h-4'/>
            </a>
            <a href='#' className='hover:text-gray-300'>
                <IoLogoInstagram className='w-4 h-4'/>
            </a>
            <a href='#' className='hover:text-gray-300'>
                <RiTwitterXLine className='w-4 h-4'/>
            </a>
        </div>
        <div className='flex-grow text-sm text-center'>
            <span>All Types Of Plastic And Cutlery Items Are Available</span>
        </div>
        <div className='hidden md:text-sm md:block'>
            <a href='tel:+91 9574860773' className='text-sm hover:text-gray-300'>
                Call Us
            </a>
        </div>
        <div className='hidden md:block md:text-sm'>
          <a
            href='https://maps.app.goo.gl/GCpFBaWBEBSDNGTj7'
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm hover:text-gray-300'
          >
            &nbsp; Find Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default Topbar
