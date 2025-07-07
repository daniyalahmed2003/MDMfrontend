import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import axios from "axios";
const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="error">Error loading products</Message>;

  return (
    <div className="pt-[90px] bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                All Products ({products.length})
              </h1>
              <p className="text-gray-600">Manage your product inventory</p>
            </div>

            <div className="space-y-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link to={`/admin/product/update/${product._id}`} className="block">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-3/4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {product.name}
                          </h3>
                          <span className="text-gray-500 text-sm">
                            {moment(product.createdAt).format("MMM D, YYYY")}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-indigo-600">
                            ${product.price.toFixed(2)}
                          </span>
                          <Link
                            to={`/admin/product/update/${product._id}`}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                          >
                            Update
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
          {/* <div className="lg:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
              <AdminMenu />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;


// import { Link } from "react-router-dom";
// import moment from "moment";
// import { useAllProductsQuery } from "../../redux/api/productApiSlice";
// import AdminMenu from "./AdminMenu";

// const AllProducts = () => {
//   const { data: products, isLoading, isError } = useAllProductsQuery();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading products</div>;
//   }

//   return (
//     <>
//       <div className="container mx-[9rem]">
//         <div className="flex flex-col  md:flex-row">
//           <div className="p-3">
//             <div className="ml-[2rem] text-xl font-bold h-12">
//               All Products ({products.length})
//             </div>
//             <div className="flex flex-wrap justify-around items-center">
//               {products.map((product) => (
//                 <Link
//                   key={product._id}
//                   to={`/admin/product/update/${product._id}`}
//                   className="block mb-4 overflow-hidden"
//                 >
//                   <div className="flex">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-[10rem] object-cover"
//                     />
//                     <div className="p-4 flex flex-col justify-around">
//                       <div className="flex justify-between">
//                         <h5 className="text-xl font-semibold mb-2">
//                           {product?.name}
//                         </h5>

//                         <p className="text-gray-400 text-xs">
//                           {moment(product.createdAt).format("MMMM Do YYYY")}
//                         </p>
//                       </div>

//                       <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
//                         {product?.description?.substring(0, 160)}...
//                       </p>

//                       <div className="flex justify-between">
//                         <Link
//                           to={`/admin/product/update/${product._id}`}
//                           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
//                         >
//                           Update Product
//                           <svg
//                             className="w-3.5 h-3.5 ml-2"
//                             aria-hidden="true"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 14 10"
//                           >
//                             <path
//                               stroke="currentColor"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M1 5h12m0 0L9 1m4 4L9 9"
//                             />
//                           </svg>
//                         </Link>
//                         <p>$ {product?.price}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="md:w-1/4 p-3 mt-2">
//             <AdminMenu />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllProducts;
