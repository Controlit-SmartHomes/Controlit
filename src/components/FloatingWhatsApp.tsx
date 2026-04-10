import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { useState } from 'react';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8"
    >
      <motion.button
        onClick={() => window.open('https://wa.me/972508280691', '_blank')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] from-primary to-primary/80 shadow-lg hover:shadow-[0_0_30px_rgba(0,191,255,0.5)] transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]/30"
          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-background border border-white/10 rounded-lg whitespace-nowrap text-xs sm:text-sm text-foreground pointer-events-none"
      >
        Chat with us
      </motion.div>
    </motion.div>
  );
}
