import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Inputs';
import Button from '../components/Buttons';
import { useAppContext } from '../context/AppContext';

const UserManagements: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email === email && user.password === password) {
      login(); 
      navigate('/books'); 
      setEmail('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-cyan-700 mb-6 text-center">Login</h1>
        <div className="space-y-6">
          <div className="relative mb-4">
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error} 
            />
          </div>
          <div className="relative mb-4">
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}  
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex justify-center">
            <Button
              type="button"
              text="Login"
              onClick={handleLogin}
              className="bg-cyan-500 text-white hover:bg-cyan-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagements;
