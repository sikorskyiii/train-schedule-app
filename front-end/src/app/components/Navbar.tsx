'use client';
import { isAuthenticated, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Moon, Sun, Train } from "lucide-react";

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsAuth(isAuthenticated());
        setMounted(true);
    }, [pathname]);

    const handleLogout = () => {
        removeToken();
        setIsAuth(false);
        router.push("/login");
    };

    return (
        <nav
            className="sticky top-0 z-50 border-b border-white/[0.07] page-wrapper"
            style={{ background: '#060d18' }}
        >
            <div className="container-inner flex items-center justify-between" style={{ height: '56px', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="w-7 h-7 rounded-[8px] flex items-center justify-center bg-blue-500 group-hover:bg-blue-400 transition-colors shrink-0">
                        <Train size={13} className="text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-[13px] font-bold tracking-wide text-white">
                        TrainView
                    </span>
                </Link>

                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="w-9 h-9 flex items-center justify-center rounded-lg
                                   text-white/35 hover:text-white/75 hover:bg-white/8 transition-all"
                        aria-label="Toggle theme"
                    >
                        {mounted && theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                    </button>

                    <div className="w-px h-4 bg-white/10 mx-0.5" />

                    {isAuth ? (
                        <button
                            onClick={handleLogout}
                            style={{ padding: '0.45rem 1.25rem' }}
                            className="text-[12px] font-semibold text-white/60
                                       border border-white/14 rounded-lg
                                       hover:text-white/90 hover:border-white/28 transition-all"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            <Link
                                href="/login"
                                style={{ padding: '0.45rem 1.25rem', color: 'white' }}
                                className="hidden sm:flex items-center text-[12px] font-semibold
                                           border border-white/20 rounded-lg hover:border-white/40 transition-all"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                style={{ padding: '0.45rem 1.25rem', boxShadow: '0 1px 12px rgba(59,130,246,0.35)' }}
                                className="flex items-center text-[12px] font-bold
                                           text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
