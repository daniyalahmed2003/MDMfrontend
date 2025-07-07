import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import axios from "axios";

const SmallProduct = ({ product }) => {
  return (
    <div className="pt-[65px] w-full max-w-xs bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 mx-auto p-3">
      {/* Image Section */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
        />
        <HeartIcon product={product} />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description || "No description available."}
        </p>

        {/* Price Badge */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-pink-600 font-bold text-md">
            ${product.price}
          </span>

          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {product.brand || "Generic"}
          </span>
        </div>

        {/* View Details Button */}
        <Link
          to={`/product/${product._id}`}
          className="block w-full text-center mt-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-sm font-medium transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;

// import { Link } from "react-router-dom";
// import HeartIcon from "./HeartIcon";

// const SmallProduct = ({ product }) => {
//   return (
//     <div className="w-[20rem] ml-[2rem] p-3">
//       <div className="relative">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-auto rounded"
//         />
//         <HeartIcon product={product} />
//       </div>

//       <div className="p-4">
//         <Link to={`/product/${product._id}`}>
//           <h2 className="flex justify-between items-center">
//             <div>{product.name}</div>
//             <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
//               ${product.price}
//             </span>
//           </h2>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SmallProduct;
