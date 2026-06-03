import { useState } from 'react';
import axios from 'axios';

// We receive 'token' and 'switchToLogin' directly as props from App.jsx!
export default function Reset({ token, switchToLogin }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // We use the 'token' prop directly in the backend URL path
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      
      // Instead of navigate('/login'), we call our state switcher prop after 3 seconds
      setTimeout(() => {
        switchToLogin();
      }, 3000); 
    } catch (err) {
      setMessage(err.response?.data?.message || 'Token is invalid or has expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-slate-900 p-8 rounded-lg shadow-md border border-slate-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-500">&lt;Reset Password/&gt;</h2>
        
        <div className="mb-4">
          <label className="block text-sm text-slate-400 mb-2">New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-green-500 transition-colors"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm text-slate-400 mb-2">Confirm New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-green-500 transition-colors"
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-slate-950 font-bold p-3 rounded transition duration-200"
        >
          {loading ? 'Updating Password...' : 'Update Password'}
        </button>
        
        {message && (
          <p className="mt-4 text-center text-sm text-green-400 bg-slate-800 border border-slate-700 p-2 rounded">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}