'use client';
import { isAuthenticated, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setIsAuth(isAuthenticated());
    }, []);
    const handleLogout = () => {
        removeToken();
        router.push("/login");
    }
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">TSA</Link>
                    </li>
                    {isAuth ? (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    ) : (
                        <>
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;