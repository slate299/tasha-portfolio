// src/components/hero/HeroStats.jsx
import React from "react";

const HeroStats = ({ stats }) => {
  return (
    <div className="flex flex-wrap gap-8 mt-8">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <i className={`${stat.icon} text-accent text-xl`}></i>
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-text-primary">
              {stat.number}
            </div>
            <div className="text-sm text-text-secondary">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
