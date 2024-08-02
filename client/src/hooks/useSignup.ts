import authServices from "../services/authServices.ts";
import User from "../types/User.ts";
import {NavigateFunction} from "react-router-dom";

const useSignup = (user: User, navigate: NavigateFunction) => {
  authServices.signup(user, navigate);
}
export default useSignup;
