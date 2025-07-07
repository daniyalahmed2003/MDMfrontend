//                 className="list-item py-2 px-3 block mb-2 hover:bg-blue-50 rounded-md text-gray-700"
//                 to="/admin/dashboard"
//                 style={({ isActive }) => ({
//                   color: isActive ? "blue" : "inherit",
//                   fontWeight: isActive ? "600" : "normal"
//                 })}
//               >
//                 Admin Dashboard
//               </NavLink>
//             </li>
//             {/* Repeat same pattern for other menu items */}
//             <li>
//               <NavLink
//                 className="list-item py-2 px-3 block mb-2 hover:bg-blue-50 rounded-md text-gray-700"
//                 to="/admin/categorylist"
//                 style={({ isActive }) => ({
//                   color: isActive ? "blue" : "inherit",
//                   fontWeight: isActive ? "600" : "normal"
//                 })}
//               >
//                 Create Category
//               </NavLink>
//             </li>
//             {/* Add other menu items with same styling */}
//           </ul>
//         </section>
//       )}
//     </>
//   );
// };

// export default AdminMenu;



import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`bg-blue-500 p-2 fixed right-7 top-[115px] rounded-lg z-50`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-white my-1"></div>
            <div className="w-6 h-0.5 bg-white my-1"></div>
            <div className="w-6 h-0.5 bg-white my-1"></div>
          </>
        )}
      </button>

      {/* Admin Menu */}
      {isMenuOpen && (
        <section className="bg-white p-4 fixed right-7 top-[160px] shadow-lg rounded-lg border border-gray-200 z-40">
          <ul className="list-none mt-2">
            {[
              { to: "/admin/dashboard", label: "Admin Dashboard" },
              { to: "/admin/categorylist", label: "Create Category" },
              { to: "/admin/productlist", label: "Create Product" },
              { to: "/admin/allproductslist", label: "All Products" },
              { to: "/admin/userlist", label: "Manage Users" },
              { to: "/admin/orderlist", label: "Manage Orders" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  className="list-item py-2 px-3 block mb-2 hover:bg-blue-50 rounded-md text-gray-700"
                  to={to}
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "inherit",
                    fontWeight: isActive ? "600" : "normal",
                  })}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
