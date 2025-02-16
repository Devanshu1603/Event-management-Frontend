import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');  // Default role set to 'user'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/api/auth/login', { email, password, role });
      const { token, role: returnedRole } = response.data;
      console.log(token);

      if (returnedRole !== role) {
        alert('Unauthorized: Incorrect role selected');
        return;
      }

      // Store token and role in localStorage for authentication
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      console.log(localStorage);

      // Redirect user based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex-center">
      <div className="card p-6" style={{ maxWidth: '400px', width: '100%', maxHeight: '500px' }}>
        <div className="flex-center mb-2">
          <Lock className="text-primary" size={40} />
        </div>
        <h2 className="text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit}>

          {/* Role Selection */}
          <div>
            <label className="label">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input text-sm"
              style={{ height: '36px', padding: '4px' }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email Input */}
          <div>
            <label className="label">Email address</label>
            <div style={{ position: 'relative' }}>
              <Mail className="text-gray" style={{ position: 'absolute', left: '10px', top: '37%', transform: 'translateY(-50%)' }} size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input text-sm"
                style={{ paddingLeft: '35px', height: '35px' }}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock className="text-gray" style={{ position: 'absolute', left: '10px', top: '35%', transform: 'translateY(-50%)' }} size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input text-sm"
                style={{ paddingLeft: '35px', height: '35px' }}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="button button-primary text-center text-sm" style={{ width: '100%', height: '38px' }}>
            Sign in
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-primary"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
