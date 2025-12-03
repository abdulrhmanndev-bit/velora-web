"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// *************** Heroicons Imports ***************
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    KeyIcon, // للـ Secret Code
    SparklesIcon, // للزينة
} from "@heroicons/react/24/outline";

export default function ResetPasswordPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        Username: "",
        Email: "",
        SecretCode: "",
        NewPassword: "",
        ConfirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    
    // حالات عرض/إخفاء كلمة المرور
    const [showNewPassword, setShowNewPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(prev => !prev);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setIsSuccess(null);

        // Client-side validation
        if (form.NewPassword !== form.ConfirmPassword) {
            setMessage("New password and confirmation do not match.");
            setIsSuccess(false);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message || "Password reset successful");
                setIsSuccess(true);
                setForm({ Username: "", Email: "", SecretCode: "", NewPassword: "", ConfirmPassword: "" });

                // ✅ Redirect to /login after 1.5 seconds
                setTimeout(() => {
                    router.push("/login");
                }, 1500); // زدنا الوقت قليلاً لتظهر رسالة النجاح
            } else {
                setMessage(data.error || "Reset failed");
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
                {/* العنوان */}
                <div className="text-center relative pt-2 pb-3 space-y-1 mb-6">
                    <SparklesIcon className="w-6 h-6 absolute left-0 top-0 text-green-300 transform -translate-y-1/2"/>
                    <SparklesIcon className="w-6 h-6 absolute right-0 top-0 text-green-300 transform -translate-y-1/2"/>

                    <h2 className="text-3xl font-bold text-center text-green-400 mb-0">Reset Password</h2>
                    <p className="text-sm text-green-300/80 mt-1">Verify your identity and set a new password</p>
                </div>

                {/* حقل Username */}
                <div className="relative">
                    <UserIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                    <input
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
                        placeholder="Email"
                        value={form.Email}
                        onChange={handleChange}
                        className="
                            w-full p-3 pl-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none
                            focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200
                        "
                        required
                    />
                </div>

                {/* حقل Secret Code */}
                <div className="relative">
                    <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                    <input
                        name="SecretCode"
                        placeholder="Secret Code"
                        value={form.SecretCode}
                        onChange={handleChange}
                        className="
                            w-full p-3 pl-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none
                            focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200
                        "
                        required
                    />
                </div>
                
                {/* خط فاصل */}
                <div className="w-full h-px bg-green-700/50 my-4"></div>

                {/* حقل New Password */}
                <div className="relative">
                    <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="NewPassword"
                        placeholder="New Password"
                        value={form.NewPassword}
                        onChange={handleChange}
                        className="
                            w-full p-3 pl-10 pr-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none
                            focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200
                        "
                        required
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400/70 cursor-pointer transition duration-200 hover:text-green-300"
                        onClick={toggleShowNewPassword}
                    >
                        {showNewPassword ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                    </span>
                </div>

                {/* حقل Confirm Password */}
                <div className="relative">
                    <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="ConfirmPassword"
                        placeholder="Confirm New Password"
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
                        {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                    </span>
                </div>

                {/* زر إعادة التعيين */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`
                        w-full p-3 rounded-md font-semibold text-black transition-all duration-300 ease-in-out mt-6
                        ${loading ? "bg-green-700/50 cursor-not-allowed" : "bg-green-500 hover:bg-green-400 hover:shadow-[0_0_15px_rgba(25,255,100,0.6)]"}
                    `}
                >
                    {loading ? "Processing..." : "Reset Password"}
                </button>

                {/* رسالة الخطأ/النجاح */}
                {message && (
                    <p className={`mt-3 text-center text-sm ${isSuccess ? "text-green-400" : "text-red-400"}`}>
                        {message}
                    </p>
                )}
                
                {/* حقوق النشر */}
                <div className="text-center pt-5 text-xs text-green-700/50">
                    © Velora SRO — Reborn World
                </div>

            </form>
        </div>
    );
}