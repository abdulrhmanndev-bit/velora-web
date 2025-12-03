"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
// *************** Heroicons Imports ***************
import {
    UserIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckIcon,
    SparklesIcon, // للزينة
} from "@heroicons/react/24/outline";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [form, setForm] = useState({ Username: "", Password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const [rememberMe, setRememberMe] = useState(false); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        console.log("Remember Me state:", rememberMe);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
                credentials: "include",
            });

            const data = await res.json();
            if (res.ok && data.user) {
                login(data.user);
                router.push("/profile");
            } else {
                setMessage(data.error || "Login failed");
            }
        } catch (err: any) {
            console.error("Login fetch error:", err);
            setMessage("Network error, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex justify-center items-center h-screen bg-black text-white"
            style={{
                backgroundImage: "url('/bg-img/login-signup.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <form 
                onSubmit={handleSubmit} 
                className="
                    bg-[#0A2616] p-10 rounded-[30px] w-96 space-y-5 text-white 
                    shadow-[0_0_50px_rgba(25,255,100,0.6)] border border-green-700/50 
                    transform transition-all duration-300
                "
            >
                
                {/* العنوان والترحيب */}
                <div className="text-center relative pt-2 pb-3 space-y-1">
                    {/* استخدام SparklesIcon كبديل للـ StarIcon */}
                    <SparklesIcon className="w-6 h-6 absolute left-0 top-0 text-green-300 transform -translate-y-1/2"/>
                    <SparklesIcon className="w-6 h-6 absolute right-0 top-0 text-green-300 transform -translate-y-1/2"/>

                    <h2 className="text-3xl font-bold text-center text-green-400 mb-0">Sign in</h2>
                    <p className="text-sm text-green-300/80 mt-1">Welcome Back to The Legendary World of Velora</p>
                </div>

                {/* حقل Username */}
                <div className="relative">
                    {/* استخدام UserIcon */}
                    <UserIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                    <input
                        autoFocus
                        name="Username"
                        placeholder="Username"
                        value={form.Username}
                        onChange={handleChange}
                        className="
                            w-full p-3 pl-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none
                            focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200
                        "
                        required
                    />
                </div>

                {/* حقل Password */}
                <div className="relative mb-4">
                    {/* استخدام LockClosedIcon */}
                    <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                    
                    <input
                        name="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.Password}
                        onChange={handleChange}
                        className="
                            w-full p-3 pl-10 pr-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none
                            focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200
                        "
                        required
                    />
                    
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400/70 cursor-pointer transition duration-200 hover:text-green-300"
                        onClick={toggleShowPassword}
                    >
                        {/* استخدام Eye / EyeSlash Icons */}
                        {showPassword ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                    </span>
                </div>
                
                {/* Checkbox "Remember Me" و Forgot password */}
                <div className="flex justify-between items-center text-sm pt-0 pb-1 text-green-300/80">
                    <label   
                        onClick={() => setRememberMe(!rememberMe)} 
                        htmlFor={"rememberMe"} 
                        className="flex items-center space-x-2 cursor-pointer select-none"
                    >
                        <div 
                            className={`w-4 h-4 rounded border border-green-700 transition-colors flex items-center justify-center 
                                ${rememberMe ? 'bg-green-500 text-black' : 'bg-[#03150A] text-transparent'}`}
                        >
                            {/* استخدام CheckIcon */}
                            {rememberMe && <CheckIcon className="w-3 h-3"/>}
                        </div>
                        <span id="rememberMe">Remember me</span>
                    </label>
                    
                    <Link href="/reset-password" className="text-green-400 hover:text-green-300 text-xs">
                        Forgot password?
                    </Link>
                </div>

                {/* زر الدخول */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`
                        w-full p-3 rounded-md font-semibold text-black transition-all duration-300 ease-in-out mt-6
                        ${loading ? "bg-green-700/50 cursor-not-allowed" : "bg-green-500 hover:bg-green-400 hover:shadow-[0_0_15px_rgba(25,255,100,0.6)]"}
                    `}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {message && <p className="text-red-400 text-center mt-2 text-sm">{message}</p>}

                {/* رابط التسجيل */}
                <div className="text-center pt-2 text-sm text-green-300">
                     Don't have an account? 
                    <Link href="/signup" className="text-green-400 ml-1 font-semibold hover:text-green-300 underline-offset-4 hover:underline">
                        Sign up
                    </Link>
                </div>
                
                {/* حقوق النشر */}
                <div className="text-center pt-8 text-xs text-green-700/50">
                    © Velora SRO — Reborn World
                </div>

            </form>
        </div>
    );
}