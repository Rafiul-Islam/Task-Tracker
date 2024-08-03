import apiClient from "../services/apiClient.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

const useForgotPassword = () => {
  const sendEmail = async (email: string) => {
    try {
      toast.info("Processing");
      const {data} = await apiClient.post("/auth/forgot-password", {email});
      toast.dismiss()
      toast.success(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.dismiss()
        toast.error(error?.response?.data.message);
      }
      console.log(error)
    }
  }
  
  return {sendEmail};
}

export default useForgotPassword;
