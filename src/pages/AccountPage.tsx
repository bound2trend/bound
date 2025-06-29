import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">You’re not logged in</h2>
          <button
            onClick={() => navigate('/login')}
            className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-800 transition"
          >
            Login to Your Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="bg-white p-6 rounded-md shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Account Info</h2>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Order History</h2>
          <p className="text-gray-600">Your past orders will appear here.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Wishlist</h2>
          <button
            onClick={() => navigate('/wishlist')}
            className="underline text-blue-600 hover:text-blue-800"
          >
            View Wishlist
          </button>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
