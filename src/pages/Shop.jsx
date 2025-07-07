import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import axios from "axios";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";

import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="pt-[6rem] container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="bg-white shadow rounded-lg p-4 w-full lg:w-[18rem]">
          {/* Categories */}
          <h2 className="text-lg font-semibold mb-3 border-b pb-2">
            Filter by Categories
          </h2>
          <div className="space-y-2">
            {categories?.map((c) => (
              <div key={c._id} className="flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-gray-700">{c.name}</label>
              </div>
            ))}
          </div>

          {/* Brands */}
          <h2 className="text-lg font-semibold mt-6 mb-3 border-b pb-2">
            Filter by Brands
          </h2>
          <div className="space-y-2">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-pink-600 border-gray-300"
                />
                <label className="ml-2 text-gray-700">{brand}</label>
              </div>
            ))}
          </div>

          {/* Price Filter */}
          <h2 className="text-lg font-semibold mt-6 mb-3 border-b pb-2">
            Filter by Price
          </h2>
          <input
            type="text"
            placeholder="Enter Price"
            value={priceFilter}
            onChange={handlePriceChange}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />

          {/* Reset */}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full py-2 text-center bg-gray-100 rounded hover:bg-gray-200"
          >
            Reset Filters
          </button>
        </aside>

        {/* Products */}
        <main className="flex-1">
          <h2 className="text-2xl font-bold mb-4">
            {products?.length} Products
          </h2>
          <div className="flex flex-wrap gap-6">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products.map((p) => (
                <div key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
