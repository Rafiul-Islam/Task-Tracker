import authServices from "../services/authServices.ts";
import Credential from "../types/Credential.ts";
import {NavigateFunction} from "react-router-dom";

const useLogin = (credential: Credential, navigate: NavigateFunction) => {
  return authServices.login(credential, navigate);
}
export default useLogin
