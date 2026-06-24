import React from 'react';
import { ArrowRight, Calendar, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: 'Synergy Pharma Partners with GE Healthcare',
      content: 'We are proud to announce our exclusive nationwide distribution partnership with GE Healthcare to bring advanced medical imaging systems to public and private clinics across Ethiopia. This partnership marks a significant milestone in our mission to upgrade healthcare logistics in the region.',
      date: 'June 20, 2026',
      tag: 'Partnerships'
    },
    {
      id: 2,
      title: 'EFDA Regulatory Updates for 2026',
      content: 'The Ethiopian Food and Drug Authority (EFDA) has released new compliance guidelines for the importation of cold-chain medical therapeutics. Read our full summary of quality control adjustments to prepare onboarding documents accordingly.',
      date: 'May 14, 2026',
      tag: 'Compliance'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black font-heading text-primary">News & Regulatory Updates</h2>
          <p className="text-neutral-600 mt-2">Latest market access intelligence and corporate announcements</p>
        </div>
        <Link to="/resources" className="text-accent font-bold hover:text-accent-light flex items-center space-x-1 group cursor-pointer">
          <span>Read all news</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {news.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between p-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/15 text-accent-dark">
                  <Bookmark className="w-3 h-3" /> {item.tag}
                </span>
                <span className="flex items-center text-xs text-neutral-400 gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {item.date}
                </span>
              </div>
              <h3 className="text-xl font-bold font-heading text-primary leading-snug">{item.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{item.content}</p>
            </div>
            <Link to="/resources" className="inline-flex items-center gap-1 text-primary hover:text-accent font-semibold text-sm mt-6 cursor-pointer">
              <span>Read article</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
