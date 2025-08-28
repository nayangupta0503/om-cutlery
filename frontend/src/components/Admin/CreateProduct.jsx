import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { creatProduct } from '../../redux/slices/adminProductSlice';
import axios from 'axios';
import { MdDelete } from 'react-icons/md'; // Ensure you have react-icons installed

const CreateProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: "",
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);  // image uplaoding state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file)

    try {
      setUploading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, 
        formData, 
        {
        headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData)=>({
        ...prevData,
        images: [...prevData.images, {url: data.imageUrl, altText: ""}]
      }));
      setUploading(false);
    } catch (error) {
        console.error("Error uploading image:", error);
        setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(creatProduct(productData))
    navigate("/admin/products")
  }

  return (
    <div className="max-w-5xl p-6 mx-auto rounded-md shadow-md">
      <h2 className="mb-6 text-3xl font-bold">Add a new Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Count in stock */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
           // required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            // required
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* brand */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Collections */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Collections</label>
          <input
            type="text"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Material */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Material</label>
          <input
            type="text"
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p>Uploading...</p>}
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="object-cover w-20 h-20 rounded-md shadow-md"
                />
                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8 mt-2 text-red-600 bg-white rounded-full shadow hover:bg-red-100"
                  title="Delete image"
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this image?")) {
                        try {
                        // Extract public_id from image.url (remove version)
                        // Cloudinary URLs: .../upload/v<version>/<public_id>.<ext>
                        const urlParts = image.url.split("/");
                        const uploadIndex = urlParts.findIndex(part => part === "upload");
                        // Skip the version part (e.g., "v1712345678")
                        let publicIdParts = urlParts.slice(uploadIndex + 2); // +2 skips 'upload' and version
                        let publicIdWithExt = publicIdParts.join("/");
                        const dotIndex = publicIdWithExt.lastIndexOf(".");
                        const public_id = dotIndex !== -1 ? publicIdWithExt.substring(0, dotIndex) : publicIdWithExt;

                        // Get token from localStorage (or your auth state)
                        const token = localStorage.getItem("userToken");
                        await axios.delete(
                          `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/delete-img`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json"
                            },
                            data: { public_id }
                          }
                        );
                        setProductData((prevData) => ({
                          ...prevData,
                          images: prevData.images.filter((_, i) => i !== index),
                        }));
                      } catch (err) {
                        alert("Failed to delete image from server.");
                      }
                    }
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
        >
          Create a Product
        </button>
      </form>
    </div>
 );
}

export default CreateProduct