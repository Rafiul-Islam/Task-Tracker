import {createBrowserRouter, Navigate} from "react-router-dom";
import LoginPage from "../Pages/LoginPage.tsx";
import TasksPage from "../Pages/TasksPage.tsx";
import PrivateRoute from "../components/PrivateRoute.tsx";
import PublicRoute from "../components/PublicRoute.tsx";
import ErrorPage from "../Pages/ErrorPage.tsx";
import SignUp from "../Pages/SignUp.tsx";
import ForgotPassword from "../Pages/ForgotPassword.tsx";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Navigate to="/login"/>
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "signup",
        element: <SignUp/>
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>
      }
    ]
  },
  {
    path: "/",
    element: <PrivateRoute/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Navigate to="/tasks"/>
      },
      {
        path: "tasks",
        element: <TasksPage/>,
      }
    ]
  }
]);

export default routers;
