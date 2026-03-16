// src/components/hero/HeroCTA.jsx
import React from "react";

const HeroCTA = ({ primary, secondary }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <a href={primary.link} className="btn-primary">
        {primary.text}
        <i className="fa-solid fa-arrow-right ml-2"></i>
      </a>
      <a href={secondary.link} className="btn-outline">
        {secondary.text}
        <i className="fa-solid fa-message ml-2"></i>
      </a>
    </div>
  );
};

export default HeroCTA;
