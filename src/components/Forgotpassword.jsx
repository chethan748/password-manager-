// src/components/ForgotPassword.jsx
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
    
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      // Catches errors like "This is not a registered user."
      setMessage(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-400 mb-4 text-center">
          Enter your email and we'll send you a link to reset your password.
        </p>
        
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500 transition-colors"
          required
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-white font-bold p-3 rounded transition duration-200"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        
        {message && <p className="mt-4 text-center text-sm text-gray-300 bg-gray-700 p-2 rounded">{message}</p>}
      </form>
    </div>
  );
}