import * as z from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useSignup from "../hooks/useSignup.ts";
import {useNavigate} from "react-router-dom";

const schema = z.object({
  name: z
      .string()
      .min(1, {message: "Name is required"})
      .min(3, {message: "Name must be at least 3 characters"})
      .max(20, {message: "Name must be within 20 characters"}),
  email: z
      .string()
      .min(1, {message: "Email is required"})
      .email({message: 'Please enter a valid email'}),
  password: z
      .string()
      .min(1, {message: "Password is required"})
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#+-]{8,}$/, {
        message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
      })
});

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  
  const handleSignUp = (data: FieldValues) => {
    const {name, email, password} = data;
    useSignup({name, email, password}, navigate);
  }
  return (
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div>
          <input type="text" placeholder="Name" {...register("name")} /> <br/>
          <span>{errors.name?.message && errors.name.message}</span>
        </div>
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

export default SignUp;
