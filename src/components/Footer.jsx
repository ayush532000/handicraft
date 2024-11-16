// src/components/Footer.jsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const handleEnquiryClick = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-primary-800 text-primary-50">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl">
          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h3 className="text-xl font-display">Innovative India</h3>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 mb-6"
          >
            <div className="flex items-center text-primary-200">
              <Phone size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">+91 9414146900</span>
            </div>
            
            <div className="flex items-center text-primary-200">
              <Mail size={16} className="mr-2 flex-shrink-0" />
              <a 
                href="mailto:info@innovativeindia.in" 
                className="hover:text-white transition-colors text-sm"
              >
                info@innovativeindia.in
              </a>
            </div>
            
            <div className="flex items-start text-primary-200">
              <MapPin size={16} className="mr-2 flex-shrink-0 mt-1" />
              <span className="text-sm">
                123 Craft Street, Jodhpur, Rajasthan 342001
              </span>
            </div>
          </motion.div>

          {/* Enquiry Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnquiryClick}
            className="px-5 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm"
          >
            Enquire Now
          </motion.button>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-primary-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-primary-300 text-xs">
              © {new Date().getFullYear()} Innovative India. All rights reserved.
            </p>
            <div className="mt-2 md:mt-0 space-x-4">
              <a href="#" className="text-primary-300 hover:text-white transition-colors text-xs">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors text-xs">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}