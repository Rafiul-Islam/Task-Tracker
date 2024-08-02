import * as z from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useLogin from "../hooks/useLogin.ts";
import {useNavigate} from "react-router-dom";

const schema = z.object({
  email: z
      .string()
      .min(1, {message: "Email is required"})
      .email({message: 'Please enter a valid email'}),
  password: z
      .string()
      .min(1, {message: "Password is required"})
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#+-]{8,}$/, {
        message: "Invalid password format",
      })
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  
  const handleLogin = (data: FieldValues) => {
    const {email, password} = data;
    useLogin({email, password}, navigate);
  }
  
  return (
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <input type="email" placeholder="Email" {...register("email")} /> <br/>
          <span>{errors.email?.message && errors.email.message}</span>
        </div>
        <div>
          <input type="password" placeholder="Password" {...register("password")} /> <br/>
          <span>{errors.password?.message && errors.password.message}</span>
        </div>
        <button type='submit'>Submit</button>
      </form>
  );
};

export default LoginPage;
