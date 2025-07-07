import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="pt-[10px] px-8 max-w-7xl mx-auto">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Order Review</h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-white rounded-md shadow">
                <thead className="bg-gray-100 text-gray-700 border-b">
                  <tr>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-center">Quantity</th>
                    <th className="p-3 text-center">Price</th>
                    <th className="p-3 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="p-3">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-3 text-center">{item.qty}</td>
                      <td className="p-3 text-center">${item.price.toFixed(2)}</td>
                      <td className="p-3 text-center">
                        ${Number(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary & Shipping Info */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                {/* Shipping */}
                <div className="p-6 bg-white rounded-md shadow">
                  <h3 className="text-xl font-bold mb-3">Shipping Info</h3>
                  <p>
                    <strong>Address:</strong>{" "}
                    {`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
                  </p>
                </div>

                {/* Payment */}
                <div className="p-6 bg-white rounded-md shadow">
                  <h3 className="text-xl font-bold mb-3">Payment Method</h3>
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="p-6 bg-white rounded-md shadow">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <ul className="text-gray-800 space-y-2">
                  <li className="flex justify-between">
                    <span>Items:</span> <span>${cart.itemsPrice}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Shipping:</span> <span>${cart.shippingPrice}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tax:</span> <span>${cart.taxPrice}</span>
                  </li>
                  <li className="flex justify-between font-semibold text-lg">
                    <span>Total:</span> <span>${cart.totalPrice}</span>
                  </li>
                </ul>

                {error && (
                  <div className="mt-4">
                    <Message variant="danger">
                      {error.data?.message || "Something went wrong"}
                    </Message>
                  </div>
                )}

                <button
                  type="button"
                  className="mt-6 bg-pink-600 hover:bg-pink-700 text-white w-full py-2 rounded-full font-medium transition duration-300"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>

                {isLoading && <Loader />}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
