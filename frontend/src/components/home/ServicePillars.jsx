import React from 'react';
import { ShieldCheck, Truck, Globe } from 'lucide-react';
import Card from '../common/Card';

const ServicePillars = () => {
  const pillars = [
    {
      title: "Global Sourcing",
      description: "Direct partnerships with international, WHO-GMP certified pharmaceutical manufacturers.",
      icon: <Globe className="w-10 h-10 text-accent" />
    },
    {
      title: "Regulatory Compliance",
      description: "Full EFDA registration alignment, strict cold-chain protocols, and batch verification.",
      icon: <ShieldCheck className="w-10 h-10 text-accent" />
    },
    {
      title: "Nationwide Distribution",
      description: "Reliable logistics networks linking head offices and warehouses to hospitals and clinics.",
      icon: <Truck className="w-10 h-10 text-accent" />
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-black font-heading text-primary">Our Core Service Pillars</h2>
        <p className="mt-4 text-neutral-600">
          Engineered to streamline procurement, satisfy strict health requirements, and support clinical delivery.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar) => (
          <Card
            key={pillar.title}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="p-3 bg-neutral-light rounded-2xl">
              {pillar.icon}
            </div>
            <h3 className="text-xl font-bold font-heading text-primary">{pillar.title}</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">{pillar.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicePillars;
