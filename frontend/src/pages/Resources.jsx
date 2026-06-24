import React from 'react';
import { FileText, Download, ShieldCheck, BookOpen } from 'lucide-react';

const Resources = () => {
  const downloads = [
    { title: "2026 Product Catalog", size: "4.8 MB", desc: "Comprehensive listing of all pharmaceuticals, medical devices, and consumables.", type: "PDF Catalog" },
    { title: "EFDA Cold Chain Guidelines", size: "1.2 MB", desc: "Summary of local regulatory quality standards for vaccine and insulin storage.", type: "Regulatory Doc" },
    { title: "Partner Onboarding Booklet", size: "2.4 MB", desc: "Guide for international manufacturers on market entry and registration process.", type: "Guide" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      
      {/* Overview */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-black font-heading text-primary">Resources & Downloads</h1>
        <p className="text-neutral-600 leading-relaxed text-lg">
          Access product catalogs, brochures, registration templates, and regulatory compliance publications.
        </p>
      </section>

      {/* Grid List of Documents */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {downloads.map((doc) => (
          <div
            key={doc.title}
            className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between h-64 hover:shadow-md transition"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-bold bg-neutral-light text-accent px-2.5 py-1 rounded-full uppercase tracking-wider">
                {doc.type}
              </span>
              <h3 className="text-lg font-bold font-heading text-primary leading-tight">{doc.title}</h3>
              <p className="text-neutral-600 text-xs leading-relaxed">{doc.desc}</p>
            </div>
            
            <div className="flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-semibold text-neutral-400">
              <span>Size: {doc.size}</span>
              <button
                onClick={() => alert(`Initiating download for: ${doc.title}`)}
                className="text-accent hover:text-accent-light flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Compliance / Certification Banner */}
      <section className="bg-primary text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <ShieldCheck className="w-12 h-12 text-accent" />
          <div>
            <h3 className="text-lg font-bold font-heading">Verified Certificates & Licenses</h3>
            <p className="text-sm text-neutral-300">All importation records, quality validations, and EFDA registrations are fully accessible for compliance checks.</p>
          </div>
        </div>
        <button
          onClick={() => alert('Accessing certificates repository')}
          className="bg-accent hover:bg-accent-light text-white font-bold py-2.5 px-6 rounded-xl transition text-sm whitespace-nowrap"
        >
          View Certificates
        </button>
      </section>
    </div>
  );
};

export default Resources;
