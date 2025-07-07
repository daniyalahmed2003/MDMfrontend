import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import axios from "axios";
// import axios from "../../utils/axios"; // update path according to file location


const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="text-red-500 text-center py-4">Error loading products</h1>;
  }

  return (
    <div className="bg-white py-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="hidden xl:block w-full lg:w-1/2 mb-4 lg:mb-0">
          <div className="grid grid-cols-2 gap-4">
            {data.map((product) => (
              <div key={product._id} className="bg-gray-50 p-2 rounded-lg shadow-sm">
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;