'use client';
import axiosInstance from "@/lib/api";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<{
        email: string;
        password: string;
        confirmPassword: string;
    }>();
    const router = useRouter();
    const handleRegister = async (data: { email: string, password: string }) => {
        const res = await axiosInstance.post("/auth/register", { email: data.email, password: data.password });
        if (res.data.access_token) {
            setToken(res.data.access_token);
            router.push("/login");
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(handleRegister)}>
                <input type="email" placeholder="Email" {...register("email", { required: true })} />
                {errors.email && <span>Email is required</span>}
                <input type="password" placeholder="Password" {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                        message: "Must contain uppercase, number and special character"
                    }
                })} />
                {errors.password && <span>{errors.password.message}</span>}
                <input type="password" placeholder="Confirm Password"
                    {...register("confirmPassword", {
                        required: true,
                        validate: (val) => val === watch("password") || "Passwords do not match"
                    })}
                />
                {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
