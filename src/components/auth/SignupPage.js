import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
import Stars from '../Stars/Stars';
import './SignupPage.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, role };

    try {
      const response = await fetch('https://event-management-backend-gamma.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('Account created successfully! Please login to continue.');
        navigate('/login');
      } else {
        alert(data.error || 'An error occurred, please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong, please try again.');
    }
  };

  return (
    <>
      <Stars />
      <div className="flex-center" style={{ position:'relative', top:'100px' }}>
        <div className="signup-container card p-6" style={{ maxWidth: '450px', width: '100%', maxHeight: '530px', padding: '40px' }}>
          <div className="flex-center mb-2">
            <User className="user-icon" size={35} />
          </div>
          <h2 className="text-center mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Create your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <label className="label">Role</label>
              <User className="text-gray" style={{ position: 'absolute', left: '50px', top: '34.5%', transform: 'translateY(-50%)', color: "#7c4dff" }} size={18} />
              <select className='options' value={role} onChange={(e) => setRole(e.target.value)} style={{ height: '35px', fontSize: '0.875rem', textAlign: 'left' }}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {role === 'admin' && (
              <div>
                <label className="label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User className="text-gray" style={{ position: 'absolute', left: '10px', top: '35%', transform: 'translateY(-50%)' }} size={16} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    style={{ paddingLeft: '35px', height: '35px', fontSize: '0.875rem' }}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="label">Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail className="text-gray" style={{ position: 'absolute', left: '10px', top: '35%', transform: 'translateY(-50%)', color: "#7c4dff" }} size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '35px', height: '35px', fontSize: '0.875rem' }}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {role === 'user' && (
              <div className='mb-2'>
                <label className="label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock className="text-gray" style={{ position: 'absolute', left: '10px', top: '35%', transform: 'translateY(-50%)', color: "#7c4dff" }} size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder='Enter Your Password'
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    style={{ paddingLeft: '35px', height: '35px', fontSize: '0.875rem' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '10px', top: '35%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={18} style={{color: "#7c4dff"}} /> : <Eye size={18} style={{ color: "#7c4dff"}} />}
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="signup_btn button button-primary" style={{ width: '100%', height: '35px', fontSize: '0.875rem' }}>
              Create Account
            </button>
          </form>
          <div className="mt-3 text-center">
            <p className="text-gray flex-center" style={{ fontSize: '0.875rem' }}>
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', position: "relative", top: '1px', left: '2px' }}>
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
