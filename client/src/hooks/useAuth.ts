// const user = {email: '', password: ''};

import {Cookies} from "react-cookie";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  userId: string,
  email: string,
  name: string,
}

const cookies = new Cookies();

const useAuth = () => {
  const authToken = cookies.get("auth_token");
  if (!authToken) return null;
  try {
    const {userId, name, email} = jwtDecode<JwtPayload>(authToken);
    return {userId, name, email};
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}

export default useAuth;
