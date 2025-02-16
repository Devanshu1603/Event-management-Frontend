import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to backend
    const userData = { name, email, password, role };

    try {
      const response = await fetch('http://localhost:5555/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Success
        if (role === 'admin') {
          alert('Account created successfully! Your Account details have been sent to your E-mail. Please login to continue.');
          navigate('/login');
        } else {
          alert('Account created successfully! Please login to continue.');
          navigate('/login');
        }
      } else {
        // Error
        alert(data.error || 'An error occurred, please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex-center">
      <div className="card p-6" style={{ maxWidth: '430px', width: '100%', maxHeight: '530px' }}>
        <div className="flex-center mb-2">
          <User className="text-primary" size={35} />
        </div>
        <h2 className="text-center mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Create your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ height: '35px', fontSize: '0.875rem', textAlign: 'left' }}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {role === 'admin' && (
            <>
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
            </>
          )}

          <div>
            <label className="label">Email address</label>
            <div style={{ position: 'relative' }}>
              <Mail className="text-gray" style={{ position: 'absolute', left: '10px', top: '35%', transform: 'translateY(-50%)' }} size={16} />
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
            <div>
              <label className="label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock className="text-gray" style={{ position: 'absolute', left: '10px', top: '35%', transform: 'translateY(-50%)' }} size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '30px', height: '35px', fontSize: '0.875rem' }}
                  required
                />
              </div>
            </div>
          )}

          <button type="submit" className="button button-primary" style={{ width: '100%', height: '35px', fontSize: '0.875rem' }}>
            Create Account
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="text-gray" style={{ fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
