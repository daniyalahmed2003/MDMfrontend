import { useDispatch, useSelector } from "react-redux";
import { selectFavoriteProduct, toggleFavorite } from "../../redux/features/favorites/favoriteSlice";
import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";
import axios from "axios";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteProduct);

  const handleRemove = (product) => {
    dispatch(toggleFavorite(product));
  };

  return (
    <div className="ml-[10rem] px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Favorite Products
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No favorite products added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {product.name}
                  </h2>
                  <p className="text-pink-600 font-bold text-lg">${product.price}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description || "No description available."}
                  </p>
                </div>
              </Link>

              {/* Remove from Favorites Button */}
              <button
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-pink-100 transition"
                title="Remove from Favorites"
                onClick={() => handleRemove(product)}
              >
                <FaHeartBroken className="text-pink-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;


// import { useSelector } from "react-redux";
// import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
// import Product from "./Product";

// const Favorites = () => {
//   const favorites = useSelector(selectFavoriteProduct);

//   return (
//     <div className="ml-[10rem]">
//       <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
//         FAVORITE PRODUCTS
//       </h1>

//       <div className="flex flex-wrap">
//         {favorites.map((product) => (
//           <Product key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Favorites;

