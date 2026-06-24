import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { QuoteContext } from '../../context/QuoteContext';
import { useAuth } from '../../hooks/useAuth';
import { FileText, ShoppingBag, LogIn, LogOut, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const { basket } = useContext(QuoteContext) || { basket: [] };
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  const activeStyle = "text-accent border-b-2 border-accent pb-1 font-semibold";
  const inactiveStyle = "text-neutral-700 hover:text-accent transition duration-150";

  return (
    <nav className="sticky top-0 z-50 glass-panel shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold font-heading text-primary flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 bg-accent rounded-full animate-pulse"></span>
                SYNERGY <span className="text-accent">PHARMA</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Catalog</NavLink>
            <NavLink to="/partners" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Partner Portal</NavLink>
            <NavLink to="/resources" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Resources</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>About Us</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Contact</NavLink>
          </div>

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Quote Basket button */}
            <Link to="/products" className="relative p-2 text-primary hover:text-accent transition duration-150">
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth / Admin */}
            {user ? (
              <div className="flex items-center space-x-3">
                {user.role === 'ROLE_ADMIN' && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-sm bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-light transition"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-1.5 text-neutral-600 hover:text-red-500 transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-sm text-primary border border-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Client Portal</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary hover:text-accent p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 py-4 px-4 space-y-3">
          <NavLink to="/" className="block text-neutral-700 hover:text-accent py-2" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" className="block text-neutral-700 hover:text-accent py-2" onClick={() => setMobileMenuOpen(false)}>Catalog</NavLink>
          <NavLink to="/partners" className="block text-neutral-700 hover:text-accent py-2" onClick={() => setMobileMenuOpen(false)}>Partner Portal</NavLink>
          <NavLink to="/resources" className="block text-neutral-700 hover:text-accent py-2" onClick={() => setMobileMenuOpen(false)}>Resources</NavLink>
          <NavLink to="/about" className="block text-neutral-700 hover:text-accent py-2" onClick={() => setMobileMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/contact" className="block text-neutral-700 hover:text-accent py-2" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
          <hr className="border-neutral-200" />
          <div className="flex justify-between items-center py-2">
            <Link to="/products" className="flex items-center gap-1.5 text-neutral-700" onClick={() => setMobileMenuOpen(false)}>
              <ShoppingBag className="w-5 h-5" />
              <span>Quote Basket ({totalItems})</span>
            </Link>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="text-red-500 font-semibold flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-primary font-semibold flex items-center gap-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="w-4 h-4" /> Client Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
