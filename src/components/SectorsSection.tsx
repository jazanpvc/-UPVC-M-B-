import React from 'react';
import { SECTORS } from '../data/factoryData';
import { 
  Droplets, 
  Wrench, 
  Waves, 
  Sprout, 
  Home, 
  Building2, 
  Milestone, 
  Trees, 
  CheckCircle2 
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Droplets,
  Wrench,
  Waves,
  Sprout,
  Home,
  Building2,
  Milestone,
  Trees,
};

const emojiMap: Record<string, string> = {
  'water-networks': '💧',
  'plumbing-works': '🚰',
  'sewage-drainage': '♻️',
  'irrigation-agriculture': '🌱',
  'residential-projects': '🏠',
  'commercial-projects': '🏢',
  'contracting-infrastructure': '🏗️',
  'gardens-landscaping': '🌳',
};

export const SectorsSection: React.FC = () => {
  return (
    <section id="sectors" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <span>الفصل 03</span>
            <span>•</span>
            <span>قطاعات العمل والتطبيقات</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            03 | مجالات الاستخدام
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            تُستخدم منتجات JIZAN و M&B في منظومة واسعة من المشاريع الحيوية والبنى الأساسية:
          </p>
        </div>

        {/* Sectors Grid (The 8 requested application fields) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTORS.map((sec) => {
            const Icon = iconMap[sec.iconName] || Droplets;
            const emoji = emojiMap[sec.id] || '💧';

            return (
              <div
                key={sec.id}
                className="rounded-2xl bg-slate-50 border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-blue-400 hover:bg-white transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl" role="img" aria-label={sec.title}>
                      {emoji}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {sec.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sec.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-200/60">
                    {sec.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
