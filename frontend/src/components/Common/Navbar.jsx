import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const {cart} = useSelector((state) => state.cart)
  const {user} = useSelector((state)=> state.auth)

  const cartItemCount = cart?.products?.reduce((total, product)=> total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container max-auto flex justify-between items-center py-4 px-6">
        {/* left-logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            OM CUTLERY
          </Link>
        </div>

        {/* center - links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all?category=Kitchen"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Kitchen
          </Link>

          <Link
            to="/collections/all?category=Bathroom"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bathroom
          </Link>

          <Link
            to="/collections/all?category=Kids"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Kids
          </Link>

          <Link
            to="/collections/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            All Products
          </Link>
        </div>

        {/* right - icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="w-6 h-6 text-green-700" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="w-6 h-6 text-green-700" />
           
              {cartItemCount>0 && ( <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">{cartItemCount}</span>) }
          </button>
          {/* search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="w-6 h-6 text-green-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform
        transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav>
            <Link
              to="/collections/all?category=Kitchen"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Kitchen
            </Link>
            <Link
              to="/collections/all?category=Bathroom"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bathroom
            </Link>
            <Link
              to="/collections/all?category=Kids"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Kids
            </Link>
            <Link
              to="/collections/all"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              All Products
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
