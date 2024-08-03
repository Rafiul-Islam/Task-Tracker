import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useForgotPassword from "../hooks/useForgotPassword.ts";
import {useRef} from "react";
import {Link} from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>

const ForgotPassword = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const {sendEmail} = useForgotPassword();
  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema)
  })
  
  const onSubmit = (data: FormData) => {
    const {email} = data;
    sendEmail(email);
    reset();
  }
  
  return (
      <>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email</label>
            <br/>
            <input type="email" placeholder='Pleae enter your email' {...register('email')}/>
            <br/>
            <span>{errors.email?.message && errors.email.message}</span>
          </div>
          <br/>
          <button type='submit' ref={buttonRef}>Submit</button>
          <br/>
          <br/>
          <Link to='/login'>Login</Link>
        </form>
      </>
  );
};

export default ForgotPassword;
