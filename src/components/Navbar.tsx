import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, Sparkles, Layers, Award } from 'lucide-react';
import { FACTORY_INFO } from '../data/factoryData';

import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenVeo: () => void;
  onOpenQuote: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVeo,
  onOpenQuote,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification Bar with Phone Numbers */}
      <div className="bg-slate-950 text-slate-100 text-xs sm:text-sm py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">{FACTORY_INFO.fullName}</span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-amber-400 font-bold">{FACTORY_INFO.slogan}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">المبيعات والمشاريع:</span>
              <a
                href={`tel:${FACTORY_INFO.primaryPhone}`}
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-mono font-bold"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5" />
                {FACTORY_INFO.primaryPhone}
              </a>
              <span className="text-slate-600">-</span>
              <a
                href={`tel:${FACTORY_INFO.secondaryPhone}`}
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-mono font-bold"
                dir="ltr"
              >
                {FACTORY_INFO.secondaryPhone}
              </a>
            </div>

            <a
              href={FACTORY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-md text-xs transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              واتساب
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Title with Official Red Palm Emblem */}
        <div 
          onClick={() => scrollTo('hero')} 
          className="cursor-pointer group select-none"
        >
          <BrandLogo size="md" />
        </div>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-bold text-slate-700">
          <button
            onClick={() => scrollTo('about')}
            className={`px-2.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSection === 'about' ? 'text-blue-700 bg-blue-50' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            01 من نحن
          </button>
          <button
            onClick={() => scrollTo('products')}
            className={`px-2.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSection === 'products' ? 'text-blue-700 bg-blue-50' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            02 منتجاتنا
          </button>
          <button
            onClick={() => scrollTo('sectors')}
            className={`px-2.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSection === 'sectors' ? 'text-blue-700 bg-blue-50' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            03 مجالات الاستخدام
          </button>
          <button
            onClick={() => scrollTo('materials-strength')}
            className={`px-2.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSection === 'materials-strength' ? 'text-blue-700 bg-blue-50' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            04-05 المواد والقوة
          </button>
          <button
            onClick={() => scrollTo('quality')}
            className={`px-2.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSection === 'quality' ? 'text-blue-700 bg-blue-50' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            06 ضبط الإنتاج
          </button>
          <button
            onClick={() => scrollTo('why-choose-us')}
            className={`px-2.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSection === 'why-choose-us' ? 'text-blue-700 bg-blue-50' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            07-08 للسباكين والمزارعين
          </button>
          <button
            onClick={() => scrollTo('branches')}
            className={`px-2.5 py-2 rounded-lg transition-colors cursor-pointer font-extrabold ${
              activeSection === 'branches' ? 'text-blue-700 bg-blue-50' : 'text-blue-900 bg-blue-50/50 hover:text-blue-700 hover:bg-blue-100'
            }`}
          >
            مراكز البيع
          </button>
          <button
            onClick={() => scrollTo('news-section')}
            className={`px-2.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              activeSection === 'news-section' ? 'text-red-700 bg-red-50' : 'text-slate-700 hover:text-red-700 hover:bg-red-50/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>الأخبار والتقنية</span>
          </button>
          <button
            onClick={() => scrollTo('calculator')}
            className={`px-2.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSection === 'calculator' ? 'text-blue-700 bg-blue-50' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            الحاسبة
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onOpenVeo}
            id="nav-veo-btn"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>تحريك الفيديو (Veo)</span>
          </button>

          <button
            onClick={onOpenQuote}
            id="nav-quote-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-sm shadow-blue-600/30 transition-all hover:translate-y-px cursor-pointer"
          >
            <span>طلب تسعيرة</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label="القائمة"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 text-sm font-medium">
          <button
            onClick={() => scrollTo('about')}
            className="w-full text-right py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-800"
          >
            01 | من نحن
          </button>
          <button
            onClick={() => scrollTo('products')}
            className="w-full text-right py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-800"
          >
            02 | منتجاتنا (JIZAN & M&B)
          </button>
          <button
            onClick={() => scrollTo('sectors')}
            className="w-full text-right py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-800"
          >
            03 | مجالات الاستخدام
          </button>
          <button
            onClick={() => scrollTo('materials-strength')}
            className="w-full text-right py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-800"
          >
            04-05 | المواد الأساسية والقوة والسماكة
          </button>
          <button
            onClick={() => scrollTo('quality')}
            className="w-full text-right py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-800"
          >
            06 | الجودة وضبط الإنتاج
          </button>
          <button
            onClick={() => scrollTo('why-choose-us')}
            className="w-full text-right py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-800"
          >
            07-08 | لماذا يختارنا السباكون والمزارعون؟
          </button>
          <button
            onClick={() => scrollTo('branches')}
            className="w-full text-right py-2 px-3 rounded-lg bg-blue-50 text-blue-900 font-bold border border-blue-200"
          >
            نقاط ومراكز البيع المعتمدة (تعز • عدن • إب • صنعاء)
          </button>
          <button
            onClick={() => scrollTo('news-section')}
            className="w-full text-right py-2 px-3 rounded-lg bg-red-50 text-red-900 font-bold border border-red-200 flex items-center justify-between"
          >
            <span>آخر الأخبار والتحديثات التقنية (Google Search)</span>
            <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full">جديد</span>
          </button>
          <button
            onClick={() => scrollTo('calculator')}
            className="w-full text-right py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-800"
          >
            حاسبة المواصفات والتدفق
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVeo();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              استوديو تحريك الفيديو (Veo AI)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 text-center"
            >
              طلب تسعيرة وعرض سعر للمشاريع
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
