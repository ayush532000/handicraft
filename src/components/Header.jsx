// src/components/Header.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import Navigation from './Navigation';

export default function Header() {
  const { resetToHome } = useProduct();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Business Name */}
          <Link 
            to="/" 
            onClick={resetToHome}
            className="flex items-center space-x-4 group"
          >
            <motion.img 
              src="https://res.cloudinary.com/digi69oig/image/upload/v1729790758/logo_nyoro2.jpg" 
              alt="Innovative India Logo" 
              className="h-16 w-auto object-contain"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="border-l-2 border-primary-200 pl-4">
              <motion.h1 
                className="text-2xl font-display text-primary-800 tracking-wide"
                whileHover={{ scale: 1.02 }}
              >
                Innovative India
              </motion.h1>
              <p className="text-sm text-primary-600">you dream we manufacture</p>
            </div>
          </Link>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  );
}