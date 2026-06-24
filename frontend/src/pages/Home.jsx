import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicePillars from '../components/home/ServicePillars';
import ProductCategories from '../components/home/ProductCategories';
import PartnersSection from '../components/home/PartnersSection';
import NewsSection from '../components/home/NewsSection';

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      <HeroSection />
      <ServicePillars />
      <ProductCategories />
      <PartnersSection />
      <NewsSection />
    </div>
  );
};

export default Home;
