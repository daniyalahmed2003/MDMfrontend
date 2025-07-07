import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && <Header />}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error || "Something went wrong"}
        </Message>
      ) : (
        <>
          <div className="container mx-auto px-4 pt-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Special Products
              </h1>
              <Link
                to="/shop"
                className="mt-4 md:mt-0 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
              >
                Shop Now
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {data.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;



// import { Link, useParams } from "react-router-dom";
// import { useGetProductsQuery } from "../redux/api/productApiSlice";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import Header from "../components/Header";
// import Product from "./Products/Product";

// const Home = () => {
//   const { keyword } = useParams();
//   const { data, isLoading, isError } = useGetProductsQuery({ keyword });

//   return (
//     <>
//       {!keyword ? <Header /> : null}
//       {isLoading ? (
//         <Loader />
//       ) : isError ? (
//         <Message variant="danger">
//           {isError?.data.message || isError.error || "Something went wrong"}
//         </Message>
//       ) : (
//         <>
//           <div className="flex justify-between items-center">
//             <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
//               Special Products
//             </h1>

//             <Link
//               to="/shop"
//               className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
//             >
//               Shop
//             </Link>
//           </div>

//           <div>
//             <div className="flex justify-center flex-wrap mt-[2rem]">
//               {data.products.map((product) => (
//                 <div key={product._id}>
//                   <Product product={product} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Home;
