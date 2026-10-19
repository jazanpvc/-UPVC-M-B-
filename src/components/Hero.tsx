import React from 'react';
import { ShieldCheck, Sparkles, FileText, PhoneCall, CheckCircle2, ChevronLeft, ArrowDown } from 'lucide-react';
import { FACTORY_INFO } from '../data/factoryData';
import factoryPipesImg from '../assets/images/jizan_pipes_factory_1788364853190.jpg';
import mbFittingsImg from '../assets/images/mb_fittings_showcase_1788364871292.jpg';
import irrigationImg from '../assets/images/modern_irrigation_field_1788364891132.jpg';
import industrialImg from '../assets/images/industrial_plant_pipes_1788364911632.jpg';

import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onOpenVeo: () => void;
  onOpenQuote: () => void;
  onSelectPhotoForVeo: (photoUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVeo, onOpenQuote, onSelectPhotoForVeo }) => {
  const chapters = [
    { id: 'about', num: '01', title: 'من نحن' },
    { id: 'products', num: '02', title: 'منتجاتنا' },
    { id: 'sectors', num: '03', title: 'مجالات الاستخدام' },
    { id: 'materials', num: '04', title: 'المواد الأساسية' },
    { id: 'strength', num: '05', title: 'القوة والسماكة' },
    { id: 'quality', num: '06', title: 'ضبط الإنتاج' },
    { id: 'plumbers', num: '07', title: 'للسباكين' },
    { id: 'farmers', num: '08', title: 'للمزارعين' },
    { id: 'branches', num: '09', title: 'مراكز البيع المعتمدة' },
    { id: 'news-section', num: '10', title: 'الأخبار والتقنية' },
    { id: 'calculator', num: '11', title: 'الحاسبة' },
  ];

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-20 bg-linear-to-b from-blue-50/70 via-slate-50 to-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-8">
        
        {/* Quick Chapter Navigator Bar */}
        <div className="overflow-x-auto no-scrollbar py-1">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            {chapters.map((ch) => (
              <button
                key={ch.num}
                onClick={() => scrollTo(ch.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer"
              >
                <span className="font-mono text-blue-600">{ch.num}</span>
                <span>{ch.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Right Column (RTL Start): Text & Value Propositions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* National Industry Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs sm:text-sm font-bold shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span>صناعة وطنية موثوقة في الجمهورية اليمنية</span>
            </div>

            {/* Main Headline with Official Brand Mark */}
            <div className="space-y-3">
              <div className="pb-1">
                <BrandLogo size="lg" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.25] tracking-tight">
                {FACTORY_INFO.fullName}
              </h1>
              <p className="text-base sm:text-lg font-extrabold text-blue-700 font-sans tracking-wide">
                {FACTORY_INFO.fullNameEn}
              </p>
            </div>

            {/* Official Slogan Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-blue-200/80 shadow-xs border-r-4 border-r-blue-600 space-y-1">
              <p className="text-xs uppercase font-extrabold text-blue-600 tracking-wider">
                الشعار الرسمي للمصنع
              </p>
              <p className="text-xl sm:text-2xl font-black text-slate-900">
                "{FACTORY_INFO.slogan}"
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 pt-1">
                {FACTORY_INFO.subSlogan}
              </p>
            </div>

            {/* Factory Summary Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
              {FACTORY_INFO.about01.description}
            </p>

            {/* 3 Core Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">JIZAN | مواسير PVC</h4>
                  <p className="text-[11px] text-slate-500">مقاسات متعددة وضغوط معتمدة</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">M&B | توصيلات PVC</h4>
                  <p className="text-[11px] text-slate-500">أكواع وتيهات ووصلات متكاملة</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">منظومة موحدة 100%</h4>
                  <p className="text-[11px] text-slate-500">جودة وضبط إنتاج في 7 مراحل</p>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-700/25 transition-all flex items-center gap-2 cursor-pointer hover:translate-y-px"
              >
                <FileText className="w-4 h-4" />
                <span>طلب تسعيرة وعرض سعر للمشاريع</span>
              </button>

              <button
                onClick={onOpenVeo}
                className="px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>استوديو تحريك الفيديو (Veo AI)</span>
              </button>

              <a
                href={`tel:${FACTORY_INFO.primaryPhone}`}
                className="px-4 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-2 font-mono"
                dir="ltr"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                {FACTORY_INFO.primaryPhone}
              </a>
            </div>

            {/* Quick Authorized Branches Link */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-bold text-slate-800">نقاط ومراكز البيع المعتمدة:</span>
              <button
                onClick={() => scrollTo('branches')}
                className="text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-200/80 hover:bg-blue-100 transition-colors"
              >
                <span>تعز (المركز الرئيسي) • عدن • إب • صنعاء</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Left Column (RTL End): Visual Showcase Collage */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main Showcase Card */}
              <div className="rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-800 shadow-2xl relative group">
                <img
                  src={factoryPipesImg}
                  alt="مواسير جيزان PVC في المصنع"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="inline-block px-3 py-1 rounded-md bg-blue-600/90 text-xs font-bold w-fit mb-2 backdrop-blur-xs">
                    خط إنتاج مواسير جيزان PVC
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    دقة تصنيع تلبي متطلبات المشاريع
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    مواسير PVC وتوصيلات M&B مصممة لتلبية احتياجات شبكات المياه، الصرف، والري.
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onSelectPhotoForVeo(factoryPipesImg)}
                      className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      تحريك هذه الصورة بفيديو Veo
                    </button>
                    <span className="text-slate-400 font-mono text-[11px]">ISO 1452 / DIN 8062</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails Row to Showcase Other Products */}
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                <div 
                  onClick={() => onSelectPhotoForVeo(mbFittingsImg)}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 cursor-pointer shadow-xs hover:shadow-md transition-all"
                >
                  <img
                    src={mbFittingsImg}
                    alt="توصيلات M&B"
                    referrerPolicy="no-referrer"
                    className="w-full h-20 sm:h-24 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center p-1 text-center">
                    <span className="text-[11px] font-bold text-white leading-tight">
                      توصيلات M&B
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => onSelectPhotoForVeo(irrigationImg)}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 cursor-pointer shadow-xs hover:shadow-md transition-all"
                >
                  <img
                    src={irrigationImg}
                    alt="شبكات الري الحديثة"
                    referrerPolicy="no-referrer"
                    className="w-full h-20 sm:h-24 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center p-1 text-center">
                    <span className="text-[11px] font-bold text-white leading-tight">
                      شبكات الري
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => onSelectPhotoForVeo(industrialImg)}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 cursor-pointer shadow-xs hover:shadow-md transition-all"
                >
                  <img
                    src={industrialImg}
                    alt="البنية التحتية والمقاولات"
                    referrerPolicy="no-referrer"
                    className="w-full h-20 sm:h-24 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center p-1 text-center">
                    <span className="text-[11px] font-bold text-white leading-tight">
                      البنية التحتية
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Quality Tag */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">خامات PVC نقية 100%</p>
                  <p className="text-[11px] text-slate-500">مقاومة لضغط حتى 16 بار</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
