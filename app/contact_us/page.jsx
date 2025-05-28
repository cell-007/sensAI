"use client";

import { useState } from 'react';
import { 
  Sparkles,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  X,
  AlertCircle
} from "lucide-react";

function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xgvkgzkq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setToastType('success');
        setShowToast(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
      
      // Auto-hide toast after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white mt-10 mb-20 rounded-lg relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className={`${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80`}>
            {toastType === 'success' ? (
              <CheckCircle className="h-6 w-6 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-6 w-6 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="font-semibold">
                {toastType === 'success' ? 'Message Sent Successfully!' : 'Error Sending Message'}
              </p>
              <p className={`text-sm ${toastType === 'success' ? 'text-green-100' : 'text-red-100'}`}>
                {toastType === 'success' ? "We'll get back to you soon." : 'Please check all fields and try again.'}
              </p>
            </div>
            <button 
              onClick={closeToast}
              className={`${toastType === 'success' ? 'text-green-100 hover:text-white' : 'text-red-100 hover:text-white'} transition-colors`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Contact Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-in fade-in duration-1000">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-in fade-in duration-1000 delay-200">
            Have questions or need support? Our team is here to help you succeed in your interview preparation journey.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 animate-in slide-in-from-left duration-700 hover:shadow-lg transition-shadow">
              <Mail className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">blacknightcodes@gmail.com</p>
              <p className="text-gray-600"><a href="mailto:blacknightcodes@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">Click Here to Email Us</a></p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 animate-in slide-in-from-left duration-700 delay-100 hover:shadow-lg transition-shadow">
              <Phone className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">Mon - Fri, 9am - 5pm PST</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 animate-in slide-in-from-left duration-700 delay-200 hover:shadow-lg transition-shadow">
              <MapPin className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">Cyber City</p>
              <p className="text-gray-600">Delhi NCR, India</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-white rounded-2xl border border-gray-100 animate-in slide-in-from-right duration-700 hover:shadow-lg transition-shadow">
            <div className="space-y-6">
              <div className="animate-in fade-in duration-500 delay-300">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-gray-300"
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                  suppressHydrationWarning={true}
                />
              </div>

              <div className="animate-in fade-in duration-500 delay-400">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-gray-300"
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  suppressHydrationWarning={true}
                />
              </div>

              <div className="animate-in fade-in duration-500 delay-600">
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-gray-300 resize-none"
                  placeholder="Enter your message"
                  required
                  disabled={isSubmitting}
                  suppressHydrationWarning={true}
                ></textarea>
              </div>

              <div className="animate-in fade-in duration-500 delay-700">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95"
                  suppressHydrationWarning={true}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl animate-in zoom-in duration-200">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-gray-700 font-medium">Sending your message...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;