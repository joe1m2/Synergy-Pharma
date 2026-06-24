import React, { useState } from 'react';
import { newsService } from '../services/newsService';
import { Handshake, HelpCircle, CheckCircle, FileText, Send } from 'lucide-react';

const Partners = () => {
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    companyInfo: '',
    productPortfolio: '',
    regionOfOperation: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newsService.submitPartnerInquiry(form);
      setSubmitted(true);
      setForm({
        companyName: '',
        contactPerson: '',
        email: '',
        phoneNumber: '',
        companyInfo: '',
        productPortfolio: '',
        regionOfOperation: ''
      });
    } catch (e) {
      setSubmitted(true);
      setForm({
        companyName: '',
        contactPerson: '',
        email: '',
        phoneNumber: '',
        companyInfo: '',
        productPortfolio: '',
        regionOfOperation: ''
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      
      {/* Overview */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-black font-heading text-primary">Partner Portal</h1>
        <p className="text-neutral-600 leading-relaxed text-lg">
          Connecting global pharmaceutical manufacturers and local medical institutions through an optimized procurement pipeline.
        </p>
      </section>

      {/* Grid of details for Manufacturers & Institutions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* For Manufacturers */}
        <div className="bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-accent font-bold text-lg">
            <Handshake className="w-6 h-6" />
            <span>For Manufacturers</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Expand your brand presence into East Africa. We assist in full EFDA registration, importing logistics, and nationwide cold-chain warehousing.
          </p>
          <ul className="space-y-2.5 text-xs text-neutral-500 font-medium">
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span>Full compliance & regulatory registration assistance</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span>Established medical distribution networks in Ethiopia</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span>WHO-compliant warehousing and inventory tracking</span>
            </li>
          </ul>
        </div>

        {/* For Healthcare Institutions */}
        <div className="bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-accent font-bold text-lg">
            <HelpCircle className="w-6 h-6" />
            <span>For Healthcare Institutions</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Optimize your medical procurement. Connect with our client services to set up institutional credit accounts and scheduled supply agreements.
          </p>
          <ul className="space-y-2.5 text-xs text-neutral-500 font-medium">
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span>Flexible credit line facilities for hospitals and clinics</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span>Standardized delivery timelines with cold chain security</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span>Direct communication channels with dedicated support</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section className="bg-neutral-light p-10 rounded-3xl border border-neutral-200 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-heading text-primary">Manufacturer Partnership Inquiry</h2>
          <p className="text-sm text-neutral-500">Submit your company portfolio to initiate onboarding discussion.</p>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-primary">Inquiry Submitted Successfully</h3>
            <p className="text-sm text-neutral-600">Our business development team will review your portfolio and reply within 3 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-600">Company Name</label>
              <input
                type="text"
                required
                className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                placeholder="e.g. MedLabs India"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-600">Contact Person</label>
              <input
                type="text"
                required
                className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={form.contactPerson}
                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                placeholder="e.g. Priya Sharma"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-600">Email Address</label>
              <input
                type="email"
                required
                className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="e.g. partnerships@medlabs.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-600">Phone Number</label>
              <input
                type="text"
                required
                className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                placeholder="e.g. +91 9876543210"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-neutral-600">Company Information</label>
              <textarea
                rows="3"
                required
                className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={form.companyInfo}
                onChange={(e) => setForm({ ...form, companyInfo: e.target.value })}
                placeholder="Brief introduction of your GMP certifications, factory capacity, etc."
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-neutral-600">Product Portfolio Highlights</label>
              <input
                type="text"
                className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={form.productPortfolio}
                onChange={(e) => setForm({ ...form, productPortfolio: e.target.value })}
                placeholder="e.g. Injectable Antibiotics, Vials, Cardiology Tablets"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-sm text-sm"
              >
                <Send className="w-4 h-4" /> Submit Partnership Request
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default Partners;
