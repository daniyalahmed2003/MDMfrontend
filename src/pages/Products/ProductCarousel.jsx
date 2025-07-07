import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import axios from "axios";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="pt-[90px] mb-8 max-w-6xl mx-auto">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error || "Something went wrong"}
        </Message>
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="p-4">
              {/* Image */}
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[24rem] object-cover"
                />
              </div>

              {/* Content */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                {/* Left Side */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                  <p className="text-pink-600 text-lg font-semibold mb-2">
                    ${product.price}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description?.substring(0, 170)}...
                  </p>
                </div>

                {/* Right Side Info Boxes */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-700">
                      <FaStore className="mr-2 text-pink-500" />
                      Brand: <span className="ml-1">{product.brand}</span>
                    </p>
                    <p className="flex items-center text-gray-700">
                      <FaClock className="mr-2 text-pink-500" />
                      Added: {moment(product.createdAt).fromNow()}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <FaStar className="mr-2 text-pink-500" />
                      Reviews: {product.numReviews}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="flex items-center text-gray-700">
                      <FaStar className="mr-2 text-pink-500" />
                      Ratings: {Math.round(product.rating)}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <FaShoppingCart className="mr-2 text-pink-500" />
                      Quantity: {product.quantity}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <FaBox className="mr-2 text-pink-500" />
                      In Stock: {product.countInStock}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;



// import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
// import Message from "../../components/Message";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import moment from "moment";
// import {
//   FaBox,
//   FaClock,
//   FaShoppingCart,
//   FaStar,
//   FaStore,
// } from "react-icons/fa";

// const ProductCarousel = () => {
//   const { data: products, isLoading, error } = useGetTopProductsQuery();

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <div className="mb-4 lg:block xl:block md:block">
//       {isLoading ? null : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error || "Something went wrong"}
//         </Message>
//       ) : (
//         <Slider
//           {...settings}
//           className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
//         >
//           {products.map(
//             ({
//               image,
//               _id,
//               name,
//               price,
//               description,
//               brand,
//               createdAt,
//               numReviews,
//               rating,
//               quantity,
//               countInStock,
//             }) => (
//               <div key={_id}>
//                 <img
//                   src={image}
//                   alt={name}
//                   className="w-full rounded-lg object-cover h-[30rem]"
//                 />

//                 <div className="mt-4 flex justify-between">
//                   <div className="one">
//                     <h2>{name}</h2>
//                     <p> $ {price}</p> <br /> <br />
//                     <p className="w-[25rem]">
//                       {description.substring(0, 170)} ...
//                     </p>
//                   </div>

//                   <div className="flex justify-between w-[20rem]">
//                     <div className="one">
//                       <h1 className="flex items-center mb-6">
//                         <FaStore className="mr-2 text-white" /> Brand: {brand}
//                       </h1>
//                       <h1 className="flex items-center mb-6">
//                         <FaClock className="mr-2 text-white" /> Added:{" "}
//                         {moment(createdAt).fromNow()}
//                       </h1>
//                       <h1 className="flex items-center mb-6">
//                         <FaStar className="mr-2 text-white" /> Reviews:
//                         {numReviews}
//                       </h1>
//                     </div>

//                     <div className="two">
//                       <h1 className="flex items-center mb-6">
//                         <FaStar className="mr-2 text-white" /> Ratings:{" "}
//                         {Math.round(rating)}
//                       </h1>
//                       <h1 className="flex items-center mb-6">
//                         <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
//                         {quantity}
//                       </h1>
//                       <h1 className="flex items-center mb-6">
//                         <FaBox className="mr-2 text-white" /> In Stock:{" "}
//                         {countInStock}
//                       </h1>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           )}
//         </Slider>
//       )}
//     </div>
//   );
// };

// export default ProductCarousel;
