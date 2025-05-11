import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/common/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-neutral-950 text-white py-12">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            We're here to help! Reach out to us with any questions, feedback, or concerns.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {formStatus === 'success' ? (
              <div className="bg-success/10 border border-success/30 text-success rounded-lg p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <Send size={24} className="text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>
                  Thank you for contacting us. We'll respond to your message as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="return">Return & Refund</option>
                    <option value="account">Account Issues</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={formStatus === 'submitting'}
                    disabled={formStatus === 'submitting'}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Phone size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="text-neutral-600">+1 (234) 567-890</p>
                    <p className="text-neutral-500 text-sm">Mon-Fri, 9am-6pm</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Mail size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-neutral-600">hello@boundfashion.com</p>
                    <p className="text-neutral-500 text-sm">We'll respond as soon as possible</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <MapPin size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                    <p className="text-neutral-600">123 Fashion Street</p>
                    <p className="text-neutral-600">Trendy City, TC 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Our Hours</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
                
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.012 10.012 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.9 4.9 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.935 9.935 0 002.46-2.534l-.047-.02z"></path>
                    </svg>
                  </a>
                  
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                  
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors"
                    aria-label="Youtube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;