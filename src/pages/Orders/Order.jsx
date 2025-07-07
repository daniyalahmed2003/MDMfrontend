import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import axios from "axios";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPaPal, error: errorPayPal } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": paypal.clientId, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid && !window.paypal) {
        loadPaypalScript();
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message || "Payment failed");
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({ purchase_units: [{ amount: { value: order.totalPrice } }] })
      .then((orderID) => orderID);
  }

  function onError(err) {
    toast.error(err.message || "Something went wrong");
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message || "Something went wrong"}</Messsage>
  ) : (
    <div className="ml-[10rem] px-6 pt-[100px] pb-6 flex flex-col md:flex-row gap-8">
      {/* Order Items */}
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
        <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b font-semibold bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-right">Unit Price</th>
                  <th className="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline">
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-2 text-center">{item.qty}</td>
                    <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                    <td className="p-2 text-right">${(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Info</h2>
        <div className="text-sm space-y-2">
          <p><strong className="text-pink-500">Order:</strong> {order._id}</p>
          <p><strong className="text-pink-500">Name:</strong> {order.user.username}</p>
          <p><strong className="text-pink-500">Email:</strong> {order.user.email}</p>
          <p><strong className="text-pink-500">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
          <p><strong className="text-pink-500">Method:</strong> {order.paymentMethod}</p>
          <p>
            {order.isPaid ? (
              <Messsage variant="success">Paid on {order.paidAt}</Messsage>
            ) : (
              <Messsage variant="danger">Not Paid</Messsage>
            )}
          </p>
        </div>

        <hr className="my-4" />

        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="text-sm space-y-2">
          <div className="flex justify-between"><span>Items</span><span>${order.itemsPrice}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${order.shippingPrice}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>${order.taxPrice}</span></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>${order.totalPrice}</span></div>
        </div>

        {/* Payment Section */}
        {!order.isPaid && (
          <div className="mt-4">
            {loadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
            )}
          </div>
        )}

        {/* Admin: Mark as Delivered */}
        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <button
            onClick={deliverHandler}
            className="mt-4 bg-pink-500 text-white py-2 w-full rounded hover:bg-pink-600"
          >
            Mark As Delivered
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;




// import { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Messsage from "../../components/Message";
// import Loader from "../../components/Loader";
// import {
//   useDeliverOrderMutation,
//   useGetOrderDetailsQuery,
//   useGetPaypalClientIdQuery,
//   usePayOrderMutation,
// } from "../../redux/api/orderApiSlice";

// const Order = () => {
//   const { id: orderId } = useParams();

//   const {
//     data: order,
//     refetch,
//     isLoading,
//     error,
//   } = useGetOrderDetailsQuery(orderId);

//   const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
//   const [deliverOrder, { isLoading: loadingDeliver }] =
//     useDeliverOrderMutation();
//   const { userInfo } = useSelector((state) => state.auth);

//   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

//   const {
//     data: paypal,
//     isLoading: loadingPaPal,
//     error: errorPayPal,
//   } = useGetPaypalClientIdQuery();

//   useEffect(() => {
//     if (!errorPayPal && !loadingPaPal && paypal.clientId) {
//       const loadingPaPalScript = async () => {
//         paypalDispatch({
//           type: "resetOptions",
//           value: {
//             "client-id": paypal.clientId,
//             currency: "USD",
//           },
//         });
//         paypalDispatch({ type: "setLoadingStatus", value: "pending" });
//       };

//       if (order && !order.isPaid) {
//         if (!window.paypal) {
//           loadingPaPalScript();
//         }
//       }
//     }
//   }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

//   function onApprove(data, actions) {
//     return actions.order.capture().then(async function (details) {
//       try {
//         await payOrder({ orderId, details });
//         refetch();
//         toast.success("Order is paid");
//       } catch (error) {
//         toast.error(error?.data?.message || error.message) || "Something went wrong";
//       }
//     });
//   }

//   function createOrder(data, actions) {
//     return actions.order
//       .create({
//         purchase_units: [{ amount: { value: order.totalPrice } }],
//       })
//       .then((orderID) => {
//         return orderID;
//       });
//   }

//   function onError(err) {
//     toast.error(err.message || "Something went wrong");
//   }

//   const deliverHandler = async () => {
//     await deliverOrder(orderId);
//     refetch();
//   };

//   return isLoading ? (
//     <Loader />
//   ) : error ? (
//     <Messsage variant="danger">{error.data.message || "Something went wrong"}</Messsage>
//   ) : (
//     <div className="container flex flex-col ml-[10rem] md:flex-row">
//       <div className="md:w-2/3 pr-4">
//         <div className="border gray-300 mt-5 pb-4 mb-5">
//           {order.orderItems.length === 0 ? (
//             <Messsage>Order is empty</Messsage>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-[80%]">
//                 <thead className="border-b-2">
//                   <tr>
//                     <th className="p-2">Image</th>
//                     <th className="p-2">Product</th>
//                     <th className="p-2 text-center">Quantity</th>
//                     <th className="p-2">Unit Price</th>
//                     <th className="p-2">Total</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {order.orderItems.map((item, index) => (
//                     <tr key={index}>
//                       <td className="p-2">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover"
//                         />
//                       </td>

//                       <td className="p-2">
//                         <Link to={`/product/${item.product}`}>{item.name}</Link>
//                       </td>

//                       <td className="p-2 text-center">{item.qty}</td>
//                       <td className="p-2 text-center">{item.price}</td>
//                       <td className="p-2 text-center">
//                         $ {(item.qty * item.price).toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="md:w-1/3">
//         <div className="mt-5 border-gray-300 pb-4 mb-4">
//           <h2 className="text-xl font-bold mb-2">Shipping</h2>
//           <p className="mb-4 mt-4">
//             <strong className="text-pink-500">Order:</strong> {order._id}
//           </p>

//           <p className="mb-4">
//             <strong className="text-pink-500">Name:</strong>{" "}
//             {order.user.username}
//           </p>

//           <p className="mb-4">
//             <strong className="text-pink-500">Email:</strong> {order.user.email}
//           </p>

//           <p className="mb-4">
//             <strong className="text-pink-500">Address:</strong>{" "}
//             {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
//             {order.shippingAddress.postalCode}, {order.shippingAddress.country}
//           </p>

//           <p className="mb-4">
//             <strong className="text-pink-500">Method:</strong>{" "}
//             {order.paymentMethod}
//           </p>

//           {order.isPaid ? (
//             <Messsage variant="success">Paid on {order.paidAt}</Messsage>
//           ) : (
//             <Messsage variant="danger">Not paid</Messsage>
//           )}
//         </div>

//         <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
//         <div className="flex justify-between mb-2">
//           <span>Items</span>
//           <span>$ {order.itemsPrice}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Shipping</span>
//           <span>$ {order.shippingPrice}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Tax</span>
//           <span>$ {order.taxPrice}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Total</span>
//           <span>$ {order.totalPrice}</span>
//         </div>

//         {!order.isPaid && (
//           <div>
//             {loadingPay && <Loader />}{" "}
//             {isPending ? (
//               <Loader />
//             ) : (
//               <div>
//                 <div>
//                   <PayPalButtons
//                     createOrder={createOrder}
//                     onApprove={onApprove}
//                     onError={onError}
//                   ></PayPalButtons>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {loadingDeliver && <Loader />}
//         {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
//           <div>
//             <button
//               type="button"
//               className="bg-pink-500 text-white w-full py-2"
//               onClick={deliverHandler}
//             >
//               Mark As Delivered
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Order;
