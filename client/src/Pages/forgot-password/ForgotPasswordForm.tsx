import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useForgotPassword from "../../hooks/useForgotPassword.ts";
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
        <div className='forgot-password-form-container'>
            <div className='mb-4'>
                <h4>Forgot Password</h4>
                <small className='text-muted'>Enter your email to reset password</small>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3'>
                    <label>Email</label>
                    <input type="email" placeholder='Pleae enter your email' {...register('email')}/>
                    <small className='text-danger'>{errors.email?.message && errors.email.message}</small>
                </div>
                <button className='btn btn-primary' type='submit' ref={buttonRef}>Send Email</button>
                <div className='mt-4'>
                    Remember your password? <Link className='text-decoration-none text-success fst-italic' to='/login'>Login</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
