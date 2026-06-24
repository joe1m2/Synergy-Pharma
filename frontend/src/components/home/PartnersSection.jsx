import React from 'react';

const PartnersSection = () => {
  const partners = [
    { name: 'Pfizer Inc.', logo: '/logos/pfizer.png', country: 'USA' },
    { name: 'GE Healthcare', logo: '/logos/ge_healthcare.png', country: 'United Kingdom' },
    { name: 'Roche Diagnostics', logo: '/logos/roche.png', country: 'Switzerland' },
    { name: 'SDF Pharma', logo: '/logos/sdf_pharma.png', country: 'India' },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold font-heading text-neutral-800">Trusted Global Manufacturing Partners</h2>
        <p className="text-sm text-neutral-500 mt-2">Connecting world-class biomedical exporters with the Ethiopian medical network</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-75">
        {partners.map((partner) => (
          <div key={partner.name} className="flex flex-col items-center space-y-2 grayscale hover:grayscale-0 transition duration-200">
            <div className="h-12 flex items-center justify-center text-primary font-black tracking-widest text-lg bg-neutral-light px-6 py-2 rounded-xl border border-neutral-200">
              {partner.name.split(' ')[0].toUpperCase()}
            </div>
            <span className="text-xs text-neutral-400 font-semibold">{partner.country}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
