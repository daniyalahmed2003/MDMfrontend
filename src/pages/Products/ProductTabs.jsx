import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import axios from "axios";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) return <Loader />;

  const tabs = ["Write Your Review", "All Reviews", "Related Products"];

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-lg transition-all duration-200 ${
              activeTab === index + 1
                ? "text-pink-600 border-b-2 border-pink-600 font-semibold"
                : "text-gray-500 hover:text-pink-500"
            }`}
            onClick={() => setActiveTab(index + 1)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Review Form */}
      {activeTab === 1 && (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700 text-sm mb-1">
                  Rating
                </label>
                <select
                  id="rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select</option>
                  <option value="1">Inferior</option>
                  <option value="2">Decent</option>
                  <option value="3">Great</option>
                  <option value="4">Excellent</option>
                  <option value="5">Exceptional</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 text-sm mb-1">
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loadingProductReview}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <p className="text-gray-600">
              Please{" "}
              <Link to="/login" className="text-pink-600 underline">
                sign in
              </Link>{" "}
              to write a review.
            </p>
          )}
        </div>
      )}

      {/* All Reviews */}
      {activeTab === 2 && (
        <div className="space-y-4 max-w-3xl">
          {product.reviews.length === 0 ? (
            <p className="text-gray-600">No Reviews</p>
          ) : (
            product.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>{review.name}</span>
                  <span>{review.createdAt.substring(0, 10)}</span>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <Ratings value={review.rating} />
              </div>
            ))
          )}
        </div>
      )}

      {/* Related Products */}
      {activeTab === 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.length === 0 ? (
            <p className="text-gray-500">No related products found.</p>
          ) : (
            data.map((product) => (
              <SmallProduct key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTabs;




// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Ratings from "./Ratings";
// import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
// import SmallProduct from "./SmallProduct";
// import Loader from "../../components/Loader";

// const ProductTabs = ({
//   loadingProductReview,
//   userInfo,
//   submitHandler,
//   rating,
//   setRating,
//   comment,
//   setComment,
//   product,
// }) => {
//   const { data, isLoading } = useGetTopProductsQuery();

//   const [activeTab, setActiveTab] = useState(1);

//   if (isLoading) {
//     return <Loader />;
//   }

//   const handleTabClick = (tabNumber) => {
//     setActiveTab(tabNumber);
//   };

//   return (
//     <div className="flex flex-col md:flex-row">
//       <section className="mr-[5rem]">
//         <div
//           className={`flex-1 p-4 cursor-pointer text-lg ${
//             activeTab === 1 ? "font-bold" : ""
//           }`}
//           onClick={() => handleTabClick(1)}
//         >
//           Write Your Review
//         </div>
//         <div
//           className={`flex-1 p-4 cursor-pointer text-lg ${
//             activeTab === 2 ? "font-bold" : ""
//           }`}
//           onClick={() => handleTabClick(2)}
//         >
//           All Reviews
//         </div>
//         <div
//           className={`flex-1 p-4 cursor-pointer text-lg ${
//             activeTab === 3 ? "font-bold" : ""
//           }`}
//           onClick={() => handleTabClick(3)}
//         >
//           Related Products
//         </div>
//       </section>

//       {/* Second Part */}
//       <section>
//         {activeTab === 1 && (
//           <div className="mt-4">
//             {userInfo ? (
//               <form onSubmit={submitHandler}>
//                 <div className="my-2">
//                   <label htmlFor="rating" className="block text-xl mb-2">
//                     Rating
//                   </label>

//                   <select
//                     id="rating"
//                     required
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                     className="p-2 border rounded-lg xl:w-[40rem] text-black"
//                   >
//                     <option value="">Select</option>
//                     <option value="1">Inferior</option>
//                     <option value="2">Decent</option>
//                     <option value="3">Great</option>
//                     <option value="4">Excellent</option>
//                     <option value="5">Exceptional</option>
//                   </select>
//                 </div>

//                 <div className="my-2">
//                   <label htmlFor="comment" className="block text-xl mb-2">
//                     Comment
//                   </label>

//                   <textarea
//                     id="comment"
//                     rows="3"
//                     required
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     className="p-2 border rounded-lg xl:w-[40rem] text-black"
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loadingProductReview}
//                   className="bg-pink-600 text-white py-2 px-4 rounded-lg"
//                 >
//                   Submit
//                 </button>
//               </form>
//             ) : (
//               <p>
//                 Please <Link to="/login">sign in</Link> to write a review
//               </p>
//             )}
//           </div>
//         )}
//       </section>

//       <section>
//         {activeTab === 2 && (
//           <>
//             <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>

//             <div>
//               {product.reviews.map((review) => (
//                 <div
//                   key={review._id}
//                   className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
//                 >
//                   <div className="flex justify-between">
//                     <strong className="text-[#B0B0B0]">{review.name}</strong>
//                     <p className="text-[#B0B0B0]">
//                       {review.createdAt.substring(0, 10)}
//                     </p>
//                   </div>

//                   <p className="my-4">{review.comment}</p>
//                   <Ratings value={review.rating} />
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </section>

//       <section>
//         {activeTab === 3 && (
//           <section className="ml-[4rem] flex flex-wrap">
//             {!data ? (
//               <Loader />
//             ) : (
//               data.map((product) => (
//                 <div key={product._id}>
//                   <SmallProduct product={product} />
//                 </div>
//               ))
//             )}
//           </section>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ProductTabs;
