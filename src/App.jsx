import { useState, useEffect } from 'react';
import React from "react";
import './App.css';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';
import Signup from './components/signup';
import Login from './components/login'; 
import axios from "axios";

const App = () => {   
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const [loading, setLoading] = useState(true);
    const [authMode, setAuthMode] = useState('signup'); 

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

    // FIXED: Blocks rendering entirely until the initial background check settles
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
                authMode === 'signup' ? (
                    <Signup 
                        onAuthSuccess={handleAuthSuccess} 
                        switchToLogin={() => setAuthMode('login')} 
                    />
                ) : (
                    <Login 
                        onAuthSuccess={handleAuthSuccess} 
                        switchToSignup={() => setAuthMode('signup')} 
                    />
                )
            )}  
        </>
    );
};

export default App;