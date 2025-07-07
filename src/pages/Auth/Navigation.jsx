// Navigation.jsx
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "./Navigation.css";
import axios from "axios";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <Link to="/" className="logo">
          <span className="logo-text">MDM</span>
        </Link>

        <Link to="/" className="nav-link">
          <AiOutlineHome />
          <span className="nav-text">Home</span>
        </Link>

        <Link to="/shop" className="nav-link">
          <AiOutlineShopping />
          <span className="nav-text">Shop</span>
        </Link>

        <Link to="/cart" className="nav-link relative">
          <AiOutlineShoppingCart />
          <span className="nav-text">Cart</span>
          {cartItems.length > 0 && (
            <span className="cart-count">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>

        <Link to="/favorite" className="nav-link">
          <FaHeart />
          <span className="nav-text">Favorites</span>
          <FavoritesCount />
        </Link>
      </div>

      <div className="nav-right">
        {userInfo ? (
          <div className="dropdown">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="dropdown-btn"
            >
              {userInfo.username}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`dropdown-icon ${dropdownOpen ? "rotate" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.586l3.71-3.356a.75.75 0 111.02 1.1l-4.25 3.84a.75.75 0 01-1.02 0l-4.25-3.84a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="dropdown-menu">
                {userInfo.isAdmin && (
                  <>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li><Link to="/admin/productlist">Products</Link></li>
                    <li><Link to="/admin/categorylist">Category</Link></li>
                    <li><Link to="/admin/orderlist">Orders</Link></li>
                    <li><Link to="/admin/userlist">Users</Link></li>
                  </>
                )}
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={logoutHandler}>Logout</button></li>
              </ul>
            )}
          </div>
        ) : (
          <div className="nav-auth">
            <Link to="/login" className="nav-link">
              <AiOutlineLogin />
              <span className="nav-text">Login</span>
            </Link>
            <Link to="/register" className="nav-link">
              <AiOutlineUserAdd />
              <span className="nav-text">Register</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;





// import { useState } from "react";
// import {
//   AiOutlineHome,
//   AiOutlineShopping,
//   AiOutlineLogin,
//   AiOutlineUserAdd,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { FaHeart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./Navigation.css";
// import { useSelector, useDispatch } from "react-redux";
// import { useLogoutMutation } from "../../redux/api/usersApiSlice";
// import { logout } from "../../redux/features/auth/authSlice";
// import FavoritesCount from "../Products/FavoritesCount";

// const Navigation = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.cart);

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate("/login");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div
//       style={{ zIndex: 9999 }}
//       className={`${
//         showSidebar ? "hidden" : "flex"
//       } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
//       id="navigation-container"
//     >
//       <div className="flex flex-col justify-center space-y-4">
//         <Link
//           to="/"
//           className="flex items-center transition-transform transform hover:translate-x-2"
//         >
//           <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
//           <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
//         </Link>

//         <Link
//           to="/shop"
//           className="flex items-center transition-transform transform hover:translate-x-2"
//         >
//           <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
//           <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
//         </Link>

//         <Link to="/cart" className="flex relative">
//           <div className="flex items-center transition-transform transform hover:translate-x-2">
//             <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
//             <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
//           </div>

//           <div className="absolute top-9">
//             {cartItems.length > 0 && (
//               <span>
//                 <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
//                   {cartItems.reduce((a, c) => a + c.qty, 0)}
//                 </span>
//               </span>
//             )}
//           </div>
//         </Link>

//         <Link to="/favorite" className="flex relative">
//           <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
//             <FaHeart className="mt-[3rem] mr-2" size={20} />
//             <span className="hidden nav-item-name mt-[3rem]">
//               Favorites
//             </span>{" "}
//             <FavoritesCount />
//           </div>
//         </Link>
//       </div>

//       <div className="relative">
//         <button
//           onClick={toggleDropdown}
//           className="flex items-center text-gray-800 focus:outline-none"
//         >
//           {userInfo ? (
//             <span className="text-white">{userInfo.username}</span>
//           ) : (
//             <></>
//           )}
//           {userInfo && (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className={`h-4 w-4 ml-1 ${
//                 dropdownOpen ? "transform rotate-180" : ""
//               }`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
//               />
//             </svg>
//           )}
//         </button>

//         {dropdownOpen && userInfo && (
//           <ul
//             className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
//               !userInfo.isAdmin ? "-top-20" : "-top-80"
//             } `}
//           >
//             {userInfo.isAdmin && (
//               <>
//                 <li>
//                   <Link
//                     to="/admin/dashboard"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/productlist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Products
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/categorylist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Category
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/orderlist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Orders
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/userlist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Users
//                   </Link>
//                 </li>
//               </>
//             )}

//             <li>
//               <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
//                 Profile
//               </Link>
//             </li>
//             <li>
//               <button
//                 onClick={logoutHandler}
//                 className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         )}
//         {!userInfo && (
//           <ul>
//             <li>
//               <Link
//                 to="/login"
//                 className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
//               >
//                 <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
//                 <span className="hidden nav-item-name">LOGIN</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/register"
//                 className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
//               >
//                 <AiOutlineUserAdd size={26} />
//                 <span className="hidden nav-item-name">REGISTER</span>
//               </Link>
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navigation;
