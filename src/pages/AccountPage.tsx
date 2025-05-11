import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { 
  User, Package, Heart, LogOut, CreditCard, MapPin 
} from 'lucide-react';
import Button from '../components/common/Button';
import { useAuthStore } from '../store/authStore';

type AccountTab = 'orders' | 'profile' | 'addresses' | 'wishlist' | 'payment';

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');
  const { user, logout } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-neutral-50">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <div className="ml-3">
                  <p className="font-medium">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user.email
                    }
                  </p>
                  <p className="text-sm text-neutral-500">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                    activeTab === 'profile' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={18} className="mr-3" />
                  Profile
                </button>
                
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                    activeTab === 'orders' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package size={18} className="mr-3" />
                  Orders
                </button>
                
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                    activeTab === 'addresses' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <MapPin size={18} className="mr-3" />
                  Addresses
                </button>
                
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                    activeTab === 'payment' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('payment')}
                >
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </button>
                
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                    activeTab === 'wishlist' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </button>
                
                <button
                  className="w-full flex items-center px-3 py-2 rounded-md text-left text-neutral-700 hover:bg-neutral-100"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                          defaultValue={user.firstName || ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                          defaultValue={user.lastName || ''}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                        defaultValue={user.email}
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                        defaultValue={user.phone || ''}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="primary">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                  
                  <div className="mt-8 pt-8 border-t border-neutral-200">
                    <h3 className="text-lg font-semibold mb-4">Password</h3>
                    
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                          Current Password
                        </label>
                        <input
                          id="currentPassword"
                          type="password"
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                        />
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="primary">
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">My Orders</h2>
                  
                  <div className="border border-neutral-200 rounded-md overflow-hidden">
                    <div className="flex flex-col">
                      <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-3 text-sm font-medium">
                        <div className="grid grid-cols-4 gap-4">
                          <div>Order</div>
                          <div>Date</div>
                          <div>Status</div>
                          <div>Total</div>
                        </div>
                      </div>
                      
                      <div className="divide-y divide-neutral-200">
                        {/* Empty state */}
                        <div className="px-4 py-8 text-center">
                          <Package size={48} className="mx-auto text-neutral-300 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                          <p className="text-neutral-600 mb-6">
                            When you place an order, it will appear here
                          </p>
                          <Link to="/shop">
                            <Button variant="primary">
                              Start Shopping
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">My Addresses</h2>
                    <Button variant="primary">
                      Add New Address
                    </Button>
                  </div>
                  
                  {/* Empty state */}
                  <div className="border border-dashed border-neutral-300 rounded-lg p-8 text-center">
                    <MapPin size={48} className="mx-auto text-neutral-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No addresses yet</h3>
                    <p className="text-neutral-600 mb-6">
                      Add your shipping and billing addresses for a faster checkout experience
                    </p>
                    <Button variant="primary">
                      Add New Address
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'payment' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Payment Methods</h2>
                    <Button variant="primary">
                      Add Payment Method
                    </Button>
                  </div>
                  
                  {/* Empty state */}
                  <div className="border border-dashed border-neutral-300 rounded-lg p-8 text-center">
                    <CreditCard size={48} className="mx-auto text-neutral-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No payment methods yet</h3>
                    <p className="text-neutral-600 mb-6">
                      Save your payment methods for a faster checkout experience
                    </p>
                    <Button variant="primary">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
                  
                  <Link to="/wishlist" className="w-full">
                    <Button variant="primary" fullWidth>
                      <Heart size={16} className="mr-2" />
                      View My Wishlist
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;