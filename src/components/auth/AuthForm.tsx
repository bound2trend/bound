import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useAuthStore } from '../../store/authStore';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { login, register, isLoading, error } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // Validate password
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }
    
    if (type === 'register') {
      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        return;
      }
      
      try {
        await register(email, password);
      } catch (err: any) {
        setFormError(err.message || 'Registration failed');
      }
    } else {
      try {
        await login(email, password);
      } catch (err: any) {
        setFormError(err.message || 'Login failed');
      }
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {type === 'register' && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        
        {(formError || error) && (
          <div className="mb-4 text-error text-sm">
            {formError || error}
          </div>
        )}
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
        >
          {type === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <Link 
            to={type === 'login' ? '/register' : '/login'} 
            className="text-primary font-medium hover:underline"
          >
            {type === 'login' ? 'Create Account' : 'Sign In'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
