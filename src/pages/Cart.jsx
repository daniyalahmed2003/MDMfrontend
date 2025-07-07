import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          <p>Your cart is empty</p>
          <Link
            to="/shop"
            className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* 🛍 Cart Items */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-6 border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-medium text-pink-600 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="font-bold text-gray-700">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    className="p-2 border rounded text-sm text-gray-800"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCartHandler(item._id)}
                    title="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💳 Summary */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Items: {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </h2>
            <p className="text-2xl font-bold mb-6 text-gray-800">
              Total: $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>

            <button
              className="bg-pink-600 hover:bg-pink-700 text-white w-full py-2 rounded-full text-lg transition"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;




// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { FaTrash } from "react-icons/fa";
// import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

// const Cart = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const addToCartHandler = (product, qty) => {
//     dispatch(addToCart({ ...product, qty }));
//   };

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const checkoutHandler = () => {
//     navigate("/login?redirect=/shipping");
//   };

//   return (
//     <>
//       <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
//         {cartItems.length === 0 ? (
//           <div>
//             Your cart is empty <Link to="/shop">Go To Shop</Link>
//           </div>
//         ) : (
//           <>
//             <div className="flex flex-col w-[80%]">
//               {/* 🛒 Shopping Cart Header with Count Badge */}
//               <div className="flex items-center mb-4">
//                 <h1 className="text-2xl font-semibold">Shopping Cart</h1>
//                 {cartItems.length > 0 && (
//                   <span className="ml-2 px-2 text-xs font-bold text-white bg-pink-500 rounded-full">
//                     {cartItems.reduce((acc, item) => acc + item.qty, 0)}
//                   </span>
//                 )}
//               </div>

//               {/* 🛍️ Cart Items */}
//               {cartItems.map((item) => (
//                 <div key={item._id} className="flex items-center mb-[1rem] pb-2">
//                   <div className="w-[5rem] h-[5rem]">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-full object-cover rounded"
//                     />
//                   </div>

//                   <div className="flex-1 ml-4">
//                     <Link to={`/product/${item._id}`} className="text-pink-500">
//                       {item.name}
//                     </Link>

//                     <div className="mt-2 text-white">{item.brand}</div>
//                     <div className="mt-2 text-white font-bold">
//                       $ {item.price}
//                     </div>
//                   </div>

//                   <div className="w-24">
//                     <select
//                       className="w-full p-1 border rounded text-black"
//                       value={item.qty}
//                       onChange={(e) =>
//                         addToCartHandler(item, Number(e.target.value))
//                       }
//                     >
//                       {[...Array(item.countInStock).keys()].map((x) => (
//                         <option key={x + 1} value={x + 1}>
//                           {x + 1}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <button
//                       className="text-red-500 mr-[5rem]"
//                       onClick={() => removeFromCartHandler(item._id)}
//                     >
//                       <FaTrash className="ml-[1rem] mt-[.5rem]" />
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* 💰 Summary and Checkout */}
//               <div className="mt-8 w-[40rem]">
//                 <div className="p-4 rounded-lg">
//                   <h2 className="text-xl font-semibold mb-2">
//                     Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
//                   </h2>

//                   <div className="text-2xl font-bold">
//                     $
//                     {cartItems
//                       .reduce((acc, item) => acc + item.qty * item.price, 0)
//                       .toFixed(2)}
//                   </div>

//                   <button
//                     className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
//                     disabled={cartItems.length === 0}
//                     onClick={checkoutHandler}
//                   >
//                     Proceed To Checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;




// // import { Link, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { FaTrash } from "react-icons/fa";
// // import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

// // const Cart = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const cart = useSelector((state) => state.cart);
// //   const { cartItems } = cart;

// //   const addToCartHandler = (product, qty) => {
// //     dispatch(addToCart({ ...product, qty }));
// //   };

// //   const removeFromCartHandler = (id) => {
// //     dispatch(removeFromCart(id));
// //   };

// //   const checkoutHandler = () => {
// //     navigate("/login?redirect=/shipping");
// //   };

// //   return (
// //     <>
// //       <div className="container flex justify-around items-start flex wrap mx-auto mt-8">
// //         {cartItems.length === 0 ? (
// //           <div>
// //             Your cart is empty <Link to="/shop">Go To Shop</Link>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="flex flex-col w-[80%]">
// //               <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

// //               {cartItems.map((item) => (
// //                 <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
// //                   <div className="w-[5rem] h-[5rem]">
// //                     <img
// //                       src={item.image}
// //                       alt={item.name}
// //                       className="w-full h-full object-cover rounded"
// //                     />
// //                   </div>

// //                   <div className="flex-1 ml-4">
// //                     <Link to={`/product/${item._id}`} className="text-pink-500">
// //                       {item.name}
// //                     </Link>

// //                     <div className="mt-2 text-white">{item.brand}</div>
// //                     <div className="mt-2 text-white font-bold">
// //                       $ {item.price}
// //                     </div>
// //                   </div>

// //                   <div className="w-24">
// //                     <select
// //                       className="w-full p-1 border rounded text-black"
// //                       value={item.qty}
// //                       onChange={(e) =>
// //                         addToCartHandler(item, Number(e.target.value))
// //                       }
// //                     >
// //                       {[...Array(item.countInStock).keys()].map((x) => (
// //                         <option key={x + 1} value={x + 1}>
// //                           {x + 1}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div>
// //                     <button
// //                       className="text-red-500 mr-[5rem]"
// //                       onClick={() => removeFromCartHandler(item._id)}
// //                     >
// //                       <FaTrash className="ml-[1rem] mt-[.5rem]" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}

// //               <div className="mt-8 w-[40rem]">
// //                 <div className="p-4 rounded-lg">
// //                   <h2 className="text-xl font-semibold mb-2">
// //                     Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
// //                   </h2>

// //                   <div className="text-2xl font-bold">
// //                     ${" "}
// //                     {cartItems
// //                       .reduce((acc, item) => acc + item.qty * item.price, 0)
// //                       .toFixed(2)}
// //                   </div>

// //                   <button
// //                     className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
// //                     disabled={cartItems.length === 0}
// //                     onClick={checkoutHandler}
// //                   >
// //                     Proceed To Checkout
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default Cart;
