import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 px-6 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-neutral-900">404</h1>
      <p className="mt-4 text-lg md:text-xl text-neutral-600">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800 transition"
      >
        Back to Home
      </Link>

      <p className="mt-10 text-sm text-neutral-500">
        Need help? <a href="/contact" className="underline">Contact us</a>
      </p>
    </main>
  );
};

export default NotFoundPage;
