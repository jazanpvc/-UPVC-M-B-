import React from 'react';
import { FACTORY_INFO } from '../data/factoryData';
import { ArrowUp, MessageSquare } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />

            <p className="text-slate-400 leading-relaxed max-w-lg text-xs">
              {FACTORY_INFO.about01.description}
            </p>

            <div className="space-y-1">
              <p className="font-bold text-amber-400 text-sm">
                "{FACTORY_INFO.slogan}"
              </p>
              <p className="text-[11px] text-slate-400">
                {FACTORY_INFO.subSlogan}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-bold text-slate-200 text-sm">أقسام ومحتويات المنظومة</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">01 | من نحن</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">02 | منتجاتنا (مواسير وتوصيلات)</a>
              </li>
              <li>
                <a href="#sectors" className="hover:text-white transition-colors">03 | مجالات الاستخدام</a>
              </li>
              <li>
                <a href="#materials-strength" className="hover:text-white transition-colors">04-05 | المواد الأساسية والقوة</a>
              </li>
              <li>
                <a href="#quality" className="hover:text-white transition-colors">06 | الجودة وضبط الإنتاج</a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors">07-08 | للسباكين والمزارعين</a>
              </li>
              <li>
                <a href="#branches" className="hover:text-amber-400 text-amber-300 font-bold transition-colors">نقاط ومراكز البيع المعتمدة (تعز • عدن • إب • صنعاء)</a>
              </li>
              <li>
                <a href="#news-section" className="hover:text-red-400 text-red-300 font-bold transition-colors">آخر الأخبار ومرصد البلاستيك (Google Search)</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">حاسبة المواصفات والتدفق</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="font-bold text-slate-200 text-sm">معلومات التواصل والمبيعات</h5>
            <div className="space-y-2">
              <p className="text-slate-300">أرقام المبيعات والتوريد المباشر:</p>
              <div className="font-mono text-sm text-blue-400 font-bold space-y-1" dir="ltr">
                <a href={`tel:${FACTORY_INFO.primaryPhone}`} className="block hover:underline">
                  {FACTORY_INFO.primaryPhone}
                </a>
                <a href={`tel:${FACTORY_INFO.secondaryPhone}`} className="block hover:underline">
                  {FACTORY_INFO.secondaryPhone}
                </a>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {FACTORY_INFO.address}
              </p>
              <div className="pt-2">
                <a
                  href={FACTORY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>محادثة واتساب سريعة</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {FACTORY_INFO.fullName} - الجمهورية اليمنية
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors cursor-pointer"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
