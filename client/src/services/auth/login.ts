import Credential from "../../types/Credential.ts";
import authServices from "./authServices.ts";

const login = (credential: Credential) => authServices.login(credential)

export default login;
