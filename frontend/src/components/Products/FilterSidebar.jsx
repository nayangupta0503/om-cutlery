import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = ({toggleSidebar}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate()

  const [filters, setFilters] = useState({
    category: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Kitchen", "Bathroom"];

  const colors = [
    "Red",
    "Green",
    "Blue",
    "Black",
    "Yellow",
    "Gray",
    "White",
    "Pink",
  ];

  const sizes = ["Small", "Medium", "Large"];

  const materials = ["Plastic", "Steel", "Aluminium", "Fiber", "Iron"];

  const brands = ["Prakash", "Aristo", "Omax", "Royal", "Cello", "Supremewere"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 1000,
    });
    setPriceRange([0, params.maxPrice || 1000]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    //console.log({ name, value, checked, type });

    const newFilters = {...filters}

    if(type === "checkbox"){
        if (checked){
            newFilters[name] = [...(newFilters[name] || []), value]
        } else {
            newFilters[name] = newFilters[name].filter((item) => item !== value)
        }
    }else{
        newFilters[name] = value;
    }
    setFilters(newFilters)
    updateURLParams(newFilters)
   // console.log(newFilters)
  };

  const updateURLParams = (newFilters) =>{
    const params = new URLSearchParams()
    Object.keys(newFilters).forEach((key)=>{
      if(Array.isArray(newFilters[key]) && newFilters[key].length > 0){
        params.append(key, newFilters[key].join(","))
      }else if(newFilters[key]){
        params.append(key, newFilters[key])
      }
    })
    setSearchParams(params)
    navigate(`?${params.toString()}`)
  }

  const handlePriceChange = (e) =>{
    const newPrice = e.target.value;
    setPriceRange([0, newPrice])
    const newFilters = {...filters, minPrice: 0, maxPrice: newPrice}
    setFilters(filters)
    updateURLParams(newFilters)
  }

  return (
    <div className="p-4">
      <h3 className="mb-4 text-xl font-medium text-gray-800">Filter</h3>

      {/* Sidebar close icon */}
      <button
        className="absolute text-2xl text-gray-500 top-4 right-4 hover:text-gray-800 focus:outline-none"
        aria-label="Close sidebar"
        onClick={toggleSidebar}
        type="button"
      >
        &times;
      </button>

      {/* Reset Filters Button */}
      <button
        className="px-4 py-2 mb-6 font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => {
          setFilters({
            category: "",
            color: "",
            size: [],
            material: [],
            brand: [],
            minPrice: 0,
            maxPrice: 1000,
          });
          setPriceRange([0, 1000]);
          setSearchParams({});
          navigate("?");
        }}
      >
        Reset Filters
      </button>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* color Filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              checked={filters.color===color}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color===color ? "ring-2 ring-blue-500" : ""}`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block mb-2 font-medium text-gray-600">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={1000}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-gray-600">
          <span>&#8377;0</span>
          <span>&#8377;{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
