import {Navigate, Outlet} from 'react-router-dom';
import useAuth from "../hooks/useAuth.ts";
import Layout from "./Layout.tsx";
import Toast from "./Toast.tsx";
import {useEffect} from "react";
import useAuthStore from "../stores/authStore.ts";

const PrivateRoute = () => {
  const user = useAuth();
  const {setCurrentUser} = useAuthStore();
  
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  
  if (!user) return <Navigate to="/login"/>;
  return (
      <>
        <Toast/>
        <Layout>
          <Outlet/>
        </Layout>
      </>
  );
};

export default PrivateRoute;
