import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white border-t border-primary-dark">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading tracking-wider">
              SYNERGY <span className="text-accent">PHARMA</span>
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Establishing institutional credibility and reliable pharmaceutical distribution networks across Ethiopia.
            </p>
            <div className="flex items-center space-x-2 text-neutral-300 text-xs">
              <Award className="w-5 h-5 text-accent animate-pulse" />
              <span>EFDA Compliant Importation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li><Link to="/products" className="hover:text-accent transition">Product Catalog</Link></li>
              <li><Link to="/partners" className="hover:text-accent transition">Become a Partner</Link></li>
              <li><Link to="/resources" className="hover:text-accent transition">Resources & Downloads</Link></li>
              <li><Link to="/about" className="hover:text-accent transition">About Our Team</Link></li>
            </ul>
          </div>

          {/* Core Verticals */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">Product Sectors</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li><Link to="/products?category=Pharmaceuticals" className="hover:text-accent transition">Pharmaceuticals</Link></li>
              <li><Link to="/products?category=Medical%20Devices" className="hover:text-accent transition">Medical Devices</Link></li>
              <li><Link to="/products?category=Diagnostics" className="hover:text-accent transition">Diagnostics</Link></li>
              <li><Link to="/products?category=Consumables" className="hover:text-accent transition">Medical Consumables</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">Head Office</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Bole Sub-city, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+251 11 663 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>info@synergypharma.com.et</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-primary-light/30 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Synergy Pharma Plc. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link to="/about" className="hover:text-neutral-300">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-neutral-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
