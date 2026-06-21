'use client';
import axiosInstance from "@/lib/api";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

type FormData = { email: string; password: string; secret: string };

const AdminRegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleRegister = async (data: FormData) => {
        setServerError(null);
        try {
            const res = await axiosInstance.post("/auth/register-admin", data);
            if (res.data.access_token) {
                setToken(res.data.access_token);
                router.push("/");
            }
        } catch (e: any) {
            const status = e?.response?.status;
            if (status === 403) setServerError("Invalid secret key");
            else if (status === 409) setServerError("Email already exists");
            else setServerError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="page-wrapper min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-60px)]
                        flex items-center justify-center bg-background">
            <div className="w-full px-5 sm:px-6 py-12 flex flex-col items-center">

                <div className="flex flex-col items-center" style={{ marginBottom: '2.5rem' }}>
                    <div
                        className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5"
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                            boxShadow: '0 4px 16px rgba(139,92,246,0.38)',
                        }}
                    >
                        <ShieldCheck size={22} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-[21px] sm:text-[23px] font-bold text-foreground tracking-[-0.02em]">
                        Admin Registration
                    </h1>
                    <p className="text-[13px] text-muted-foreground mt-1.5">Restricted access — secret key required</p>
                </div>

                <div
                    className="w-full max-w-[400px] bg-card rounded-2xl overflow-hidden border border-border/60"
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)' }}
                >
                    <form onSubmit={handleSubmit(handleRegister)} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted-foreground)' }}>
                                Admin Secret Key
                            </label>
                            <input
                                type="password"
                                placeholder="Enter secret key"
                                {...register("secret", { required: "Secret key is required" })}
                                style={{ padding: '0.85rem 1rem' }}
                                className="w-full text-[13px] rounded-xl border border-border
                                           bg-background text-foreground placeholder:text-muted-foreground
                                           outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all"
                            />
                            {errors.secret && (
                                <p className="text-destructive text-[11px] mt-1.5">{errors.secret.message}</p>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted-foreground)' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="admin@example.com"
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
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted-foreground)' }}>
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

                        {serverError && (
                            <p style={{ color: 'var(--destructive)', fontSize: '13px', textAlign: 'center' }}>
                                {serverError}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full text-white text-[13px] font-bold rounded-xl
                                       transition-all hover:opacity-92 active:scale-[0.99]"
                            style={{
                                padding: '0.85rem',
                                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                                boxShadow: '0 2px 14px rgba(139,92,246,0.38)',
                            }}
                        >
                            Create Admin Account
                        </button>
                    </form>

                    <div style={{ padding: '1rem 2rem' }} className="border-t border-border/60 bg-muted/25">
                        <p className="text-center text-[12px] text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary font-semibold hover:underline underline-offset-2">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegisterPage;
