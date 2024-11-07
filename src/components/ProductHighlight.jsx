// src/components/ProductHighlight.jsx
import { motion } from 'framer-motion';

const highlights = [
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_3_ote5d3.jpg",
    name: "Table",
    description: "Experience the perfect blend of form and function with our handcrafted tables. Each piece is meticulously crafted to become the centerpiece of your living space, combining traditional artisanship with contemporary design.",
    alignment: "left"
  },
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678755/coffee_table_b_1_vmw02x.jpg",
    name: "Chair",
    description: "Discover comfort redefined with our signature chair collection. Expertly crafted using time-honored techniques, our chairs offer the perfect balance of elegance and durability for your home.",
    alignment: "right"
  },
  {
    image: "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_b_2_qqe2gb.jpg",
    name: "Door",
    description: "Make a statement with our exquisite door collection. Each door is a masterpiece of craftsmanship, designed to enhance your home's aesthetic while providing lasting durability and security.",
    alignment: "left"
  }
];

export default function ProductHighlight() {
  return (
    <div className="py-16 space-y-24">
      {highlights.map((item, index) => (
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
            <h2 className="text-3xl font-display text-primary-800">{item.name}</h2>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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