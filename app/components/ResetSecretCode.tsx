"use client";
import { useState } from "react";
import { 
    EnvelopeIcon, 
    EyeIcon, 
    EyeSlashIcon, 
    KeyIcon,
    LockClosedIcon
} from "@heroicons/react/24/outline";

export default function ResetSecretCode() {
    const [form, setForm] = useState({
        Email: "",
        CurrentPassword: "",   // ← حقل جديد
        NewSecretCode: "",
    });
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setSuccess(null);

        try {
            const res = await fetch("/api/reset-secret-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form), // ← شامل CurrentPassword
            });
            const data = await res.json();
            
            if (res.ok) {
                setMessage(data.message || "Secret code reset successfully");
                setSuccess(true);
                setForm({ Email: "", CurrentPassword: "", NewSecretCode: "" });
            } else {
                setMessage(data.error || "Reset failed");
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
            className="mt-4 max-w-md w-full bg-[#0A2616] p-6 rounded-xl shadow-[0_0_20px_rgba(25,255,100,0.8)] space-y-4 text-white border border-green-700/50"
        >
            <h3 className="text-xl font-bold text-green-400 border-b border-green-700/50 pb-2">Reset Secret Code</h3>

            {/* Email */}
            <div className="relative">
                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                <input
                    name="Email"
                    placeholder="Email"
                    value={form.Email}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200"
                    required
                />
            </div>
            
{/* Current Password */}
<div className="relative">
  <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
  
  <input
    type={showPassword ? "text" : "password"}
    name="CurrentPassword"
    placeholder="Current Password"
    value={form.CurrentPassword}
    onChange={handleChange}
    className="w-full p-3 pl-10 pr-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200"
    required
  />

  {/* Show/Hide Button */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400/70"
  >
    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
  </button>
</div>

            
            {/* New Secret Code */}
            <div className="relative">
                <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/70" />
                <input
                    name="NewSecretCode"
                    placeholder="New Secret Code"
                    value={form.NewSecretCode}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 rounded-lg bg-[#03150A] text-green-200 border-2 border-transparent outline-none focus:border-green-500/70 focus:shadow-[0_0_10px_rgba(25,255,100,0.3)] transition duration-200"
                    required
                />
            </div>
            
            <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 rounded-md font-semibold text-black transition-all duration-300 ease-in-out mt-4 ${
                    loading ? "bg-green-700/50 cursor-not-allowed" : "bg-green-500 hover:bg-green-400 hover:shadow-[0_0_15px_rgba(25,255,100,0.6)]"
                }`}
            >
                {loading ? "Updating..." : "Reset Secret Code"}
            </button>
            
            {message && <p className={`mt-2 text-center text-sm ${success ? "text-green-400" : "text-red-400"}`}>{message}</p>}
        </form>
    );
}
