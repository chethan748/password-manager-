import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onAuthSuccess, switchToLogin }) => {
    // Core Form State
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
  
    const [error, setError] = useState(""); 

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
        if (error) setError(""); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setError(""); 

        if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
            setLoading(false);  
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/signup/signup', formData, {
                headers: { "Content-Type": "application/json" },
                timeout: 10000 
            });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                onAuthSuccess();
            } else {
                setError('Account created, but no authentication token was issued by the server.');
            }
        } catch (err) {
            console.error("Signup network operation failure:", err);
            const serverMessage = err.response?.data?.message || "Signup failed. Please try again.";
            setError(serverMessage); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-12 relative">
            
            <div className="text-center mb-8 relative z-50">
                <h1 className="text-4xl font-bold font-sans tracking-tight">
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className="text-slate-400 text-sm mt-2">Your secure, encrypted local password vault.</p>
            </div>

            <div className="relative z-50 w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl pointer-events-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide">Create Account</h2>

              
                {error && (
                    <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                 
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition"
                            placeholder="Your vault handle username"
                            required
                        />
                    </div>


                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 relative">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Choose Master Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition"
                                placeholder="••••••••••••"
                                required
                            />
                            <button
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition focus:outline-none"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 relative z-50 bg-green-500 hover:bg-green-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg transition active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-500 flex justify-center items-center cursor-pointer pointer-events-auto"
                    >
                        {loading ? "Connecting to System Server..." : "Register & Create Vault"}
                    </button>
                </form>

                <div className="mt-6 pt-5 border-t border-slate-800 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-green-400 hover:text-green-300 font-medium hover:underline focus:outline-none bg-transparent cursor-pointer"
                    >
                        Login here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;