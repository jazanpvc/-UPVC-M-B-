import React, { useState } from 'react';
import { FACTORY_INFO } from '../data/factoryData';
import { Wrench, Sprout, CheckCircle2, ShieldCheck, Droplets, Layers, Sparkles, ArrowUpRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenQuote: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsProps> = ({ onOpenQuote }) => {
  const [activeView, setActiveView] = useState<'both' | 'plumbers' | 'farmers'>('both');
  const { plumbers07, farmers08 } = FACTORY_INFO;

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            شركاء النجاح الميداني
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            حلول تلبي تطلعات المهنيين والمزارعين
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            منظومة متكاملة من مواسير جيزان وتوصيلات M&B مصممة لتذليل تحديات التركيب الميداني وتحقيق أقصى درجات الكفاءة التشغيلية.
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => setActiveView('both')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeView === 'both'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              عرض الجميع
            </button>
            <button
              onClick={() => setActiveView('plumbers')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'plumbers'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>07 | للسباكين والمقاولين</span>
            </button>
            <button
              onClick={() => setActiveView('farmers')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'farmers'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>08 | للمزارعين وشبكات الري</span>
            </button>
          </div>
        </div>

        {/* The Two Main Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* ---------------- 07 | لماذا يختارنا السباكون؟ ---------------- */}
          {(activeView === 'both' || activeView === 'plumbers') && (
            <div 
              id="plumbers" 
              className={`rounded-3xl border border-blue-200/90 bg-linear-to-b from-blue-50/40 via-white to-blue-50/20 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                activeView === 'plumbers' ? 'lg:col-span-2 max-w-4xl mx-auto w-full' : ''
              }`}
            >
              <div className="space-y-6">
                
                {/* Header Badge & Formula */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-blue-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
                    <span>الفصل {plumbers07.chapter}</span>
                    <span>•</span>
                    <span>قطاع السباكة والإنشاءات</span>
                  </div>

                  {/* Formula Badge: JIZAN + M&B = منظومة متكاملة */}
                  <div className="px-3.5 py-1.5 rounded-xl bg-blue-700 text-white font-mono font-bold text-xs shadow-xs tracking-wide">
                    {plumbers07.formula}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <span>{plumbers07.chapter} | {plumbers07.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    منظومة متكاملة تجمع بين أنابيب جيزan وتوصيلات M&B، مما يمنح الفنيين والسباكين راحة مطلقة أثناء التنفيذ، مع تقليل احتمالات التسرب إلى الصفر.
                  </p>
                </div>

                {/* Reasons List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {plumbers07.reasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-colors space-y-1"
                    >
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{reason.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed pr-6">
                        {reason.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Quick Action */}
              <div className="pt-6 mt-6 border-t border-blue-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  توافق 100% بين الأنابيب والتوصيلات
                </span>
                <button
                  onClick={onOpenQuote}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-100/70 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>طلب تسعيرة للسباكة</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ---------------- 08 | لماذا يختارنا المزارعون؟ ---------------- */}
          {(activeView === 'both' || activeView === 'farmers') && (
            <div 
              id="farmers" 
              className={`rounded-3xl border border-emerald-200/90 bg-linear-to-b from-emerald-50/40 via-white to-emerald-50/20 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                activeView === 'farmers' ? 'lg:col-span-2 max-w-4xl mx-auto w-full' : ''
              }`}
            >
              <div className="space-y-6">
                
                {/* Header Badge & Chapter */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <span>الفصل {farmers08.chapter}</span>
                    <span>•</span>
                    <span>قطاع الزراعة والري الحديث</span>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-xs">
                    شبكات ري متطورة
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <span>{farmers08.chapter} | {farmers08.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {farmers08.intro}
                  </p>
                </div>

                {/* Reasons List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {farmers08.reasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors space-y-1"
                    >
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{reason.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed pr-6">
                        {reason.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Quick Action */}
              <div className="pt-6 mt-6 border-t border-emerald-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  ضمان تحمل الضغط وأشعة الشمس في الحقول
                </span>
                <button
                  onClick={onOpenQuote}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100/70 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>طلب تسعيرة لشبكات الري</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
