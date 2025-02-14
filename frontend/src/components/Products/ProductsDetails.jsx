import React, { useEffect, useState } from "react";
import {toast} from 'sonner'
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Medium Size Basket",
  price: 99,
  originalPrice: 200,
  description:
    "A medium-sized plastic basket perfect for organizing household items, toys, or laundry. Durable and easy to clean.",
  brand: "Kiwi",
  material: "Plastic",
  sizes: ["Medium", "Large", "Extra large"],
  colors: ["Red", "Green"],
  images: [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/om-cutlary.appspot.com/o/Product%20Images%2Fimage%3A250613Jul%2021%2C%20202217%3A18%3A48%20PM.jpg?alt=media&token=81e779fe-6441-499c-b625-02c4a1e50afa",
      altText: "Medium Size Basket",
    },
    {
      url: "https://picsum.photos/200?random=5",
      altText: "Medium Size Basket",
    },
  ],
};

const similarProducts = [
    {
        _id:1,
        name:"Product 1",
        price: 100,
        images:[{url:"https://picsum.photos/200?random=1", altText: "Product 1"}]
    },
    {
        _id:2,
        name:"Product 2",
        price: 100,
        images:[{url:"https://picsum.photos/200?random=2", altText: "Product 2"}]
    },
    {
        _id:3,
        name:"Product 3",
        price: 100,
        images:[{url:"https://picsum.photos/200?random=3", altText: "Product 3"}]
    },
    {
        _id:4,
        name:"Product 4",
        price: 100,
        images:[{url:"https://picsum.photos/200?random=4", altText: "Product 4"}]
    }
]

function ProductsDetails() {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantiy] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddToCart=()=>{
    if(!selectedSize || !selectedColor){
        toast.error("please select a size and color",{
            duration: 1000,
        })
        return
    }

    setIsButtonDisabled(true)

    setTimeout(()=>{
        toast.success("Product Added to Cart",{
            duration: 1000,
        })
        setIsButtonDisabled(false)
    },500)
}   

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  return (
    <div className="p-6">
      <div className="max-2-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main Content"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Right Side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              &#8377;{selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-2">{selectedProduct.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      color === selectedColor
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      size === selectedSize ? "bg-black text-white" : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => {
                    if (quantity === 1) return;
                    setQuantiy((prev) => prev - 1);
                  }}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => setQuantiy((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button 
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'}`}
              onClick={()=>handleAddToCart()}
              disabled={isButtonDisabled}
            //   style={`${isButtonDisabled ? '':''}`}
            >
                {isButtonDisabled ? "addidng": "Add To Cart"}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="text-xl fontbold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
                You May Also Like
            </h2>
            <ProductGrid products={similarProducts}/>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;
