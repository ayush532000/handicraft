import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us | Handicraft Store"
        description="Learn about our commitment to traditional craftsmanship and dedication to bringing authentic handcrafted furniture to modern homes."
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1 className="text-3xl font-display text-primary-800 mb-6">About Us</h1>
          <p className="text-primary-700 mb-4">
            Welcome to Handicraft Store, where artisanal craftsmanship meets modern living. Our journey began with a simple vision: to bring the rich heritage of traditional handicrafts into contemporary homes.
          </p>
          <p className="text-primary-700 mb-4">
            Each piece in our collection tells a story - a story of skilled artisans, time-honored techniques, and meticulous attention to detail. We work directly with craftsmen from Rajasthan, ensuring that every product meets our high standards of quality while supporting local communities.
          </p>
          <h2 className="text-2xl font-display text-primary-800 mt-8 mb-4">Our Mission</h2>
          <p className="text-primary-700 mb-4">
            We strive to preserve and promote traditional craftsmanship while creating furniture that complements modern lifestyles. Our commitment to quality, sustainability, and artisanal excellence drives everything we do.
          </p>
          <div className="mt-8 bg-primary-50 p-6 rounded-lg">
            <h3 className="text-xl font-display text-primary-800 mb-4">Why Choose Us?</h3>
            <ul className="list-disc pl-6 space-y-2 text-primary-700">
              <li>Handcrafted Excellence</li>
              <li>Sustainable Materials</li>
              <li>Support for Local Artisans</li>
              <li>Unique, One-of-a-kind Pieces</li>
              <li>Traditional Techniques</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
}