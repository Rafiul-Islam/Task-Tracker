import {Navigate, Outlet} from 'react-router-dom';
import useAuth from "../hooks/useAuth.ts";
import Layout from "./Layout.tsx";

const PrivateRoute = () => {
  const {user} = useAuth();
  
  if (!user) return <Navigate to="/login"/>;
  return (
      <>
        <Layout>
          <Outlet/>
        </Layout>
      </>
  );
};

export default PrivateRoute;
