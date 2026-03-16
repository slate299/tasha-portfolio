// src/components/hero/HeroSocial.jsx
import React from "react";

const HeroSocial = ({ social }) => {
  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
      <span className="text-sm text-text-secondary">Find me on:</span>
      <div className="flex gap-3">
        {social.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center 
                       hover:bg-accent/20 transition-all duration-300 group"
            aria-label={item.name}
          >
            <i
              className={`${item.icon} text-text-secondary group-hover:text-accent transition-colors`}
            ></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HeroSocial;
