import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import axios from "../../utils/axios"; // update path according to file location
import axios from "axios";


const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
