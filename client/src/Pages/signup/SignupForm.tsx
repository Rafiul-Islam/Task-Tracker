import * as z from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router-dom";
import authServices from "../../services/auth/authServices.ts";

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

const SignUpForm = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const handleSignUp = (data: FieldValues) => {
        const {name, email, password} = data;
        authServices.signup({name, email, password}, navigate);
    }
    return (
        <div className='signup-form-container'>
            <div className='mb-4'>
                <h4>Sign Up</h4>
                <small className='text-muted'>Enter your name, email, and password to sign up</small>
            </div>
            <form onSubmit={handleSubmit(handleSignUp)}>
                <div className='mb-3'>
                    <input type="text" placeholder="Name" {...register("name")} />
                    <small className='text-danger'>{errors.name?.message && errors.name.message}</small>
                </div>
                <div className='mb-3'>
                    <input type="email" placeholder="Email" {...register("email")} />
                    <small className='text-danger'>{errors.email?.message && errors.email.message}</small>
                </div>
                <div className='mb-3'>
                    <input type="password" placeholder="Password" {...register("password")} />
                    <small className='text-danger'>{errors.password?.message && errors.password.message}</small>
                </div>
                <button className='btn btn-primary' type='submit'>Sign Up</button>
                <div className='mt-4'>
                    <span>Already have an account?&nbsp;
                        <Link className='text-decoration-none text-success' to='/login'>
                            Log in
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
