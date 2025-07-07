import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import axios from "axios";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproducts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message || "Image uploaded successfully");
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error || "Image upload failed");
    }
  };

  return (
    <div className="pt-[90px] bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="lg:w-1/7">
            <AdminMenu />
          </div>
            {/* Sidebar */}
            {/* <div className="lg:w-1/5">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
              <AdminMenu />
            </div>
          </div> */}

            {/* Main Content */}
            <div className="lg:w-4/5">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Create Product
                </h1>
                <p className="text-gray-600">Add a new product to your store</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                {/* Image Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="flex items-center gap-4">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="product preview"
                        className="h-24 w-24 object-cover rounded-md"
                      />
                    )}
                    <label className="flex flex-col items-center px-4 py-6 bg-white rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 transition-colors">
                      <span className="text-sm text-gray-600">
                        {image ? image.name : "Click to upload image"}
                      </span>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={uploadFileHandler}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Product Form */}
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                      />
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Count
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories?.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Create Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
};

      export default ProductList;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateProductMutation,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

// const ProductList = () => {
//   const [image, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [brand, setBrand] = useState("");
//   const [stock, setStock] = useState(0);
//   const [imageUrl, setImageUrl] = useState(null);
//   const navigate = useNavigate();

//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [createProduct] = useCreateProductMutation();
//   const { data: categories } = useFetchCategoriesQuery();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const productData = new FormData();
//       productData.append("image", image);
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("category", category);
//       productData.append("quantity", quantity);
//       productData.append("brand", brand);
//       productData.append("countInStock", stock);

//       const { data } = await createProduct(productData);

//       if (data.error) {
//         toast.error("Product create failed. Try Again.");
//       } else {
//         toast.success(`${data.name} is created`);
//         navigate("/");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Product create failed. Try Again.");
//     }
//   };

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("image", e.target.files[0]);

//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success(res.message || "Something went wrong");
//       setImage(res.image);
//       setImageUrl(res.image);
//     } catch (error) {
//       toast.error(error?.data?.message || error.error || "Something went wrong");
//     }
//   };

//   return (
//     <div className="container xl:mx-[9rem] sm:mx-[0]">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="md:w-3/4 p-3">
//           <div className="h-12">Create Product</div>

//           {imageUrl && (
//             <div className="text-center">
//               <img
//                 src={imageUrl}
//                 alt="product"
//                 className="block mx-auto max-h-[200px]"
//               />
//             </div>
//           )}

//           <div className="mb-3">
//             <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//               {image ? image.name : "Upload Image"}

//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={uploadFileHandler}
//                 className={!image ? "hidden" : "text-white"}
//               />
//             </label>
//           </div>

//           <div className="p-3">
//             <div className="flex flex-wrap">
//               <div className="one">
//                 <label htmlFor="name">Name</label> <br />
//                 <input
//                   type="text"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="two ml-10 ">
//                 <label htmlFor="name block">Price</label> <br />
//                 <input
//                   type="number"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-wrap">
//               <div className="one">
//                 <label htmlFor="name block">Quantity</label> <br />
//                 <input
//                   type="number"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>
//               <div className="two ml-10 ">
//                 <label htmlFor="name block">Brand</label> <br />
//                 <input
//                   type="text"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                 />
//               </div>
//             </div>

//             <label htmlFor="" className="my-5">
//               Description
//             </label>
//             <textarea
//               type="text"
//               className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>

//             <div className="flex justify-between">
//               <div>
//                 <label htmlFor="name block">Count In Stock</label> <br />
//                 <input
//                   type="text"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
//                   value={stock}
//                   onChange={(e) => setStock(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="">Category</label> <br />
//                 <select
//                   placeholder="Choose Category"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   {categories?.map((c) => (
//                     <option key={c._id} value={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;
