"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
// *************** Heroicons Imports ***************
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckIcon,
    SparklesIcon, // للزينة
    KeyIcon // للـ Secret Code
} from "@heroicons/react/24/outline";


export default function SignupPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [form, setForm] = useState({
        Username: "",
        Password: "",
        ConfirmPassword: "",
        Email: "",
        AgreeRules: false,
        SecretCode: "",
    });

    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    
    // حالات عرض/إخفاء كلمة المرور
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    // 🔥 Get real public IPv4
    const getPublicIPv4 = async () => {
        try {
            const res = await fetch("https://api.ipify.org?format=json");
            const data = await res.json();
            return data.ip; // IPv4
        } catch (err) {
            console.error("Failed to get public IP:", err);
            return "0.0.0.0";
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setMessage("");
        setIsSuccess(null);
        setLoading(true);

        // Validation based on UI (ensure passwords match and rules are agreed upon)
        if (form.Password !== form.ConfirmPassword) {
            setMessage("Passwords do not match!");
            setIsSuccess(false);
            setLoading(false);
            return;
        }

        if (!form.AgreeRules) {
            setMessage("You must agree to the game rules.");
            setIsSuccess(false);
            setLoading(false);
            return;
        }

        try {
            const ip = await getPublicIPv4(); // get IPv4 from client

            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, reg_ip: ip }),
            });

            const data = await res.json();

            if (res.status === 200) {
                setMessage(data.message || "Signup successful");
                setIsSuccess(true);
                login(data.user); // add user to global context
                router.replace("/profile"); // redirect
            } else {
                setMessage(data.error || "Signup failed");
                setIsSuccess(false);
            }
        } catch (err) {
            console.error(err);
            setMessage("Server error");
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-white p-4"  style={{
            backgroundImage: "url('/bg-img/login-signup.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <form
                onSubmit={handleSubmit}
                className="
                    bg-[#0A2616] p-8 rounded-[30px] w-full max-w-sm space-y-4 text-white 
                    shadow-[0_0_50px_rgba(25,255,100,0.6)] border border-green-700/50 
                    transform transition-all duration-300
                "
            >
                {/* العنوان والترحيب */}
                <div className="text-center relative pt-2 pb-3 space-y-1">
                    {/* استخدام SparklesIcon كبديل للـ StarIcon */}
                    <SparklesIcon className="w-6 h-6 absolute left-0 top-0 text-green-300 transform -translate-y-1/2"/>
                    <SparklesIcon className="w-6 h-6 absolute right-0 top-0 text-green-300 transform -translate-y-1/2"/>

                    <h2 className="text-3xl font-bold text-center text-green-400 mb-0">Create Your Account</h2>
                    <p className="text-sm text-green-300/80 mt-1">Join the legendary world of Velora</p>
                </div>

                {/* حقل Username */}
                <div className="relative">
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

                {/* حقل Email */}
                <div className="relative">
                    <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                    <input
                        name="Email"
                        placeholder="Email Address"
                        value={form.Email}
                        onChange={handleChange}
                        className="
                            w-full p-3 pl-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none
                            focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200
                        "
                        required
                    />
                </div>

                {/* حقل Password */}
                <div className="relative">
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
                        {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </span>
                </div>

                {/* حقل Confirm Password */}
                <div className="relative">
                    <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                    <input
                        name="ConfirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={form.ConfirmPassword}
                        onChange={handleChange}
                        className="
                            w-full p-3 pl-10 pr-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none
                            focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200
                        "
                        required
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400/70 cursor-pointer transition duration-200 hover:text-green-300"
                        onClick={toggleShowConfirmPassword}
                    >
                        {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </span>
                </div>

                {/* حقل Secret Code */}
                 <div className="relative">
                    <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                    <input
                        name="SecretCode"
                        placeholder="Secret Code (Required)"
                        value={form.SecretCode}
                        onChange={handleChange}
                        className="
                            w-full p-3 pl-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none
                            focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200
                        "
                        required // ✅ جعل الحقل مطلوبًا
                    />
                </div>

                {/* ملاحظة هامة */}
                <p className="text-xs text-yellow-300/80 bg-[#03150A] p-3 rounded-lg border border-yellow-700/50">
                    <span className="font-bold text-yellow-400">NOTE:</span> The **Email** and **Secret Code** are essential for password and identity recovery. **Please save them securely.**
                </p>


                {/* Checkbox "I agree to the game rules" */}
                <label 
                    htmlFor="AgreeRules" 
                    className="flex items-center space-x-2 cursor-pointer select-none text-sm text-green-300/80 pt-1"
                    onClick={() => setForm(prev => ({ ...prev, AgreeRules: !prev.AgreeRules }))}
                >
                    {/* Checkbox محاكاة */}
                    <div
                        className={`w-4 h-4 rounded border border-green-700 transition-colors flex items-center justify-center 
                                ${form.AgreeRules ? 'bg-green-500 text-black' : 'bg-[#03150A] text-transparent'}`}
                    >
                        {/* استخدام CheckIcon من Heroicons */}
                        {form.AgreeRules && <CheckIcon className="w-3 h-3"/>}
                    </div>

                    <span id="AgreeRules">I agree to the <Link href="/rules" target="_blank" className="text-green-400 hover:text-green-300 underline font-semibold">game rules</Link></span>
                </label>


                {/* زر التسجيل (Signup Button) */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`
                        w-full p-3 rounded-md font-semibold text-black transition-all duration-300 ease-in-out mt-6
                        ${
                            loading
                                ? "bg-green-700/50 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-400 hover:shadow-[0_0_15px_rgba(25,255,100,0.6)]"
                        }
                    `}
                >
                    {loading ? "Joining Velora World..." : "✨ Join Velora World"}
                </button>

                {/* رسالة الخطأ/النجاح */}
                {message && (
                    <p className={`text-center mt-2 text-sm ${isSuccess ? "text-green-400" : "text-red-400"}`}>
                        {message}
                    </p>
                )}
                
                {/* رابط Login */}
                <div className="text-center pt-2 text-sm text-green-300">
                    Already have an account?
                    <Link href="/login" className="text-green-400 ml-1 font-semibold hover:text-green-300 underline-offset-4 hover:underline">
                        Login
                    </Link>
                </div>

                {/* ملاحظة مهمة (Footer Text) */}
                <div className="text-center pt-5 text-xs text-green-700/50">
                    © Velora SRO — Reborn World
                </div>
            </form>
        </div>
    );
}