import apiClient from "../services/apiClient.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

interface ResetPasswordRequestObject {
  userId: string;
  token: string;
  password: string;
  confirmPassword: string;
}

const UseResetPassword = () => {
  const navigate = useNavigate();
  
  const verifyResetPasswordUrl = async (userId: string, token: string) => {
    try {
      await apiClient.get(`/auth/reset-password/${userId}/${token}`);
      return true
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      }
      return false;
    }
  }
  
  const resetPassword = async ({userId, token, password, confirmPassword}: ResetPasswordRequestObject) => {
    const headers = {
      'token': token
    }
    apiClient.patch(`/auth/reset-password/${userId}`, {password, confirmPassword}, {headers})
        .then(res => {
          if (res.data) {
            toast.success("Password reset successfully.");
            navigate("/login");
          } else {
            toast.error("Password reset failed");
            navigate("/forgot-password");
          }
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message);
            navigate("/forgot-password");
          }
        })
  }
  
  return {verifyResetPasswordUrl, resetPassword}
};

export default UseResetPassword;
