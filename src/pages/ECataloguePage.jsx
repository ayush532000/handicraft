// src/pages/ECataloguePage.jsx
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function ECataloguePage() {
  return (
    <>
      <SEO 
        title="E-Catalogue | Innovative India"
        description="Browse our digital catalogue of handcrafted furniture and decor pieces."
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display text-primary-800 mb-8 text-center">E-Catalogue</h1>
          <p className="text-center text-primary-600">Coming Soon</p>
        </div>
      </motion.div>
    </>
  );
}