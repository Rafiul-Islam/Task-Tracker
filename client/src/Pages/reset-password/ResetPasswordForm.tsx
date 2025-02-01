import {useNavigate, useParams} from "react-router-dom";
import UseResetPassword from "../../hooks/useResetPassword.ts";
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

const ResetPasswordForm = () => {
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
        <div className='reset-password-form-container'>
            <div className='mb-4'>
                <h4>Reset Password</h4>
                <small className='text-muted'>Enter your new password below</small>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3'>
                    <label>Password</label>
                    <input type="password" {...register("password")}/>
                    <small className='text-danger'>{errors.password?.message && errors.password.message}</small>
                </div>
                <div className='mb-3'>
                    <label>Confirm Password</label>
                    <input type="password" {...register("confirmPassword")}/>
                    <small className='text-danger'>
                        {errors.confirmPassword?.message && errors.confirmPassword.message}
                    </small>
                </div>
                <button className='btn btn-primary' type='submit'>Save Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
