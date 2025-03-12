import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import Stars from '../Stars/Stars';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://event-management-backend-gamma.vercel.app/api/auth/login', { email, password, role });
      const { token, role: returnedRole } = response.data;
      console.log(token);

      if (returnedRole !== role) {
        alert('Unauthorized: Incorrect role selected');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/Home');
      } else {
        navigate('/Home');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <>
      <Stars />
      <div className="flex-center" style={{ position:'relative', top:'100px' }}>
        <div className="login-container card p-6" style={{ maxWidth: '450px', width: '100%', maxHeight: '510px', padding:'40px' }}>
          <div className="flex-center mb-2">
            <Lock className="lock-icon" size={40} />
          </div>
          <h2 className="text-center mb-4 login-heading gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit}>

            <div className='mb-2'>
              <label className="label">Role</label>
              <User className="login-user-icon" size={18} />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="options"
                style={{ height: '36px', padding: '4px' }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="label">Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail className="text-gray" style={{ position: 'absolute', left: '10px', top: '37%', transform: 'translateY(-50%)', color:"#7c4dff" }} size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input text-sm"
                  style={{ paddingLeft: '38px', height: '35px' }}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className='mb-2'>
              <label className="label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock className="text-gray" style={{ position: 'absolute', left: '10px', top: '35%', transform: 'translateY(-50%)', color:"#7c4dff" }} size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input text-sm"
                  placeholder="Enter Your Password"
                  style={{ paddingLeft: '38px', height: '35px', paddingRight: '38px' }}
                  required
                />
                {showPassword ? (
                  <EyeOff
                    size={18}
                    style={{ position: 'absolute', right: '10px', top: '35%', transform: 'translateY(-50%)', cursor: 'pointer', color: "#7c4dff" }}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    size={18}
                    style={{ position: 'absolute', right: '10px', top: '35%', transform: 'translateY(-50%)', cursor: 'pointer', color: "#7c4dff" }}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <button type="submit" className="login_btn button button-primary text-center text-sm" style={{ width: '100%', height: '38px' }}>
              Sign in
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray text-sm flex-center" style={{ fontSize: '0.875rem' }}>
              Don't have an account ? {' '}
              <button
              className='signup-btn'
                onClick={() => navigate('/signup')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color:"#7c4dff", position:"relative", left:'2px' }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
