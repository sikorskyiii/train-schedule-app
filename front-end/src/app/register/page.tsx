'use client';
import axiosInstance from "@/lib/api";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Train } from "lucide-react";

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
    };

    return (
        <div className="page-wrapper min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-60px)]
                        flex items-center justify-center bg-background">
            <div className="w-full flex flex-col items-center" style={{ padding: '3rem 1.25rem' }}>
                <div className="flex flex-col items-center" style={{ marginBottom: '2.5rem' }}>
                    <div
                        className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5"
                        style={{
                            background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                            boxShadow: '0 4px 16px rgba(59,130,246,0.38)',
                        }}
                    >
                        <Train size={22} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-[21px] sm:text-[23px] font-bold text-foreground tracking-[-0.02em]">
                        Create account
                    </h1>
                    <p className="text-[13px] text-muted-foreground mt-1.5">Get started with TrainView</p>
                </div>
                <div
                    className="w-full max-w-[400px] bg-card rounded-2xl overflow-hidden border border-border/60"
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)' }}
                >
                    <form onSubmit={handleSubmit(handleRegister)} style={{ padding: '2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground
                                             uppercase tracking-[0.1em] mb-2">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                {...register("email", { required: "Email is required" })}
                                style={{ padding: '0.85rem 1rem' }}
                                className="w-full text-[13px] rounded-xl border border-border
                                           bg-background text-foreground placeholder:text-muted-foreground
                                           outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all"
                            />
                            {errors.email && (
                                <p className="text-destructive text-[11px] mt-1.5">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground
                                             uppercase tracking-[0.1em] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters" },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                                        message: "Must contain uppercase, number and special character"
                                    }
                                })}
                                style={{ padding: '0.85rem 1rem' }}
                                className="w-full text-[13px] rounded-xl border border-border
                                           bg-background text-foreground placeholder:text-muted-foreground
                                           outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all"
                            />
                            {errors.password && (
                                <p className="text-destructive text-[11px] mt-1.5">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground
                                             uppercase tracking-[0.1em] mb-2">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword", {
                                    required: "Please confirm password",
                                    validate: (val) => val === watch("password") || "Passwords do not match"
                                })}
                                style={{ padding: '0.85rem 1rem' }}
                                className="w-full text-[13px] rounded-xl border border-border
                                           bg-background text-foreground placeholder:text-muted-foreground
                                           outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all"
                            />
                            {errors.confirmPassword && (
                                <p className="text-destructive text-[11px] mt-1.5">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full h-11 text-white text-[13px] font-bold rounded-xl
                                       transition-all hover:opacity-92 active:scale-[0.99]"
                            style={{
                                background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                                boxShadow: '0 2px 14px rgba(59,130,246,0.38)',
                            }}
                        >
                            Create Account
                        </button>
                    </form>

                    <div style={{ padding: '1rem 2rem' }} className="border-t border-border/60 bg-muted/25">
                        <p className="text-center text-[12px] text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login"
                                className="text-primary font-semibold hover:underline underline-offset-2">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
