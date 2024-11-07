// src/components/LatestProducts.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const latestProducts = [
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_b_2_qqe2gb.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_1_veyjzs.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_4_bkekyg.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_3_ote5d3.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_2_xfyb9k.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678755/coffee_table_b_1_vmw02x.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_b_2_qqe2gb.jpg",
];

export default function LatestProducts() {
  const [activeIndices, setActiveIndices] = useState([0, 1, 2, 3]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (dragging) return;

    const timer = setInterval(() => {
      setActiveIndices(current => {
        const newIndices = current.map(index => (index + 1) % latestProducts.length);
        return newIndices;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [dragging]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      const direction = info.offset.x > 0 ? -1 : 1;
      setActiveIndices(current => {
        return current.map(index => {
          const newIndex = index + direction;
          if (newIndex < 0) return latestProducts.length - 1;
          if (newIndex >= latestProducts.length) return 0;
          return newIndex;
        });
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-start space-x-8">
        {/* Title section - now fixed width */}
        <div className="w-1/4">
          <h2 className="text-3xl font-display text-primary-800 mb-2">Latest Products</h2>
          <p className="text-gray-600">Check out our new additions</p>
        </div>

        {/* Products carousel - takes remaining width */}
        <motion.div
          className="flex-1 overflow-hidden select-none"
          onDragStart={() => setDragging(true)}
          onDragEnd={(e, info) => {
            setDragging(false);
            handleDragEnd(e, info);
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          style={{ touchAction: 'none' }}
        >
          <div className="flex gap-4">
            <AnimatePresence mode="popLayout">
              {activeIndices.map((index, i) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-1/4 flex-shrink-0"
                >
                  <img
                    src={latestProducts[index]}
                    alt={`Latest Product ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                    draggable="false"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}