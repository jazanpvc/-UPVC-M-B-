import React, { useState } from 'react';
import { FACTORY_INFO } from '../data/factoryData';
import { ShieldCheck, Feather, Sparkles, Wrench, CheckCircle2, Gauge, Thermometer, Ruler, ArrowRight, HelpCircle, FileCheck } from 'lucide-react';

export const MaterialsAndStrengthSection: React.FC = () => {
  const [selectedFactor, setSelectedFactor] = useState<number>(0);
  const { materials04, strength05 } = FACTORY_INFO;

  const featureIcons = [Feather, ShieldCheck, Sparkles, Wrench, CheckCircle2];
  const factorIcons = [Ruler, ShieldCheck, FileCheck, Gauge, Thermometer, CheckCircle2, Wrench];

  return (
    <section id="materials-strength" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">

        {/* ---------------- 04 | المواد الأساسية ---------------- */}
        <div id="materials" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
              <span>الفصل {materials04.chapter}</span>
              <span>•</span>
              <span>المواد الخام والتصنيع</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
              {materials04.chapter} | {materials04.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {materials04.intro}
            </p>
          </div>

          {/* 5 Core PVC Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {materials04.features.map((feat, idx) => {
              const Icon = featureIcons[idx] || CheckCircle2;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ميزة قياسية معتمدة</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------- 05 | القوة والسماكة والمرونة ---------------- */}
        <div id="strength" className="scroll-mt-24 pt-8 border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span>الفصل {strength05.chapter}</span>
              <span>•</span>
              <span>المعايير الهندسية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
              {strength05.chapter} | {strength05.title}
            </h2>
            
            {/* The Critical Technical Rule Highlight */}
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold text-sm sm:text-base shadow-xs max-w-2xl mx-auto flex items-center justify-center gap-2 text-center">
              <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0 hidden sm:inline" />
              <span>"{strength05.principle}"</span>
            </div>
          </div>

          {/* Interactive Technical Factors Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Factors List (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                تختلف القوة والسماكة والمرونة بحسب العوامل التالية:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {strength05.factors.map((factor, idx) => {
                  const Icon = factorIcons[idx] || CheckCircle2;
                  const isSelected = selectedFactor === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedFactor(idx)}
                      className={`text-right p-4 rounded-xl border transition-all flex items-start gap-3 w-full cursor-pointer ${
                        isSelected
                          ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-700">0{idx + 1}</span>
                          <h4 className="text-sm font-bold text-slate-900">{factor.name}</h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-snug">
                          {factor.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanatory Guide Box (Right 5 Cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-linear-to-br from-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  توجيه فني من مصنع جيزان & M&B
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-white">
                    كيف تختار الماسورة المناسبة لمشروعك؟
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    يعتقد البعض خطأً أن زيادة سماكة الجدار وحدها تكفي لاختيار الماسورة. في الواقع الهندسي، يعتمد الأداء الأمثل على تكامل القطر الاسمي، درجة حرارة السائل، ضغط التشغيل، وعمق الدفن.
                  </p>
                </div>

                {/* Focus on Currently Selected Factor */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
                  <span className="text-xs font-mono text-emerald-300 font-bold block">
                    العامل المحدد: {strength05.factors[selectedFactor].name}
                  </span>
                  <p className="text-sm font-bold text-white">
                    {strength05.factors[selectedFactor].desc}
                  </p>
                  <p className="text-xs text-slate-300 pt-1">
                    توفر مصانعنا جداول مطابقة فنية دقيقة لضمان أعلى معامل أمان بدون تكاليف إضافية غير مبررة.
                  </p>
                </div>

                <div className="pt-2 text-xs text-slate-400 border-t border-white/10 flex items-center justify-between">
                  <span>فريق الدعم الفني جاهز لخدمتكم</span>
                  <span className="font-mono text-emerald-400 font-bold">776046048</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
