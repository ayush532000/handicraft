// src/components/ProductHighlight.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const highlights = [
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_3_ote5d3.jpg",
    name: "Table",
    categoryKey: "tables",
    description: "Experience the perfect blend of form and function with our handcrafted tables. Each piece is meticulously crafted to become the centerpiece of your living space, combining traditional artisanship with contemporary design.",
    alignment: "left"
  },
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678755/coffee_table_b_1_vmw02x.jpg",
    name: "Chair",
    categoryKey: "chairs",
    description: "Discover comfort redefined with our signature chair collection. Expertly crafted using time-honored techniques, our chairs offer the perfect balance of elegance and durability for your home.",
    alignment: "right"
  },
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_3_ote5d3.jpg",
    name: "Decorative Furniture",
    categoryKey: "decorative",
    description: "Transform your space with our exquisite decorative furniture collection. From intricately carved mirror frames to stunning display cabinets, each piece is a masterwork of artistic expression that adds character and sophistication to any room.",
    alignment: "left"
  },
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_2_xfyb9k.jpg",
    name: "Beds",
    categoryKey: "beds",
    description: "Indulge in the luxury of our handcrafted bed collection. Combining traditional Indian craftsmanship with modern comfort, our beds are designed to create a serene sanctuary for your perfect night's sleep.",
    alignment: "right"
  }
];

export default function ProductHighlight() {
  const navigate = useNavigate();

  return (
    <div className="py-16 space-y-24">
      {highlights.map((item) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`container mx-auto px-4 flex flex-col ${
            item.alignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
          } items-center gap-8`}
        >
          <div className="w-full md:w-1/2">
            <motion.img
              src={item.image}
              alt={item.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <motion.h2 
              className="text-3xl font-display text-primary-800"
              initial={{ opacity: 0, x: item.alignment === 'right' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {item.name}
            </motion.h2>
            <motion.p 
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0, x: item.alignment === 'right' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {item.description}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/category/${item.categoryKey}`)}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              View More
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}