import React, { useState } from 'react';
import { JIZAN_PIPES, MB_FITTINGS } from '../data/factoryData';
import { Layers, Wrench, CheckCircle, ArrowUpRight, Filter, ShieldCheck, Tag } from 'lucide-react';
import jizanPipesHero from '../assets/images/jizan_pipes_factory_1788364853190.jpg';
import mbFittingsHero from '../assets/images/mb_fittings_showcase_1788364871292.jpg';

interface ProductsSectionProps {
  onSelectProductForQuote: (productName: string, size: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProductForQuote }) => {
  const [activeTab, setActiveTab] = useState<'pipes' | 'fittings'>('pipes');
  const [pressureFilter, setPressureFilter] = useState<'all' | 'PN16' | 'PN10' | 'PN6'>('all');

  const filteredPipes = JIZAN_PIPES.filter((p) => {
    if (pressureFilter === 'all') return true;
    return p.pressureClass === pressureFilter;
  });

  return (
    <section id="products" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <span>الفصل 02</span>
            <span>•</span>
            <span>كتالوج المنتجات الرسمي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            02 | منتجاتنا
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            مواسير PVC وتوصيلات PVC مصممة لتلبية احتياجات الاستخدامات المختلفة، مع توفر المقاسات والتصنيفات بدقة هندسية عالية.
          </p>
        </div>

        {/* Brand Switch Tabs: JIZAN vs M&B */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab('pipes')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pipes'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>JIZAN | مواسير PVC</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-blue-800 text-blue-100 mr-1">
                {JIZAN_PIPES.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('fittings')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'fittings'
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>M&B | توصيلات PVC</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-800 text-indigo-100 mr-1">
                {MB_FITTINGS.length}
              </span>
            </button>
          </div>
        </div>

        {/* Content: PIPES TAB (JIZAN | مواسير PVC) */}
        {activeTab === 'pipes' && (
          <div className="space-y-8">
            
            {/* Pipes Banner Card */}
            <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-4 h-56 sm:h-64 lg:h-full relative">
                <img
                  src={jizanPipesHero}
                  alt="مواسير JIZAN PVC"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-slate-950/70 to-transparent flex items-end p-4 text-white">
                  <span className="text-xs font-bold bg-blue-600 px-2.5 py-1 rounded-md">
                    JIZAN — مواسير PVC
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 p-6 sm:p-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  <Tag className="w-3.5 h-3.5" />
                  <span>JIZAN | مواسير PVC</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  مواسير بلاستيكية مصممة لتلبية احتياجات الاستخدامات المختلفة
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  تتوفر بمقاسات وتصنيفات متعددة حسب المنتج واشتراطات المشروع، مصنعة من بولي فينيل كلوريد نقي مع إضافات نوعية تمنحها متانة ومقاومة استثنائية للضغوط والمواد الكيميائية والأحماض.
                </p>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> تصنيف الضغط:
                  </span>
                  {(['all', 'PN16', 'PN10', 'PN6'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setPressureFilter(filter)}
                      className={`text-xs px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                        pressureFilter === filter
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {filter === 'all' ? 'جميع التصنيفات' : filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPipes.map((pipe) => (
                <div
                  key={pipe.id}
                  className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                        {pipe.pressureClass}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {pipe.diameterInch} ({pipe.diameterMm} mm)
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {pipe.name}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {pipe.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <p className="text-[11px] font-bold text-slate-600">الميزات:</p>
                      {pipe.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap gap-1">
                      {pipe.application.map((app, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">طول الماسورة: 6 م</span>
                    <button
                      onClick={() => onSelectProductForQuote(pipe.name, pipe.diameterInch)}
                      className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>إضافة للتسعيرة</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Content: FITTINGS TAB (M&B | توصيلات PVC) */}
        {activeTab === 'fittings' && (
          <div className="space-y-8">
            
            {/* Fittings Banner Card */}
            <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-4 h-56 sm:h-64 lg:h-full relative">
                <img
                  src={mbFittingsHero}
                  alt="توصيلات M&B PVC"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-slate-950/70 to-transparent flex items-end p-4 text-white">
                  <span className="text-xs font-bold bg-indigo-600 px-2.5 py-1 rounded-md">
                    M&B — توصيلات PVC
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 p-6 sm:p-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                  <Tag className="w-3.5 h-3.5" />
                  <span>M&B | توصيلات PVC</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  مجموعة من التوصيلات لتسهيل تركيب الشبكات وربط المواسير وتغيير الاتجاهات والأقطار
                </h3>
                
                {/* Specific bullets requested by user */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>أكواع 90° و45°</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>تيهات متساوية وتفريع</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>وصلات مستقيمة</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>مخفضات ومساليب</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>جلب وسباكت</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>أغطية وتوصيلات وفروع</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle className="w-4 h-4" /> خامات عالية النقاء
                  </span>
                  <span className="flex items-center gap-1 text-blue-600">
                    <CheckCircle className="w-4 h-4" /> مطابقة لأقطار مواسير جيزان
                  </span>
                  <span className="flex items-center gap-1 text-indigo-600">
                    <CheckCircle className="w-4 h-4" /> إحكام تام مانع للتسريب
                  </span>
                </div>
              </div>
            </div>

            {/* Fittings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MB_FITTINGS.map((fitting) => (
                <div
                  key={fitting.id}
                  className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                        {fitting.brand}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {fitting.pressureRating}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {fitting.name}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {fitting.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <p className="text-[11px] font-bold text-slate-600">المقاسات المتوفرة:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {fitting.sizes.map((size, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/60"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 pt-2">
                      {fitting.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">توصيلات ضغط وصرف</span>
                    <button
                      onClick={() => onSelectProductForQuote(fitting.name, fitting.sizes[0])}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>إضافة للتسعيرة</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
