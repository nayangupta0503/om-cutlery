import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before proceeding
//   useEffect(() => {
//     if (!cart || !cart.product || cart.products.length === 0) {
//       navigate("/");
//     }
//   }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    try {
      if (cart && cart.products.length > 0) {
        // Calculate total price including shipping if needed
        const shippingCharge = cart.totalPrice < 299 ? 50 : 0;
        const finalTotalPrice = cart.totalPrice + shippingCharge;

        const res = await dispatch(
          createCheckout({
            checkoutItems: cart.products,
            shippingAddress,
            paymentMethod: "COD",
            totalPrice: finalTotalPrice,
          })
        );
        if (res.payload && res.payload._id) {
          setCheckoutId(res.payload._id); // Set checkout Id if checkout was successful
        } else {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {isCOD: true},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/order-confirmation");
      } else {
        console.error("Error: ",response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading Cart ....</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your Cart is Empty</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 px-6 py-10 mx-auto tracking-tighter lg:grid-cols-2 max-w-7xl">
      {/* Left Section */}
      <div className="p-6 bg-white rounded-lg">
        <h2 className="mb-6 text-2xl uppercase">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="mb-4 text-lg">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="mb-4 text-lg">Delivery</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={user ? user.phone : ""}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full py-3 text-white bg-black rounded text-wrap"
              >
                Order Now
              </button>
            ) : (
              <div>
                <button onClick={()=>handleFinalizeCheckout(checkoutId)} className="w-full py-3 text-white bg-black rounded text-wrap">Place Order</button>
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="p-6 rounded-lg bg-gray-50">
        <h3 className="mb-4 text-lg">Order Summary</h3>
        <div className="py-4 mb-4 border-t">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-20 h-24 mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <div>
                <p className="text-xl">
                  &#8377;{product.price?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mb-4 text-lg">
          <p>Subtotal</p>
          <p>&#8377;{cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between text-lg">
          <p>Shipping</p>
          <p>{cart.totalPrice > 299 ? "Free" : `₹${50}` }</p>
        </div>
        <div className="flex items-center justify-between pt-4 mt-4 text-lg border-t">
          <p>Total</p>
          <p>
            &#8377;
            {(cart.totalPrice < 299 ? cart.totalPrice + 50 : cart.totalPrice).toLocaleString()}
          </p>
        </div>
        <p>Payment Method: Cash on Delivery <br/> (Online Payment methods will be available very soon)</p>
      </div>
    </div>
  );
};

export default Checkout;
