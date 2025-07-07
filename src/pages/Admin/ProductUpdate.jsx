import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import axios from "axios";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(params._id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Product updated successfully");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;
    try {
      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="pt-[90px] bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/7">
            <AdminMenu />
          </div>
          

          <div className="md:w-4/5 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update / Delete Product</h2>

            {image && (
              <div className="mb-6 text-center">
                <img src={image} alt="product" className="w-full max-h-64 object-contain rounded-md" />
              </div>
            )}

            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full border px-4 py-2 rounded-md border-gray-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Price</label>
                  <input
                    type="number"
                    className="w-full border px-4 py-2 rounded-md border-gray-300"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Quantity</label>
                  <input
                    type="number"
                    className="w-full border px-4 py-2 rounded-md border-gray-300"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Brand</label>
                  <input
                    type="text"
                    className="w-full border px-4 py-2 rounded-md border-gray-300"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Count In Stock</label>
                  <input
                    type="number"
                    className="w-full border px-4 py-2 rounded-md border-gray-300"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Category</label>
                  <select
                    className="w-full border px-4 py-2 rounded-md border-gray-300"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block mb-1 text-gray-700 font-medium">Description</label>
                <textarea
                  className="w-full border px-4 py-2 rounded-md border-gray-300 min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-3 bg-pink-600 text-white rounded-md font-medium hover:bg-pink-700"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;



// import { useState, useEffect } from "react";
// import AdminMenu from "./AdminMenu";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useGetProductByIdQuery,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";

// const AdminProductUpdate = () => {
//   const params = useParams();

//   const { data: productData } = useGetProductByIdQuery(params._id);

//   console.log(productData);

//   const [image, setImage] = useState(productData?.image || "");
//   const [name, setName] = useState(productData?.name || "");
//   const [description, setDescription] = useState(
//     productData?.description || ""
//   );
//   const [price, setPrice] = useState(productData?.price || "");
//   const [category, setCategory] = useState(productData?.category || "");
//   const [quantity, setQuantity] = useState(productData?.quantity || "");
//   const [brand, setBrand] = useState(productData?.brand || "");
//   const [stock, setStock] = useState(productData?.countInStock);

//   // hook
//   const navigate = useNavigate();

//   // Fetch categories using RTK Query
//   const { data: categories = [] } = useFetchCategoriesQuery();

//   const [uploadProductImage] = useUploadProductImageMutation();

//   // Define the update product mutation
//   const [updateProduct] = useUpdateProductMutation();

//   // Define the delete product mutation
//   const [deleteProduct] = useDeleteProductMutation();

//   useEffect(() => {
//     if (productData && productData._id) {
//       setName(productData.name);
//       setDescription(productData.description);
//       setPrice(productData.price);
//       setCategory(productData.category?._id);
//       setQuantity(productData.quantity);
//       setBrand(productData.brand);
//       setImage(productData.image);
//     }
//   }, [productData]);

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("image", e.target.files[0]);
//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success("Item added successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//       setImage(res.image);
//     } catch (err) {
//       toast.success("Item added successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("quantity", quantity);
//       formData.append("brand", brand);
//       formData.append("countInStock", stock);

//       // Update product using the RTK Query mutation
//       const data = await updateProduct({ productId: params._id, formData });

//       if (data?.error) {
//         toast.error(data.error, {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//         });
//       } else {
//         toast.success(`Product successfully updated`, {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//         });
//         navigate("/admin/allproductslist");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Product update failed. Try again.", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       let answer = window.confirm(
//         "Are you sure you want to delete this product?"
//       );
//       if (!answer) return;

//       const { data } = await deleteProduct(params._id);
//       toast.success(`"${data.name}" is deleted`, {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//       navigate("/admin/allproductslist");
//     } catch (err) {
//       console.log(err);
//       toast.error("Delete failed. Try again.", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <>
//       <div className="container  xl:mx-[9rem] sm:mx-[0]">
//         <div className="flex flex-col md:flex-row">
//           <AdminMenu />
//           <div className="md:w-3/4 p-3">
//             <div className="h-12">Update / Delete Product</div>

//             {image && (
//               <div className="text-center">
//                 <img
//                   src={image}
//                   alt="product"
//                   className="block mx-auto w-full h-[40%]"
//                 />
//               </div>
//             )}

//             <div className="mb-3">
//               <label className="text-white  py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//                 {image ? image.name : "Upload image"}
//                 <input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={uploadFileHandler}
//                   className="text-white"
//                 />
//               </label>
//             </div>

//             <div className="p-3">
//               <div className="flex flex-wrap">
//                 <div className="one">
//                   <label htmlFor="name">Name</label> <br />
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>

//                 <div className="two">
//                   <label htmlFor="name block">Price</label> <br />
//                   <input
//                     type="number"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-wrap">
//                 <div>
//                   <label htmlFor="name block">Quantity</label> <br />
//                   <input
//                     type="number"
//                     min="1"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="name block">Brand</label> <br />
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                     value={brand}
//                     onChange={(e) => setBrand(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <label htmlFor="" className="my-5">
//                 Description
//               </label>
//               <textarea
//                 type="text"
//                 className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />

//               <div className="flex justify-between">
//                 <div>
//                   <label htmlFor="name block">Count In Stock</label> <br />
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="">Category</label> <br />
//                   <select
//                     placeholder="Choose Category"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
//                     onChange={(e) => setCategory(e.target.value)}
//                   >
//                     {categories?.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="">
//                 <button
//                   onClick={handleSubmit}
//                   className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminProductUpdate;
