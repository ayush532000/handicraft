// src/components/Footer.jsx
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-primary-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-display mb-4">About Us</h3>
            <p className="text-primary-200 text-sm leading-relaxed">
              Bringing traditional craftsmanship to modern homes. Each piece tells a story of artisanal excellence and timeless beauty.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-display mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-primary-200">
                <Phone size={16} className="mr-2" />
                <span>+1234567890</span>
              </li>
              <li className="flex items-center text-primary-200">
                <Mail size={16} className="mr-2" />
                <span>info@handicraft.com</span>
              </li>
              <li className="flex items-center text-primary-200">
                <MapPin size={16} className="mr-2" />
                <span>Jodhpur, Rajasthan</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-primary-200 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-primary-200 hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="/blog" className="text-primary-200 hover:text-white transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-display mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-300">
          <p>© 2024 Handicraft Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}