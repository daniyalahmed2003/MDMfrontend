import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import axios from "axios";

const Product = ({ product }) => {
  return (
    <div className="w-[18rem] m-4 bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[220px] object-cover"
        />
        <HeartIcon product={product} />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-base font-semibold text-gray-800 hover:text-pink-500 truncate">
            {product.name}
          </h2>
        </Link>

        {/* Price */}
        <div className="mt-2 text-sm">
          <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-1 rounded-full">
            ${product.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {product.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default Product;


// import { Link } from "react-router-dom";
// import HeartIcon from "./HeartIcon";

// const Product = ({ product }) => {
//   return (
//     <div className="w-[30rem] ml-[2rem] p-3 relative">
//       <div className="relative">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-[30rem] rounded"
//         />
//         <HeartIcon product={product} />
//       </div>

//       <div className="p-4">
//         <Link to={`/product/${product._id}`}>
//           <h2 className="flex justify-between items-center">
//             <div className="text-lg">{product.name}</div>
//             <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
//               $ {product.price}
//             </span>
//           </h2>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Product;
