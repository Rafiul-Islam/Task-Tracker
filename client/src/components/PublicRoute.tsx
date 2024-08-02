import useAuth from "../hooks/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";

const PublicRoute = () => {
  const {user} = useAuth();
  if (user) return <Navigate to="/tasks"/>
  return <Outlet/>;
};

export default PublicRoute;
