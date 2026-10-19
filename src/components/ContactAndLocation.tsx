import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, Mail, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { FACTORY_INFO } from '../data/factoryData';

export const ContactAndLocation: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider">
            تواصل معنا
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            خدمة العملاء، المبيعات والدعم الفني
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            فريقنا الهندسي والتجاري جاهز للرد على استفساراتكم وتزويدكم بعروض الأسعار والاستشارات الفنية لجميع المشاريع في أنحاء الجمهورية اليمنية.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Phone Numbers */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">أرقام الاتصال المباشر</h3>
              <p className="text-xs text-slate-400">للتواصل المباشر مع إدارة المبيعات</p>
            </div>
            <div className="space-y-2 pt-2">
              <a
                href={`tel:${FACTORY_INFO.primaryPhone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-blue-500 text-blue-400 hover:text-blue-300 font-mono font-bold text-base transition-colors"
                dir="ltr"
              >
                <span>{FACTORY_INFO.primaryPhone}</span>
                <Phone className="w-4 h-4 text-slate-500" />
              </a>

              <a
                href={`tel:${FACTORY_INFO.secondaryPhone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-blue-500 text-blue-400 hover:text-blue-300 font-mono font-bold text-base transition-colors"
                dir="ltr"
              >
                <span>{FACTORY_INFO.secondaryPhone}</span>
                <Phone className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>

          {/* WhatsApp Direct */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">المراسلة عبر الواتساب</h3>
              <p className="text-xs text-slate-400">إرسال كشوفات المواد والمخططات</p>
            </div>
            <div className="space-y-2 pt-2">
              <a
                href={FACTORY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 hover:border-emerald-500 text-emerald-300 font-bold text-xs transition-colors"
              >
                <span>محادثة واتساب: {FACTORY_INFO.primaryPhone}</span>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </a>

              <a
                href={FACTORY_INFO.whatsappUrlAlt}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 hover:border-emerald-500 text-emerald-300 font-bold text-xs transition-colors"
              >
                <span>محادثة واتساب: {FACTORY_INFO.secondaryPhone}</span>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Work Hours & Locations */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">أوقات العمل والتوزيع</h3>
              <p className="text-xs text-slate-400">الجمهورية اليمنية</p>
            </div>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{FACTORY_INFO.workHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>إمكانية التوريد والشحن لكافة المحافظات</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>استشارات فنية مجانية لمقاولي المشاريع</span>
              </div>
            </div>
          </div>

        </div>

        {/* Authorized Sales Points & Distribution Centers Quick Directory */}
        <div className="mb-12 rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                تغطية جغرافية شاملة
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                نقاط ومراكز البيع المعتمدة في المحافظات
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                تتوفر منتجات مصنع جيزان للصناعات البلاستيكية عبر شبكة وكلائنا ومراكز البيع المباشر:
              </p>
            </div>

            <a
              href="#branches"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shrink-0 text-center"
            >
              عرض التفاصيل الكاملة للمراكز
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Taiz */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">المركز الرئيسي</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">تعز</span>
                </div>
                <h4 className="text-sm font-bold text-white">الجندية - خط صنعاء</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">مقابل حوش مصنع شملان - مستودعات التوزيع المركزية</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="font-mono text-sm font-bold text-blue-400 text-center" dir="ltr">
                  779445115
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href="tel:779445115"
                    className="py-1.5 text-center text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                  >
                    اتصال
                  </a>
                  <a
                    href="https://wa.me/967779445115"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 text-center text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                  >
                    واتساب
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Aden */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">فرع عدن</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">عدن</span>
                </div>
                <h4 className="text-sm font-bold text-white">جولة الكراع</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">أمام هناجر المؤسسة الاقتصادية - شحنات المقاولات</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="font-mono text-sm font-bold text-blue-400 text-center" dir="ltr">
                  771900777
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href="tel:771900777"
                    className="py-1.5 text-center text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                  >
                    اتصال
                  </a>
                  <a
                    href="https://wa.me/967771900777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 text-center text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                  >
                    واتساب
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Ibb */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">نقطة بيع إب</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">إب</span>
                </div>
                <h4 className="text-sm font-bold text-white">الدائري الغربي</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">مقابل فندق الفخامة - توريد مباشر لكبار المقاولين</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="font-mono text-sm font-bold text-blue-400 text-center" dir="ltr">
                  784137077
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href="tel:784137077"
                    className="py-1.5 text-center text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                  >
                    اتصال
                  </a>
                  <a
                    href="https://wa.me/967784137077"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 text-center text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                  >
                    واتساب
                  </a>
                </div>
              </div>
            </div>

            {/* 4. Sana'a */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">نقطة توزيع صنعاء</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">صنعاء</span>
                </div>
                <h4 className="text-sm font-bold text-white">شارع الأربعين</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">بالقرب من بيت بوس - توزيع مواسير UPVC 110mm</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="font-mono text-sm font-bold text-blue-400 text-center" dir="ltr">
                  771200777
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href="tel:771200777"
                    className="py-1.5 text-center text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                  >
                    اتصال
                  </a>
                  <a
                    href="https://wa.me/967771200777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 text-center text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                  >
                    واتساب
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Commitment Banner */}
        <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            نلتزم دوماً بـ <strong className="text-white">الجودة، المصداقية في التعامل، سرعة الاستجابة، وتوفير الدعم الفني</strong> لبناء علاقات شراكة طويلة الأمد مع جميع عملائنا وموردينا ومقاولي المشاريع.
          </p>
        </div>

      </div>
    </section>
  );
};
