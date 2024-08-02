import useAuth from "../hooks/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";
import Toast from "./Toast.tsx";

const PublicRoute = () => {
  const user = useAuth();
  if (user) return <Navigate to="/tasks"/>
  return (
      <>
        <Toast/>
        <Outlet/>
      </>
  )
};

export default PublicRoute;
