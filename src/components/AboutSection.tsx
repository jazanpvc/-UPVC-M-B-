import React from 'react';
import { Target, Compass, Award, Check, Layers, Wrench } from 'lucide-react';
import { FACTORY_INFO } from '../data/factoryData';

export const AboutSection: React.FC = () => {
  const { about01 } = FACTORY_INFO;

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <span>الفصل {about01.chapter}</span>
            <span>•</span>
            <span>الهوية والرؤية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            {about01.chapter} | {about01.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
            {about01.description}
          </p>
        </div>

        {/* Dual Brand Integration Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Jizan Brand Box */}
          <div className="rounded-3xl p-6 sm:p-8 bg-linear-to-br from-blue-900 via-blue-950 to-slate-950 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                  العلامة الأولى
                </div>
                <span className="font-mono text-xs text-blue-400 font-bold tracking-widest uppercase">JIZAN</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-blue-400" />
                <span>JIZAN — مواسير PVC</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {about01.brandJizan.role}
              </p>

              <div className="space-y-2.5 pt-3 text-xs sm:text-sm text-slate-200 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>مقاسات متعددة من 1/2 إنش إلى أقطار المشاريع والبنية التحتية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>فئات ضغط مختلفة: PN6, PN10, PN16 طبقا للمواصفات العالمية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>دقة في السماكات واستدارة المقطع لضمان أعلى سلامة هيدروليكية</span>
                </div>
              </div>
            </div>
          </div>

          {/* M&B Brand Box */}
          <div className="rounded-3xl p-6 sm:p-8 bg-linear-to-br from-slate-900 via-indigo-950 to-slate-950 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
                  العلامة الثانية
                </div>
                <span className="font-mono text-xs text-indigo-400 font-bold tracking-widest uppercase">M&B</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                <Wrench className="w-6 h-6 text-indigo-400" />
                <span>M&B — توصيلات PVC</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {about01.brandMB.role}
              </p>

              <div className="space-y-2.5 pt-3 text-xs sm:text-sm text-slate-200 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>أكواع 90° و45°، تيهات، وصلات مستقيمة، ومخفضات متكاملة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>جلب وسباكت وأغطية وسدادات لجميع أشكال الشبكات وتغيير الأقطار</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>توافق هندسي 100% مع مواسير جيزان لتوفير حلول من مصدر واحد</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* National Industry & Partnership */}
        <div className="rounded-2xl p-6 sm:p-8 bg-blue-50/70 border border-blue-200/80">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-base sm:text-lg">
                <Award className="w-5 h-5 text-blue-700" />
                <span>صناعة وطنية برؤية طموحة وشراكات مستدامة</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed max-w-4xl">
                يفخر مصنع جيزان M&B للصناعات البلاستيكية بكونه جزءاً فاعلاً من الصناعة الوطنية في اليمن، مساهماً في دعم قطاعات المياه والصرف والري والبنية التحتية بمنتجات محلية ذات جودة تنافسية ومطابقة لأدق المعايير القياسية.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
