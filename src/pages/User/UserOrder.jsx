import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import axios from "axios";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto pt-24 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Image</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Order ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Total</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Paid</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Delivered</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.user}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-700">{order._id}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">${order.totalPrice}</td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.isPaid ? "Completed" : "Pending"}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.isDelivered ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.isDelivered ? "Completed" : "Pending"}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 text-sm rounded-md transition">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrder;




// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import { Link } from "react-router-dom";
// import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

// const UserOrder = () => {
//   const { data: orders, isLoading, error } = useGetMyOrdersQuery();

//   return (
//     <div className="container mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">My Orders </h2>

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error?.data?.error || error.error}</Message>
//       ) : (
//         <table className="w-full">
//           <thead>
//             <tr>
//               <td className="py-2">IMAGE</td>
//               <td className="py-2">ID</td>
//               <td className="py-2">DATE</td>
//               <td className="py-2">TOTAL</td>
//               <td className="py-2">PAID</td>
//               <td className="py-2">DELIVERED</td>
//               <td className="py-2"></td>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <img
//                   src={order.orderItems[0].image}
//                   alt={order.user}
//                   className="w-[6rem] mb-5"
//                 />

//                 <td className="py-2">{order._id}</td>
//                 <td className="py-2">{order.createdAt.substring(0, 10)}</td>
//                 <td className="py-2">$ {order.totalPrice}</td>

//                 <td className="py-2">
//                   {order.isPaid ? (
//                     <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                       Completed
//                     </p>
//                   ) : (
//                     <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                       Pending
//                     </p>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   {order.isDelivered ? (
//                     <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                       Completed
//                     </p>
//                   ) : (
//                     <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                       Pending
//                     </p>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   <Link to={`/order/${order._id}`}>
//                     <button className="bg-pink-400 text-back py-2 px-3 rounded">
//                       View Details
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserOrder;
