import React from 'react';

const TrustBadges: React.FC = () => {
  return (
    <div className="flex justify-around py-6 bg-white border-t border-b">
      <div className="text-center">
        <p className="font-semibold">Free Shipping</p>
        <p className="text-sm text-gray-500">On orders above ₹999</p>
      </div>
      <div className="text-center">
        <p className="font-semibold">Secure Payment</p>
        <p className="text-sm text-gray-500">100% Payment Protection</p>
      </div>
      <div className="text-center">
        <p className="font-semibold">Easy Returns</p>
        <p className="text-sm text-gray-500">7-day return policy</p>
      </div>
    </div>
  );
};

export default TrustBadges;
