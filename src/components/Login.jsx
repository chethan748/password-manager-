import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = "http://localhost:5000";

// 1. Added switchToForgot to the destructured props
const Login = ({ onAuthSuccess, switchToSignup, switchToForgot }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setloading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setloading(true);
        
        try {
            const res = await axios.post(`${api}/api/login/login`, {
                email: form.email,
                password: form.password
            });

            localStorage.setItem("token", res.data.token);
            toast.success("Login Successful");

            setTimeout(() => {
                onAuthSuccess();
            }, 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
            setloading(false); 
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-12">
            <ToastContainer theme="dark" transition={Zoom} />

            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight">
                    <span className="text-green-500">&lt;</span>Pass<span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className="text-slate-400 text-sm mt-2">Your secure, encrypted local password vault.</p>
            </div>

            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-green-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Master Password</label>
                            
                           
                            <button
                                type="button"
                                onClick={switchToForgot}
                                className="text-xs text-green-400 hover:underline font-medium focus:outline-none"
                            >
                                Forgot?
                            </button>
                        </div>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••••••"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-green-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 hover:bg-green-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg transition active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-500"
                    >
                        {loading ? "Authenticating..." : "Login to Vault"}
                    </button>
                </form>

                <div className="mt-6 pt-5 border-t border-slate-800 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <button onClick={switchToSignup} className="text-green-400 hover:underline font-medium">
                        Create an account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;