import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FaqPage: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const faqItems: FaqItem[] = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and navigating to the "Orders" section. There, you\'ll find tracking information for all your recent orders. Alternatively, you can use the tracking link sent to your email after your order has been shipped.',
      category: 'orders'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 10-day return policy. Items must be in their original condition with tags attached. To initiate a return, log into your account, go to your orders, and select the "Return" option for the relevant item. Once we receive the item, we\'ll process your refund within 5-7 business days.',
      category: 'returns'
    },
    {
      question: 'How does the FitRoom virtual try-on feature work?',
      answer: 'Our FitRoom feature lets you see how clothes look before buying. You can either choose a model with a similar build to yours, or upload your own photo. Navigate to the FitRoom section, select a product, and follow the instructions to see how it looks.',
      category: 'features'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards (Visa, Mastercard, American Express), PayPal, and Cash on Delivery (COD) for orders under ₹5000. For international orders, we only accept credit cards and PayPal.',
      category: 'payment'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 5-7 business days within India. Express shipping takes 2-3 business days. International shipping can take 10-15 business days depending on the destination country. You can select your preferred shipping method during checkout.',
      category: 'shipping'
    },
    {
      question: 'Are the product sizes true to fit?',
      answer: 'We follow standard Indian sizing, but we recommend checking our size guide on each product page for specific measurements. The FitRoom feature can also help you visualize how an item will fit before purchasing.',
      category: 'product'
    },
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking on the user icon in the top right corner and selecting "Create Account". Fill in your email and password, and you\'re all set! You can also sign up during checkout.',
      category: 'account'
    },
    {
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it. After that, the order goes into processing and cannot be changed. To request a modification or cancellation, please contact our customer service team immediately.',
      category: 'orders'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination. You can see the shipping options available to your country during checkout.',
      category: 'shipping'
    },
    {
      question: 'How do I care for my BOUND clothes?',
      answer: 'Each item comes with specific care instructions on the label. Generally, we recommend washing in cold water, avoiding bleach, and air drying when possible to maintain the quality and longevity of your garments.',
      category: 'product'
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'orders', name: 'Orders' },
    { id: 'shipping', name: 'Shipping' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'product', name: 'Product Information' },
    { id: 'payment', name: 'Payment' },
    { id: 'account', name: 'Account' },
    { id: 'features', name: 'Features' }
  ];
  
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };
  
  const filteredFaqs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-neutral-950 text-white py-12">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-12">
        {/* Category Nav */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.map((item, index) => (
              <div 
                key={index} 
                className="border border-neutral-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  className="flex items-center justify-between w-full text-left px-6 py-4 bg-white hover:bg-neutral-50"
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-medium">{item.question}</span>
                  {openItem === index ? (
                    <ChevronUp size={20} className="text-neutral-500" />
                  ) : (
                    <ChevronDown size={20} className="text-neutral-500" />
                  )}
                </button>
                
                {openItem === index && (
                  <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
                    <p className="text-neutral-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Contact Section */}
          <div className="mt-12 text-center py-8 px-6 bg-neutral-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
            <p className="text-neutral-600 mb-6">
              Can't find the answer you're looking for? Please contact our customer support team.
            </p>
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;