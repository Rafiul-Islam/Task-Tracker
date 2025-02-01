import * as z from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link} from "react-router-dom";
import login from "../../services/auth/login.ts";

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

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const handleLogin = (data: FieldValues) => {
        const {email, password} = data;
        login({email, password})
    }

    return (
        <div className="login-form-container">
            <div className='mb-4'>
                <h4 >Login</h4>
                <small className='text-muted'>Enter your email and password to login</small>
            </div>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className='mb-3'>
                    <input autoFocus type="email" placeholder="Email" {...register("email")} /> <br/>
                    <small className='text-danger'>{errors.email?.message && errors.email.message}</small>
                </div>
                <div className='mb-3'>
                    <input type="password" placeholder="Password" {...register("password")} /> <br/>
                    <small className='text-danger'>{errors.password?.message && errors.password.message}</small>
                </div>
                <div className='text-end'>
                    <Link className='text-decoration-none fst-italic text-secondary' to="/forgot-password">Forgot Password</Link>
                </div>
                <div>
                    <button className='btn btn-primary' type='submit'>Sign In</button>
                </div>
                <div className='mt-4'>
                    <span>Don't have an account? </span>
                    <Link className='text-decoration-none fst-italic text-success' to="/signup">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;