import apiClient from "./apiClient.ts";
import {toast} from "react-toastify";
import User from "../types/User.ts";
import Credential from "../types/Credential.ts";
import Response from "../types/Response.ts";
import {NavigateFunction} from "react-router-dom";
import {navigateToSignup, navigateToTasks} from "../utils/navigateTo.ts";
import {Cookies} from "react-cookie";
import ms from 'ms';

const cookies = new Cookies();

class AuthServices {
  login = (credential: Credential, navigate: NavigateFunction) => {
    apiClient.post<Response>('/api/auth/login', credential)
        .then(({data: res}) => {
          const expireTime = new Date(new Date().getTime() + ms(res.data.expire));
          cookies.set("auth_token", res.data.token, {path: '/', expires: expireTime});
          setTimeout(() => {
            navigateToTasks(navigate);
          }, 1000);
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
          navigateToSignup(navigate);
        })
        .catch(error => {
          console.log(error);
          toast.error(error.response.data.message);
        });
  }
}

const authServices = new AuthServices()

export default authServices;
