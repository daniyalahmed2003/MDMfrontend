import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error || "Something went wrong");
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Update failed");
    }
  };

  return (
    <div className="pt-[100px] bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error || "Something went wrong"}
          </Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Admin</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 text-sm">{user._id}</td>

                    {/* Name */}
                    <td className="px-4 py-2 text-sm">
                      {editableUserId === user._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) => setEditableUserName(e.target.value)}
                            className="w-full p-2 border rounded-md"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span>{user.username}</span>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                            className="text-blue-600 hover:text-blue-800 ml-3"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-2 text-sm">
                      {editableUserId === user._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) => setEditableUserEmail(e.target.value)}
                            className="w-full p-2 border rounded-md"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <a href={`mailto:${user.email}`} className="text-blue-700 hover:underline">
                            {user.email}
                          </a>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                            className="text-blue-600 hover:text-blue-800 ml-3"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Admin */}
                    <td className="px-4 py-2 text-sm">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-600" />
                      ) : (
                        <FaTimes className="text-red-600" />
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2 text-sm">
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;



// import { useEffect, useState } from "react";
// import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import {
//   useDeleteUserMutation,
//   useGetUsersQuery,
//   useUpdateUserMutation,
// } from "../../redux/api/usersApiSlice";
// import { toast } from "react-toastify";
// // ⚠️⚠️⚠️ don't forget this ⚠️⚠️⚠️⚠️
// // import AdminMenu from "./AdminMenu";

// const UserList = () => {
//   const { data: users, refetch, isLoading, error } = useGetUsersQuery();

//   const [deleteUser] = useDeleteUserMutation();

//   const [editableUserId, setEditableUserId] = useState(null);
//   const [editableUserName, setEditableUserName] = useState("");
//   const [editableUserEmail, setEditableUserEmail] = useState("");

//   const [updateUser] = useUpdateUserMutation();

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   const deleteHandler = async (id) => {
//     if (window.confirm("Are you sure")) {
//       try {
//         await deleteUser(id);
//         refetch();
//       } catch (err) {
//         toast.error(err?.data?.message || err.error || "Something went wrong");
//       }
//     }
//   };

//   const toggleEdit = (id, username, email) => {
//     setEditableUserId(id);
//     setEditableUserName(username);
//     setEditableUserEmail(email);
//   };

//   const updateHandler = async (id) => {
//     try {
//       await updateUser({
//         userId: id,
//         username: editableUserName,
//         email: editableUserEmail,
//       });
//       setEditableUserId(null);
//       refetch();
//     } catch (err) {
//       toast.error(err?.data?.message || err.error || "Something went wrong");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold mb-4">Users</h1>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error || "Something went wrong"}
//         </Message>
//       ) : (
//         <div className="flex flex-col md:flex-row">
//           {/* <AdminMenu /> */}
//           <table className="w-full md:w-4/5 mx-auto">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left">ID</th>
//                 <th className="px-4 py-2 text-left">NAME</th>
//                 <th className="px-4 py-2 text-left">EMAIL</th>
//                 <th className="px-4 py-2 text-left">ADMIN</th>
//                 <th className="px-4 py-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user._id}>
//                   <td className="px-4 py-2">{user._id}</td>
//                   <td className="px-4 py-2">
//                     {editableUserId === user._id ? (
//                       <div className="flex items-center">
//                         <input
//                           type="text"
//                           value={editableUserName}
//                           onChange={(e) => setEditableUserName(e.target.value)}
//                           className="w-full p-2 border rounded-lg"
//                         />
//                         <button
//                           onClick={() => updateHandler(user._id)}
//                           className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
//                         >
//                           <FaCheck />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         {user.username}{" "}
//                         <button
//                           onClick={() =>
//                             toggleEdit(user._id, user.username, user.email)
//                           }
//                         >
//                           <FaEdit className="ml-[1rem]" />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-4 py-2">
//                     {editableUserId === user._id ? (
//                       <div className="flex items-center">
//                         <input
//                           type="text"
//                           value={editableUserEmail}
//                           onChange={(e) => setEditableUserEmail(e.target.value)}
//                           className="w-full p-2 border rounded-lg"
//                         />
//                         <button
//                           onClick={() => updateHandler(user._id)}
//                           className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
//                         >
//                           <FaCheck />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
//                         <button
//                           onClick={() =>
//                             toggleEdit(user._id, user.name, user.email)
//                           }
//                         >
//                           <FaEdit className="ml-[1rem]" />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-4 py-2">
//                     {user.isAdmin ? (
//                       <FaCheck style={{ color: "green" }} />
//                     ) : (
//                       <FaTimes style={{ color: "red" }} />
//                     )}
//                   </td>
//                   <td className="px-4 py-2">
//                     {!user.isAdmin && (
//                       <div className="flex">
//                         <button
//                           onClick={() => deleteHandler(user._id)}
//                           className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;
