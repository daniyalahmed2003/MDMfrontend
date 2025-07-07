import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { format } from "date-fns";
import axios from "axios";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="pt-[90px] bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminMenu />
          {/* Sidebar */}
          {/* <div className="lg:w-1/5">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
              <AdminMenu />
            </div>
          </div> */}

          {/* Main Content */}
          <div className="lg:w-4/5">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="error">
                {error?.data?.message || error.error || "Error loading orders"}
              </Message>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img
                              src={order.orderItems[0]?.image}
                              alt={order._id}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order._id.substring(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.user?.username || "Guest"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.createdAt ? format(new Date(order.createdAt), 'MMM dd, yyyy') : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${order.totalPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.isPaid
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                              }`}>
                              {order.isPaid ? 'Paid' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.isDelivered
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {order.isDelivered ? 'Delivered' : 'Processing'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/order/${order._id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;


// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import { Link } from "react-router-dom";
// import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
// import AdminMenu from "./AdminMenu";

// const OrderList = () => {
//   const { data: orders, isLoading, error } = useGetOrdersQuery();

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error || "Something went wrong"}
//         </Message>
//       ) : (
//         <table className="container mx-auto">
//           <AdminMenu />

//           <thead className="w-full border">
//             <tr className="mb-[5rem]">
//               <th className="text-left pl-1">ITEMS</th>
//               <th className="text-left pl-1">ID</th>
//               <th className="text-left pl-1">USER</th>
//               <th className="text-left pl-1">DATA</th>
//               <th className="text-left pl-1">TOTAL</th>
//               <th className="text-left pl-1">PAID</th>
//               <th className="text-left pl-1">DELIVERED</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>
//                   <img
//                     src={order.orderItems[0].image}
//                     alt={order._id}
//                     className="w-[5rem] pt-4"
//                   />
//                 </td>
//                 <td>{order._id}</td>

//                 <td>{order.user ? order.user.username : "N/A"}</td>

//                 <td>
//                   {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
//                 </td>

//                 <td>$ {order.totalPrice}</td>

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

//                 <td>
//                   <Link to={`/order/${order._id}`}>
//                     <button>More</button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </>
//   );
// };

// export default OrderList;
