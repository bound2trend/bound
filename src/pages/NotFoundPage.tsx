import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="container-custom text-center py-16">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-neutral-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;