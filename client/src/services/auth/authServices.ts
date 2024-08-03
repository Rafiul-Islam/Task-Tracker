import apiClient from "../apiClient.ts";
import {toast} from "react-toastify";
import User from "../../types/User.ts";
import Credential from "../../types/Credential.ts";
import Response from "../../types/Response.ts";
import {NavigateFunction} from "react-router-dom";
import {navigateToLogin} from "../../utils/navigateTo.ts";
import {Cookies} from "react-cookie";
import ms from 'ms';

const cookies = new Cookies();

class AuthServices {
  login = (credential: Credential) => {
    apiClient.post<Response>('/api/auth/login', credential)
        .then(({data: res}) => {
          const expireTime = new Date(new Date().getTime() + ms(res.data.expire));
          cookies.set("auth_token", res.data.token, {path: '/', expires: expireTime});
          // navigateToTasks(navigate);
          window.location.href = "/tasks"
        })
        .catch(error => {
          console.log(error);
          toast.error(error.response.data.message);
        });
  }
  
  signup = (user: User, navigate: NavigateFunction) => {
    apiClient.post<Response>('/api/auth/signup', user)
        .then(({data: res}) => {
          toast.success(res.message);
          navigateToLogin(navigate);
        })
        .catch(error => {
          console.log(error);
          toast.error(error.response.data.message);
        });
  }
  
  logout = () => {
    try {
      if (cookies.get("auth_token")) cookies.remove("auth_token");
      window.location.href = "/login"
    } catch (error) {
      toast.error("Unable to logout");
      console.log(error);
    }
  }
}

const authServices = new AuthServices()

export default authServices;
