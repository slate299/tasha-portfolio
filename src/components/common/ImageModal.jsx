// src/components/common/ImageModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageModal = ({ isOpen, onClose, imageSrc, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/95 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-secondary rounded-2xl overflow-hidden border border-accent/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-text-primary font-display font-semibold">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center
                         hover:bg-accent/20 transition-colors"
              >
                <i className="fa-solid fa-times text-text-secondary"></i>
              </button>
            </div>

            {/* Image */}
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              <img 
                src={imageSrc} 
                alt={title}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-border">
              <p className="text-sm text-text-secondary">
                <i className="fa-solid fa-circle-info text-accent mr-2"></i>
                Click outside or press ESC to close
              </p>
              <a
                href={imageSrc}
                download
                className="text-accent hover:text-accent-dark transition-colors text-sm"
              >
                <i className="fa-solid fa-download mr-2"></i>
                Download
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;