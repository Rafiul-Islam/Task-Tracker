import {Navigate, Outlet} from 'react-router-dom';
import useAuth from "../hooks/useAuth.ts";
import Layout from "./Layout.tsx";
import Toast from "./Toast.tsx";

const PrivateRoute = () => {
  const user = useAuth();
  
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
