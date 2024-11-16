// src/pages/AboutPage.jsx
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us | Innovative India"
        description="Discover the story of Innovative India, where traditional craftsmanship meets modern design. Based in Jodhpur, we bring timeless Indian handicrafts to the world."
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-3xl mx-auto prose prose-primary">
          <h1 className="text-3xl font-display text-primary-800 mb-8 text-center">
            About Us
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-gray-600"
          >
            <p>
              Welcome to <span className="font-medium text-primary-700">Innovative India (you dream we manufacture)</span>, 
              a platform based in Jodhpur, Rajasthan, India dedicated to bringing the timeless beauty 
              of Indian handicrafts and furniture to the world. Rooted in India&apos;s rich heritage and 
              inspired by its diverse culture, we aim to connect artisans&apos; traditional craftsmanship 
              with modern aesthetics, making handcrafted treasures accessible to everyone.
            </p>

            <p>
              At Innovative India, each piece tells a story. From wooden, iron, and marble furniture 
              to decorative items, wall hangings, and aesthetic furniture, our collection is a celebration 
              of the unique skills passed down through generations of artisans. We offer an exquisite 
              range of mirror frames, modern furniture, industrial furniture, and traditional furniture, 
              blending timeless charm with contemporary design to suit any home or office space.
            </p>

            <p>
              In addition to our curated collection, we also offer bespoke furniture designs tailored 
              to your unique needs, allowing you to create pieces that truly reflect your style and 
              requirements.
            </p>

            <p>
              Our mission is twofold: to preserve India&apos;s rich artisanal heritage and to inspire a 
              new generation to appreciate the beauty and craftsmanship that define our culture. We 
              work closely with skilled craftsmen in Jodhpur, ensuring they receive fair compensation 
              and support to keep their art alive and flourishing.
            </p>

            <p>
              With each purchase, you help us sustain traditional crafts and empower local artisans, 
              making a meaningful impact on their communities. Discover the art of India through our 
              thoughtfully curated collection, and join us in celebrating the spirit of Innovative 
              India—where tradition meets creativity, and every creation brings a piece of India into 
              your home.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}