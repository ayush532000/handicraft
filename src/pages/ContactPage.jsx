// src/pages/ContactPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_hktinp5";
const EMAILJS_TEMPLATE_ID = "template_w9mhwsf";
const EMAILJS_PUBLIC_KEY = "uQ_5IBUSt01cz5qSc";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState(null);

  // Fetch location on component mount
  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setLocation(data);
      } catch (err) {
        console.error('Error fetching location:', err);
      }
    };
    getLocation();
  }, []);

  // Email validation function
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate email
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Prepare the email template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        contact: formData.contact,
        location: location ? `${location.city}, ${location.region}, ${location.country}` : 'Location not available'
      };

      // Send email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Show success message
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        contact: '',
        message: '',
      });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Email error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us | Innovative India"
        description="Get in touch with Innovative India. Connect with us for inquiries about our handcrafted furniture, custom designs, or any questions you may have."
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-display text-primary-800 mb-12 text-center">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="prose prose-primary">
                <p className="text-gray-600">
                  We&apos;d love to hear from you! Whether you have questions, inquiries, or feedback, 
                  feel free to get in touch with us. Our team at Innovative India is here to assist 
                  you and ensure you have the best experience with our handcrafted furniture and décor.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-primary-800 mb-2">Address:</h3>
                  <div className="flex items-start text-gray-600">
                    <MapPin className="mr-2 mt-1 flex-shrink-0" />
                    <div>
                      Innovative India,<br />
                      [Address]<br />
                      Jodhpur, Rajasthan, India
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-primary-800 mb-2">Phone:</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Phone className="mr-2 flex-shrink-0" />
                      <span>+91 9414146900 (9:00 AM - 6:00 PM IST)</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 flex-shrink-0" />
                      <span>[Imraan khan number] (9:00 AM - 6:00 AM ET)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-primary-800 mb-2">Email:</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Mail className="mr-2 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span>Anupam Mehta (Founder and Owner)</span>
                        <a href="mailto:anupam.mehta@innovativeindia.in" className="text-primary-600 hover:text-primary-700">
                          anupam.mehta@innovativeindia.in
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span>Roma Mehta (Co-Founder and Director)</span>
                        <a href="mailto:roma.mehta@innovativeindia.in" className="text-primary-600 hover:text-primary-700">
                          roma.mehta@innovativeindia.in
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span>Imraan Khan (Canada Managing Director)</span>
                        <a href="mailto:imraan.khan@innovativeindia.in" className="text-primary-600 hover:text-primary-700">
                          imraan.khan@innovativeindia.in
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span>Sales Team</span>
                        <a href="mailto:info@innovativeindia.in" className="text-primary-600 hover:text-primary-700">
                          info@innovativeindia.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-primary-800 mb-2">Social Media:</h3>
                  <p className="text-gray-600 mb-3">
                    Follow us on our social media channels for updates, new arrivals, and design inspiration:
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
                      <Instagram size={24} />
                    </a>
                    <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
                      <Twitter size={24} />
                    </a>
                    <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
                      <Linkedin size={24} />
                    </a>
                    <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
                      <Facebook size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-display text-primary-800 mb-4">
                Alternatively, you can fill out the form below, and we&apos;ll get back to you within 24 hours!
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-1">
                    Message - What are you looking for? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  ></textarea>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="text-green-500 text-sm">
                    Your message has been sent successfully! We will get back to you soon.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>

              <p className="mt-6 text-sm text-gray-500 text-center">
                Thank you for choosing Innovative India. We look forward to connecting with you!
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}