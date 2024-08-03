import Credential from "../../types/Credential.ts";
import {NavigateFunction} from "react-router-dom";
import authServices from "./authServices.ts";

const login = (credential: Credential, navigate: NavigateFunction) => authServices.login(credential, navigate)

export default login;
