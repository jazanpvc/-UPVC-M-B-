import React, { useState } from 'react';
import { FACTORY_INFO } from '../data/factoryData';
import { 
  ShieldCheck, 
  Microscope, 
  Ruler, 
  Gauge, 
  RotateCw, 
  Layers, 
  CheckCircle2, 
  Truck,
  Sparkles,
  Award
} from 'lucide-react';

export const QualitySection: React.FC = () => {
  const { quality06 } = FACTORY_INFO;
  const [activeCheck, setActiveCheck] = useState<number>(1);

  const icons = [
    Microscope,  // 1. فحص المواد الخام
    Ruler,       // 2. فحص الأبعاد والمقاسات
    Gauge,       // 3. قياس السماكة والقطر والطول
    RotateCw,    // 4. فحص الشكل والاستدارة
    ShieldCheck, // 5. اختبارات الضغط عند انطباقها
    Layers,      // 6. فحص التوصيلات وجودة التصنيع
    Truck        // 7. الفحص النهائي والتجهيز للتوريد
  ];

  return (
    <section id="quality" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <span>الفصل {quality06.chapter}</span>
            <span>•</span>
            <span>المعايير وضبط الجودة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            {quality06.chapter} | {quality06.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {quality06.intro}
          </p>
        </div>

        {/* 7 Quality Checks Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {quality06.checks.map((check, idx) => {
            const Icon = icons[idx] || CheckCircle2;
            const isCurrent = activeCheck === check.id;

            return (
              <div
                key={check.id}
                onClick={() => setActiveCheck(check.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isCurrent
                    ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200/90 hover:border-emerald-300 hover:bg-white'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-mono font-bold text-xs flex items-center justify-center">
                      0{check.id}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform border border-slate-100">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {check.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {check.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>مرحلة فحص إلزامية</span>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-emerald-600' : 'text-slate-300'}`} />
                </div>
              </div>
            );
          })}

          {/* 8th Summary Card */}
          <div className="p-5 rounded-2xl bg-linear-to-br from-slate-900 to-emerald-950 text-white flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>ضمان الجودة الشاملة</span>
              </div>
              <h4 className="text-base font-black text-white">
                ثقة مبنية على فحص علمي دقيق
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                كل شاخصة أنبوب وكل توصيلة تمر بسلسلة الفحوصات السبعة لضمان خلوها من أي عيوب تصنيعية قبل الوصول إلى موقع المشروع.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-xs text-emerald-300 font-mono font-bold">
              100% مطابقة للمواصفات
            </div>
          </div>
        </div>

        {/* Official Slogan Banner with Gold Accent */}
        <div className="rounded-3xl p-8 sm:p-10 bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-center shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              {FACTORY_INFO.fullName}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              "{FACTORY_INFO.slogan}"
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {FACTORY_INFO.subSlogan}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
