// src/components/ImageCarousel.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const carouselImages = [
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_b_2_qqe2gb.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_1_veyjzs.jpg",
  "https://res.cloudinary.com/digi69oig/image/upload/v1729678754/coffee_table_a_4_bkekyg.jpg"
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const dragEndHandler = (event, info) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        setDirection(-1);
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
        );
      } else {
        setDirection(1);
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % carouselImages.length
        );
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full bg-gray-100 flex justify-center items-center py-8">
      <div className="relative w-[80%] h-[500px] overflow-hidden"> {/* Reduced width */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={dragEndHandler}
            className="absolute w-full h-full select-none" // Added select-none
            style={{ touchAction: 'none' }} // Prevent default touch behaviors
          >
            <img
              src={carouselImages[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover rounded-lg"
              draggable="false" // Prevent default image drag
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}