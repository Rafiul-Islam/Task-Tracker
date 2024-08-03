import {NavigateFunction} from "react-router-dom";
import authServices from "./authServices.ts";

const logout = (navigate: NavigateFunction) => authServices.logout(navigate)

export default logout;
