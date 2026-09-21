import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/Forgotpassword";
import ResetPassword from "./components/Reset";

import axios from "axios";

const API_URL = "https://password-manager-eilg.onrender.com";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  const [authMode, setAuthMode] = useState("signup");

  const [resetToken, setResetToken] = useState("");

  // Verify logged-in user
  const verifyUserToken = async () => {
    const token = localStorage.getItem("token");

    // No token
    if (!token || token === "undefined" || token === "null") {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/verify`, {
        headers: {
          Authorization: token,
        },
      });

      if (res.data && res.data.authenticated) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(
        "Verification failed! Clearing session:",
        error.message
      );

      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // GitHub Pages base path
    const basePath = "/password-manager-";

    // Get current URL path
    let path = window.location.pathname;

    // Remove GitHub Pages base path
    if (path.startsWith(basePath)) {
      path = path.substring(basePath.length);
    }

    // Make sure path starts with /
    if (!path.startsWith("/")) {
      path = "/" + path;
    }

    // Check reset-password URL
    if (path.startsWith("/reset-password/")) {
      const tokenFromUrl = path.split("/reset-password/")[1];

      if (tokenFromUrl) {
        setResetToken(tokenFromUrl);
        setAuthMode("reset");
      }
    }

    verifyUserToken();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAuthMode("login");
  };

  // Login/signup successful
  const handleAuthSuccess = async () => {
    setIsAuthenticated(true);
    setLoading(true);

    await verifyUserToken();
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-medium">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-green-500 animate-pulse">
            &lt;PassOP/&gt;
          </span>

          <p className="text-sm text-slate-400">
            Syncing vault data configurations...
          </p>
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
        <>
          {authMode === "signup" ? (
            <Signup
              onAuthSuccess={handleAuthSuccess}
              switchToLogin={() => setAuthMode("login")}
            />
          ) : authMode === "login" ? (
            <Login
              onAuthSuccess={handleAuthSuccess}
              switchToSignup={() => setAuthMode("signup")}
              switchToForgot={() => setAuthMode("forgot")}
            />
          ) : authMode === "forgot" ? (
            <ForgotPassword
              switchToLogin={() => setAuthMode("login")}
            />
          ) : (
            <ResetPassword
              token={resetToken}
              switchToLogin={() => {
                // Return to home page after reset
                window.history.pushState(
                  {},
                  "",
                  "/password-manager-/"
                );

                setAuthMode("login");
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default App;