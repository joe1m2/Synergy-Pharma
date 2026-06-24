import React from 'react';
import { Award, ShieldAlert, Heart, Calendar } from 'lucide-react';

const About = () => {
  const leadership = [
    { name: "Dr. Aster Lemma", role: "Chief Executive Officer", bio: "Over 20 years in international pharmacy logistics and health authority compliance.", init: "AL" },
    { name: "Ato Yared Tesfaye", role: "Head of Supply Chain", bio: "Specialist in cold chain management and pharmaceutical warehouse distribution.", init: "YT" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      {/* Overview */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-black font-heading text-primary">About Synergy Pharma</h1>
        <p className="text-neutral-600 leading-relaxed text-lg">
          Established to bridge the gap between world-class medical innovation and public/private healthcare distribution in Ethiopia.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-accent font-bold">
            <Heart className="w-6 h-6" />
            <span>Our Vision</span>
          </div>
          <p className="text-neutral-600 leading-relaxed text-sm">
            To be the most trusted and reliable medical distributor in East Africa, recognized for quality compliance, operational excellence, and healthcare support.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-accent font-bold">
            <Award className="w-6 h-6" />
            <span>Our Mission</span>
          </div>
          <p className="text-neutral-600 leading-relaxed text-sm">
            To supply hospitals, clinics, and pharmacies with safe, affordable, and authentic pharmaceuticals and medical equipment directly from global WHO-GMP manufacturers.
          </p>
        </div>
      </section>

      {/* Quality Assurance & Compliance */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold font-heading text-primary text-center">Quality Assurance & EFDA Compliance</h2>
        <div className="bg-neutral-light p-8 rounded-3xl border border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-heading text-primary">Cold Chain Protocols</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We operate advanced cold chain storage solutions compliant with local EFDA guidelines and international WHO specifications. Our logistics network maintains real-time temperature tracking for sensitive biological vaccines and insulin products.
            </p>
          </div>
          <div className="space-y-4 border-t md:border-t-0 md:border-l border-neutral-300 pt-6 md:pt-0 md:pl-8">
            <h3 className="text-xl font-bold font-heading text-primary">Product Verification</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Every shipment undergoes strict batch testing, certificate clearance review, and physical verification to prevent counterfeit products from entering the distribution market.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold font-heading text-primary text-center">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadership.map((member) => (
            <div key={member.name} className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm flex items-start space-x-6">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center font-bold text-accent shrink-0">
                {member.init}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-heading text-primary">{member.name}</h3>
                <p className="text-xs text-accent font-semibold uppercase">{member.role}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
