import useAuth from "../hooks/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";
import Toast from "./Toast.tsx";
import {useEffect} from "react";
import useAuthStore from "../stores/authStore.ts";
import LoggedInUser from "../types/LoggedInUser.ts";

const PublicRoute = () => {
  const user = useAuth();
  const {setCurrentUser} = useAuthStore();
  
  useEffect(() => {
    if (!user) setCurrentUser({} as LoggedInUser);
  }, []);
  
  if (user) return <Navigate to="/tasks"/>
  return (
      <>
        <Toast/>
        <Outlet/>
      </>
  )
};

export default PublicRoute;
