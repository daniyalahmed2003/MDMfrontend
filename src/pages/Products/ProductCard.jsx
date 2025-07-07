import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="pt-[50px] bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition duration-300 max-w-xs mx-auto">
      {/* Product Image */}
      <div className="relative">
        <Link to={`/product/${p._id}`}>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-[180px] object-cover"
          />
        </Link>
        <HeartIcon product={p} />
        <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {p?.brand}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-base font-semibold text-gray-800 truncate">
            {p?.name}
          </h5>
          <p className="text-pink-600 font-bold text-sm">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {p?.description || "No description available."}
        </p>

        <div className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-pink-600 rounded-full hover:bg-pink-700 transition"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          <button
            className="text-pink-600 hover:text-pink-800 p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
            title="Add to Cart"
          >
            <AiOutlineShoppingCart size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;



// import { Link } from "react-router-dom";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/features/cart/cartSlice";
// import { toast } from "react-toastify";
// import HeartIcon from "./HeartIcon";

// const ProductCard = ({ p }) => {
//   const dispatch = useDispatch();

//   const addToCartHandler = (product, qty) => {
//     dispatch(addToCart({ ...product, qty }));
//     toast.success("Item added successfully", {
//       position: toast.POSITION.TOP_RIGHT,
//       autoClose: 2000,
//     });
//   };

//   return (
//     <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shaodw dark:bg-gray-800 dark:border-gray-700">
//       <section className="relative">
//         <Link to={`/product/${p._id}`}>
//           <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
//             {p?.brand}
//           </span>
//           <img
//             className="cursor-pointer w-full"
//             src={p.image}
//             alt={p.name}
//             style={{ height: "170px", objectFit: "cover" }}
//           />
//         </Link>
//         <HeartIcon product={p} />
//       </section>

//       <div className="p-5">
//         <div className="flex justify-between">
//           <h5 className="mb-2 text-xl text-whiet dark:text-white">{p?.name}</h5>

//           <p className="text-black font-semibold text-pink-500">
//             {p?.price?.toLocaleString("en-US", {
//               style: "currency",
//               currency: "USD",
//             })}
//           </p>
//         </div>

//         <p className="mb-3 font-normal text-[#CFCFCF]">
//           {p?.description?.substring(0, 60)} ...
//         </p>

//         <section className="flex justify-between items-center">
//           <Link
//             to={`/product/${p._id}`}
//             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
//           >
//             Read More
//             <svg
//               className="w-3.5 h-3.5 ml-2"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M1 5h12m0 0L9 1m4 4L9 9"
//               />
//             </svg>
//           </Link>

//           <button
//             className="p-2 rounded-full"
//             onClick={() => addToCartHandler(p, 1)}
//           >
//             <AiOutlineShoppingCart size={25} />
//           </button>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
