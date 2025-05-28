import React, { useEffect, useState } from "react";
import {toast} from 'sonner'
import ProductGrid from "./ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { useLocation, useParams } from "react-router-dom";



const ProductsDetails=({productId})=> {
  const location = useLocation()
  const {id} = useParams()
  const dispatch = useDispatch()
  const {selectedProduct, loading, error, similarProducts} = useSelector((state)=> state.products)
  const {user, guestId} = useSelector((state)=> state.auth)
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantiy] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(()=>{
    if(productFetchId){
      dispatch(fetchProductDetails(productFetchId))
      dispatch(fetchSimilarProducts({id: productFetchId}))
    }
  },[dispatch, productFetchId])

  useEffect(()=>{
    window.scrollTo(0,0)
  },[location.pathname])

  const handleAddToCart=()=>{
    if(!selectedSize || !selectedColor){
        toast.error("please select a size and color",{
            duration: 1000,
        })
        return
    }

    setIsButtonDisabled(true)

   dispatch(
    addToCart({
      productId: productFetchId,
      quantity,
      size: selectedSize,
      color: selectedColor,
      guestId,
      userId: user?._id,
    })
   )
   .then(()=>{
    toast.success("Product added to cart"),{
      duration: 1000,
    }
   })
   .finally(()=>{
      setIsButtonDisabled(false)
   })
};

const handleQuantityChange =(action) =>{
  if(action=="plus") setQuantiy((prev)=> prev+1)
  if(action=="minus" && quantity>1) setQuantiy((prev)=> prev-1)
}


  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

if(loading){
  return <p>Loading...</p>
}

if(error){
  return <p>Error: {error}</p>
}

  return (
    <div className="p-6">
    {selectedProduct && (
      <div className="p-8 mx-auto bg-white rounded-lg max-2-6xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="flex-col hidden mr-6 space-y-4 md:flex">
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
                className="object-cover w-full h-auto rounded-lg"
              />
            </div>
          </div>
          {/* Mobile Thumbnail */}
          <div className="flex mb-4 space-x-4 md:hidden overscroll-x-scroll">
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
            <h1 className="mb-2 text-2xl font-semibold md:text-3xl">
              {selectedProduct.name}
            </h1>
            <p className="mb-1 text-lg text-gray-600 line-through">
              {selectedProduct.originalPrice}
            </p>
            <p className="mb-2 text-xl text-gray-500">
              &#8377;{selectedProduct.price}
            </p>
            <p className="mb-2 text-gray-600">{selectedProduct.description}</p>
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
              <div className="flex items-center mt-2 space-x-4">
                <button
                  className="px-2 py-1 text-lg bg-gray-200 rounded"
                  onClick={()=>handleQuantityChange("minus")}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-2 py-1 text-lg bg-gray-200 rounded"
                  onClick={() => handleQuantityChange("plus")}
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
              <h3 className="mb-4 text-xl fontbold">Characteristics:</h3>
              <table className="w-full text-sm text-left text-gray-600">
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
            <h2 className="mb-4 text-2xl font-medium text-center">
                You May Also Like
            </h2>
            <ProductGrid products={similarProducts} loading={loading} error={error}/>
        </div>
      </div>
    )}
    </div>
  );
}

export default ProductsDetails;
