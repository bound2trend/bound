import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuthStore } from '../store/authStore';

const RegisterPage: React.FC = () => {
  const { user } = useAuthStore();
  
  if (user) {
    return <Navigate to="/account" replace />;
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md p-4">
        <AuthForm type="register" />
      </div>
    </div>
  );
};

export default RegisterPage;