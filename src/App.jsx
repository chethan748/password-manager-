import { useState, useEffect } from 'react';
import React from "react";
import './App.css';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';
import Signup from './components/signup';
import Login from './components/Login'; 
import ForgotPassword from './components/Forgotpassword'; // IMPORT THESE
import ResetPassword from './components/Reset';   // NEW COMPONENTS
import axios from "axios";

const App = () => {   
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    
    // 1. Updated state to handle forgot and reset modes too
    const [authMode, setAuthMode] = useState('signup'); 
    const [resetToken, setResetToken] = useState(''); // Stores token if user arrives via link

    const verifyUserToken = async () => {
        const token = localStorage.getItem("token");

        if (!token || token === "undefined" || token === "null") {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get("http://localhost:5000/verify", {
                headers: {
                    "Authorization": token 
                }
            });

            if (res.data && res.data.authenticated) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Verification failed! Clearing session:", error.message);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 2. CHECK URL FOR RESET TOKEN PATH
        // If your email sends a link like: http://localhost:5173/reset-password/abcd123
        const path = window.location.pathname; 
        if (path.startsWith('/reset-password/')) {
            const tokenFromUrl = path.split('/reset-password/')[1];
            if (tokenFromUrl) {
                setResetToken(tokenFromUrl);
                setAuthMode('reset'); // Jump straight into reset view!
            }
        }

        verifyUserToken();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    const handleAuthSuccess = async () => {
        setIsAuthenticated(true);
        setLoading(true); 
        await verifyUserToken(); 
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-medium">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-xl font-bold tracking-tight text-green-500 animate-pulse">
                        &lt;PassOP/&gt;
                    </span>
                    <p className="text-sm text-slate-400">Syncing vault data configurations...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {isAuthenticated ? (
                <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
                    <div>
                        <Navbar onLogout={handleLogout} />
                        <Manager token={localStorage.getItem("token")} />
                    </div>
                    <Footer />
                </div>
            ) : (
                /* 3. EXPANDED CONDITIONAL RENDERING LOGIC */
                authMode === 'signup' ? (
                    <Signup 
                        onAuthSuccess={handleAuthSuccess} 
                        switchToLogin={() => setAuthMode('login')} 
                    />
                ) : authMode === 'login' ? (
                    <Login 
                        onAuthSuccess={handleAuthSuccess} 
                        switchToSignup={() => setAuthMode('signup')} 
                        switchToForgot={() => setAuthMode('forgot')} // Hand pass action to login component
                    />
                ) : authMode === 'forgot' ? (
                    <ForgotPassword 
                        switchToLogin={() => setAuthMode('login')}
                    />
                ) : (
                    <ResetPassword 
                        token={resetToken} // Pass token down as a prop instead of useParams()
                        switchToLogin={() => {
                            window.history.pushState({}, '', '/'); // Clean up URL bar browser route
                            setAuthMode('login');
                        }}
                    />
                )
            )}  
        </>
    );
};

export default App;