import React from "react";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi"
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="py-12 border-t">
      <div className="container grid grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-4 lg:px-0">
        <div>
          <h3 className="mb-4 text-lg text-gray-800">Newsletter</h3>
          <p className="mb-4 text-gray-500">
            Be the first to hear about new products, exclusiv events and online
            offers.
          </p>
          <p className="mb-6 text-sm font-medium text-gray-600">
            Sign up and get 10%off on your first order
          </p>
          {/* Newsletter Form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-3 text-sm transition-all border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="px-6 py-3 text-sm text-white transition-all bg-black rounded-r-md hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop links */}
        <div>
          <h3 className="mb-4 text-lg text-gray-800">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="transition-colors hover:textgray-600">Kitchen Items</Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:textgray-600">Bathroom Items</Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:textgray-600">School Items</Link>
            </li>
          </ul>
        </div>
        {/* support links */}
        <div>
          <h3 className="mb-4 text-lg text-gray-800">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="transition-colors hover:textgray-600">Contact Us</Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:textgray-600">About Us</Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:textgray-600">FAQs</Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:textgray-600">Features</Link>
            </li>
          </ul>
        </div>
        {/* Follow us */}
        <div>
          <h3 className="mb-4 text-lg text-gray-800">Follow Us</h3>
          <div className="flex items-center mb-6 space-x-4">
              <a 
              href="https://www.instagram.com/omcutlury/" 
              target="blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-300"
              >
                <IoLogoInstagram className="w-5 h-5"/>
              </a>
          </div>
          <h3 className="mb-4 text-lg text-gray-800">Call Us</h3>
          <h3>
            <FiPhoneCall className="inline-block mr-2"/>
            9574860773
          </h3>
          <h3 className="mt-4 text-lg text-gray-800">Find Us</h3>
          <h3>
            <FaLocationDot className="inline-block mr-2" /> A-154, Mangal Bazar, Bajwada, Mandvi, Vadodara, Gujarat 390001
          </h3>
        </div>
      </div>
      {/* footer bottoms */}
      <div className="container px-4 pt-6 mx-auto mt-12 border-t border-gray-200 lg:px-0">
        <p className="text-sm tracking-tighter text-center text-gray-500">
          &copy; 2025. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
