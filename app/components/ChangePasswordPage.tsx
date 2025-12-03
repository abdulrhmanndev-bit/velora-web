"use client";
import { useState } from "react";
import { 
    EnvelopeIcon, 
    LockClosedIcon, 
    KeyIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";

interface Props {
    email: string;
}

export default function ChangePassword({ email }: Props) {
    const [form, setForm] = useState({
        Email: email || '', // يبدأ بقيمة الـ prop ولكن يجب أن يكون قابل للتعديل حسب متطلباتك
        SecretCode: "",
        NewPassword: "",
        ConfirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    
    const [showNewPassword, setShowNewPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    
    const toggleShowNewPassword = () => setShowNewPassword(prev => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setSuccess(null);

        if (form.NewPassword !== form.ConfirmPassword) {
            setMessage("New password and confirmation do not match.");
            setSuccess(false);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage(data.message || "Password changed successfully");
                setSuccess(true);
                // Clear password fields and secret code
                setForm(prev => ({ ...prev, NewPassword: "", ConfirmPassword: "", SecretCode: "" })); 
            } else {
                setMessage(data.error || "Change failed");
                setSuccess(false);
            }
        } catch (err) {
            console.error(err);
            setMessage("Server error");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="
                mt-4 max-w-md w-full 
                bg-[#0A2616] p-6 rounded-xl shadow-[0_0_20px_rgba(25,255,100,0.8)] 
                space-y-4 text-white border border-green-700/50
            "
        >
            <h3 className="text-xl font-bold text-green-400 border-b border-green-700/50 pb-2">Change Password</h3>

            {/* Email (تصحيح: أصبح قابلًا للتعديل - required) */}
            <div className="relative">
                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                <input 
                    name="Email" 
                    placeholder="Email" // تم إعادة الـ Placeholder
                    value={form.Email} 
                    onChange={handleChange} 
                    className="
                        w-full p-3 pl-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none
                        focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200
                    " 
                    required 
                />
            </div>
            
            {/* Secret Code */}
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
            
            {/* New Password */}
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
                    {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </span>
            </div>
            
            {/* Confirm Password */}
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
                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </span>
            </div>
            
            <button 
                type="submit" 
                disabled={loading} 
                className={`
                    w-full p-3 rounded-md font-semibold text-black transition-all duration-300 ease-in-out mt-4
                    ${loading 
                        ? "bg-green-700/50 cursor-not-allowed" 
                        : "bg-green-500 hover:bg-green-400 hover:shadow-[0_0_15px_rgba(25,255,100,0.6)]"
                    }
                `}
            >
                {loading ? "Changing..." : "Change Password"}
            </button>
            
            {message && <p className={`mt-2 text-center text-sm ${success ? "text-green-400" : "text-red-400"}`}>{message}</p>}
        </form>
    );
}