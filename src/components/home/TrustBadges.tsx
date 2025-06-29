import React from 'react';
import { ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

const TrustBadges: React.FC = () => {
  return (
    <section className="bg-[#fafafa] py-10">
      <div className="container-custom grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div>
          <Truck className="mx-auto mb-2 text-[#0a1b33]" />
          <p className="font-semibold text-gray-800">Free Shipping Over ₹1499</p>
        </div>
        <div>
          <RefreshCcw className="mx-auto mb-2 text-[#0a1b33]" />
          <p className="font-semibold text-gray-800">Easy 7-Day Returns</p>
        </div>
        <div>
          <ShieldCheck className="mx-auto mb-2 text-[#0a1b33]" />
          <p className="font-semibold text-gray-800">Secure Payment</p>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
