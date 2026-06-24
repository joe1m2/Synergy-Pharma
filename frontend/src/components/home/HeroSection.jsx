import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-primary rounded-3xl mx-6 mt-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-light via-primary to-primary-dark opacity-85"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-accent/20 text-accent-light border border-accent/30 mb-6 uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 animate-pulse" /> B2B Digital Distribution Portal
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-none max-w-4xl">
          Reliable Healthcare Supply <br />
          <span className="text-accent-light text-gradient">Across Ethiopia</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed">
          Strengthening institutional credibility by connecting global medical manufacturers with local private and public healthcare providers.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/products"
            className="bg-accent hover:bg-accent-light text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition duration-150 flex items-center space-x-2 cursor-pointer"
          >
            <span>Explore Product Catalog</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/partners"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl backdrop-blur transition duration-150 cursor-pointer"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
