'use client';
import axiosInstance from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setToken } from "@/lib/auth";
import { useForm } from "react-hook-form";
const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string, password: string }>();
    const router = useRouter();

    const handleLogin = async (data: { email: string, password: string }) => {
        const res = await axiosInstance.post("/auth/login", { email: data.email, password: data.password });
        if (res.data.access_token) {
            setToken(res.data.access_token);
            router.push("/");
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <input type="email" placeholder="Email"{...register("email", { required: true })} />
                {errors.email && <span>Email is required</span>}
                <input type="password" placeholder="Password" {...register("password", {
                    required: "Password is required"
                })} />
                {errors.password && <span>{errors.password.message}</span>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
