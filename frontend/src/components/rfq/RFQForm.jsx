import React, { useState } from 'react';
import Button from '../common/Button';

const RFQForm = ({ onSubmit, loading = false }) => {
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      organizationName: orgName,
      contactPerson,
      email,
      phoneNumber: phone,
      additionalRequirements: notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold font-heading text-primary">Procurement Details</h3>
        <p className="text-neutral-500 text-xs mt-1">Submit your organizational contact info. Our sales team will follow up within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Organization Name *</label>
          <input
            type="text"
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="block w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            placeholder="e.g. Black Lion Hospital"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Contact Person *</label>
          <input
            type="text"
            required
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="block w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            placeholder="Full Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Email Address *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            placeholder="buyer@hospital.gov.et"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Phone Number *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            placeholder="+251 9..."
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Additional Requirements / Notes</label>
        <textarea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="block w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          placeholder="E.g. urgent shipping requested, credit facilities inquiry, package specs..."
        />
      </div>

      <Button
        type="submit"
        variant="accent"
        loading={loading}
        className="w-full text-center py-4"
      >
        Submit Request for Quote
      </Button>
    </form>
  );
};

export default RFQForm;
