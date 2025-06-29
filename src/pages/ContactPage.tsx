import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // TODO: Connect with backend / Firebase function here
        // Example:
        // await sendContactForm(form);

        // Simulate success
        setTimeout(() => {
          setSuccessMessage('Thank you for contacting us! We will get back to you shortly.');
          setForm({ name: '', email: '', subject: '', message: '' });
          setIsSubmitting(false);
        }, 1500);
      } catch (error) {
        setErrors({ submit: 'Failed to send message. Please try again later.' });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 mt-1 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 mt-1 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block font-medium mb-1">
            Subject<span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.subject}
            aria-describedby="subject-error"
          />
          {errors.subject && (
            <p id="subject-error" className="text-red-500 mt-1 text-sm">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block font-medium mb-1">
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.message}
            aria-describedby="message-error"
          />
          {errors.message && (
            <p id="message-error" className="text-red-500 mt-1 text-sm">
              {errors.message}
            </p>
          )}
        </div>

        {errors.submit && (
          <p className="text-red-600 font-medium">{errors.submit}</p>
        )}

        {successMessage && (
          <p className="text-green-600 font-medium">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <section className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Connect with us on social media</h2>
        <div className="flex justify-center space-x-6 text-indigo-600">
          <a
            href="https://facebook.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-indigo-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a10 10 0 0010 10v-7h-3v-3h3v-2c0-3.1 2-5 5-5 1.4 0 2.7.1 3 .1v3h-2c-1.3 0-1.7.6-1.7 1.5v2h3l-.5 3h-2.5v7a10 10 0 0010-10z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
