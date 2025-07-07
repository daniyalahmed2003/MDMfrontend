import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <>
      <ProgressSteps step1 step2 />

      <div className="pt-[10px] px-6 md:px-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Shipping Information</h1>

        <form onSubmit={submitHandler} className="bg-white p-8 shadow-lg rounded-lg space-y-6">
          {/* Address */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">City</label>
            <input
              type="text"
              placeholder="Enter city"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Postal Code</label>
            <input
              type="text"
              placeholder="Enter postal code"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Country</label>
            <input
              type="text"
              placeholder="Enter country"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio h-5 w-5 text-pink-500"
              />
              <label htmlFor="paypal" className="text-gray-800 text-base">PayPal or Credit Card</label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold text-lg hover:bg-pink-600 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default Shipping;




// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   saveShippingAddress,
//   savePaymentMethod,
// } from "../../redux/features/cart/cartSlice";
// import ProgressSteps from "../../components/ProgressSteps";

// const Shipping = () => {
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   const [paymentMethod, setPaymentMethod] = useState("PayPal");
//   const [address, setAddress] = useState(shippingAddress.address || "");
//   const [city, setCity] = useState(shippingAddress.city || "");
//   const [postalCode, setPostalCode] = useState(
//     shippingAddress.postalCode || ""
//   );
//   const [country, setCountry] = useState(shippingAddress.country || "");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//     e.preventDefault();

//     dispatch(saveShippingAddress({ address, city, postalCode, country }));
//     dispatch(savePaymentMethod(paymentMethod));
//     navigate("/placeorder");
//   };

//   // Payment
//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate("/shipping");
//     }
//   }, [navigate, shippingAddress]);

//   return (
//     <div className="container mx-auto mt-10">
//       <ProgressSteps step1 step2 />
//       <div className="mt-[10rem] flex justify-around items-center flex-wrap">
//         <form onSubmit={submitHandler} className="w-[40rem]">
//           <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
//           <div className="mb-4">
//             <label className="block text-white mb-2">Address</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter address"
//               value={address}
//               required
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white mb-2">City</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter city"
//               value={city}
//               required
//               onChange={(e) => setCity(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white mb-2">Postal Code</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter postal code"
//               value={postalCode}
//               required
//               onChange={(e) => setPostalCode(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white mb-2">Country</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter country"
//               value={country}
//               required
//               onChange={(e) => setCountry(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-400">Select Method</label>
//             <div className="mt-2">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio text-pink-500"
//                   name="paymentMethod"
//                   value="PayPal"
//                   checked={paymentMethod === "PayPal"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 />

//                 <span className="ml-2">PayPal or Credit Card</span>
//               </label>
//             </div>
//           </div>

//           <button
//             className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full"
//             type="submit"
//           >
//             Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Shipping;
