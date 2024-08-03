import {useNavigate, useParams} from "react-router-dom";
import UseResetPassword from "../hooks/useResetPassword.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";

const schema = z.object({
  password: z
      .string()
      .min(1, {message: "Password is required"})
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#+-]{8,}$/, {
        message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
  confirmPassword: z
      .string()
      .min(1, {message: "confirmPassword is required"})
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#+-]{8,}$/, {
        message: "confirmPassword must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
      })
})

type FormData = z.infer<typeof schema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const {verifyResetPasswordUrl, resetPassword} = UseResetPassword();
  const {userId, token} = useParams();
  
  verifyResetPasswordUrl(userId!, token!)
  .then(res => {
    if (!res) navigate("/forgot-password");
  });
  
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema)
  })
  
  const onSubmit = (data: FormData) => {
    const {password, confirmPassword} = data;
    if (password !== confirmPassword) toast.warning("Passwords don't match");
    else {
      resetPassword({
        userId: userId!,
        token: token!,
        password,
        confirmPassword
      })
    }
  }
  
  return (
      <div>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Password</label> <br/>
            <input type="password" {...register("password")}/> <br/>
            <span>{errors.password?.message && errors.password.message}</span>
          </div>
          <div>
            <label>Confirm Password</label> <br/>
            <input type="password" {...register("confirmPassword")}/> <br/>
            <span>{errors.confirmPassword?.message && errors.confirmPassword.message}</span>
          </div>
          <br/>
          <button type='submit'>Submit</button>
        </form>
      </div>
  );
};

export default ResetPassword;
