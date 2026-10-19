import React, { useState } from 'react';
import { AUTHORIZED_BRANCHES, BRANCHES_INFO } from '../data/factoryData';
import { BranchItem } from '../types';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Building2, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowUpRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AuthorizedBranchesProps {
  onOpenQuoteWithBranch?: (branchCity: string) => void;
}

export const AuthorizedBranchesSection: React.FC<AuthorizedBranchesProps> = ({
  onOpenQuoteWithBranch,
}) => {
  const [selectedGov, setSelectedGov] = useState<string>('all');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const filteredBranches = AUTHORIZED_BRANCHES.filter((b) => {
    if (selectedGov === 'all') return true;
    return b.governorate === selectedGov;
  });

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  return (
    <section id="branches" className="py-16 sm:py-24 bg-linear-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 text-blue-900 text-xs sm:text-sm font-bold border border-blue-200 shadow-2xs">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span>شبكة الوكلاء ومراكز التوزيع الرسمية</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {BRANCHES_INFO.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {BRANCHES_INFO.intro}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{BRANCHES_INFO.qualityStandard}</span>
          </div>

          {/* Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedGov('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedGov === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              جميع المراكز ({AUTHORIZED_BRANCHES.length})
            </button>
            <button
              onClick={() => setSelectedGov('تعز')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedGov === 'تعز'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>تعز • المركز الرئيسي (الجندية)</span>
            </button>
            <button
              onClick={() => setSelectedGov('عدن')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedGov === 'عدن'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>عدن • جولة الكراع</span>
            </button>
            <button
              onClick={() => setSelectedGov('إب')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedGov === 'إب'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>إب • الدائري الغربي</span>
            </button>
            <button
              onClick={() => setSelectedGov('صنعاء')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedGov === 'صنعاء'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>صنعاء • شارع الأربعين</span>
            </button>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {filteredBranches.map((branch, index) => {
            const isHQ = branch.isMain;
            const isCopied = copiedPhone === branch.phone;

            return (
              <div
                key={branch.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                  isHQ
                    ? 'bg-linear-to-br from-blue-950 via-slate-900 to-blue-900 text-white border-2 border-blue-500/40 shadow-xl'
                    : 'bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-300'
                }`}
              >
                {/* Background ambient glow for HQ */}
                {isHQ && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                )}

                <div className="space-y-6 relative z-10">
                  {/* Top Bar: Number & Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-slate-200/20">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isHQ ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                      }`}>
                        0{index + 1}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                        isHQ
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${isHQ ? 'bg-amber-400' : 'bg-emerald-500'} animate-pulse`} />
                        <span>{branch.badge}</span>
                      </span>
                    </div>

                    <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md ${
                      isHQ ? 'bg-white/10 text-blue-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {branch.governorate}
                    </span>
                  </div>

                  {/* Branch Name & Location */}
                  <div className="space-y-3">
                    <h3 className={`text-xl sm:text-2xl font-black leading-snug flex items-center gap-2.5 ${
                      isHQ ? 'text-white' : 'text-slate-900'
                    }`}>
                      <Building2 className={`w-6 h-6 shrink-0 ${isHQ ? 'text-amber-400' : 'text-blue-600'}`} />
                      <span>{branch.name}</span>
                    </h3>

                    {/* Exact Address */}
                    <div className={`p-3.5 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm font-medium ${
                      isHQ 
                        ? 'bg-white/10 text-slate-200 border border-white/10' 
                        : 'bg-slate-50 text-slate-700 border border-slate-200/80'
                    }`}>
                      <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${isHQ ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div className="space-y-0.5">
                        <span className={`text-[11px] block font-bold uppercase tracking-wider ${isHQ ? 'text-blue-300' : 'text-slate-400'}`}>
                          الموقع والعنوان الدقيق:
                        </span>
                        <p className="leading-relaxed font-semibold">
                          {branch.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Supply & Description */}
                  <div className="space-y-2">
                    <span className={`text-xs font-bold block ${isHQ ? 'text-slate-300' : 'text-slate-500'}`}>
                      الوصف والتوريد المعتمد:
                    </span>
                    <p className={`text-xs sm:text-sm leading-relaxed p-3.5 rounded-2xl border ${
                      isHQ 
                        ? 'bg-blue-900/30 border-blue-800 text-slate-200' 
                        : 'bg-blue-50/50 border-blue-100 text-slate-700'
                    }`}>
                      {branch.supplyDescription}
                    </p>
                  </div>

                  {/* Highlights Bullet Points */}
                  <div className="space-y-1.5 pt-1">
                    {branch.highlights.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isHQ ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span className={isHQ ? 'text-slate-300' : 'text-slate-600'}>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom Actions: Call + WhatsApp + Quote */}
                <div className={`pt-6 mt-6 border-t ${isHQ ? 'border-white/10' : 'border-slate-100'} space-y-3`}>
                  
                  {/* Phone & Direct Contact Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${isHQ ? 'text-slate-400' : 'text-slate-500'}`}>
                        رقم الهاتف:
                      </span>
                      <a
                        href={`tel:${branch.phone}`}
                        className={`font-mono text-base font-black hover:underline ${
                          isHQ ? 'text-amber-400' : 'text-blue-700'
                        }`}
                        dir="ltr"
                      >
                        {branch.phone}
                      </a>
                    </div>

                    <button
                      onClick={() => handleCopyPhone(branch.phone)}
                      className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                        isHQ 
                          ? 'bg-white/10 text-slate-200 hover:bg-white/20' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="نسخ الرقم"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={`tel:${branch.phone}`}
                      className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isHQ
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                          : 'bg-blue-700 hover:bg-blue-800 text-white shadow-xs'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>اتصال مباشر</span>
                    </a>

                    <a
                      href={branch.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>واتساب الفرع</span>
                    </a>
                  </div>

                  {/* Quote action if requested */}
                  {onOpenQuoteWithBranch && (
                    <button
                      onClick={() => onOpenQuoteWithBranch(branch.city)}
                      className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                        isHQ
                          ? 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10'
                          : 'text-blue-700 hover:text-blue-800 bg-blue-50/70 hover:bg-blue-50'
                      }`}
                    >
                      <span>طلب تسعيرة وتوريد عبر {branch.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                </div>

              </div>
            );
          })}
        </div>

        {/* Wholesale & Infrastructure Direct Supply Assurance Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-linear-to-r from-blue-900 via-slate-900 to-indigo-950 text-white shadow-lg border border-slate-800">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold">
                <Truck className="w-4 h-4" />
                <span>جاهزية لوجستية وتوريد مباشر لكافة المحافظات</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                تلبية طلبيات كبار المقاولين وتجار الجملة والمشاريع الكبرى
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                مستودعاتنا المركزية ونقاط التوزيع المعتمدة في تعز، عدن، إب، وصنعاء مجهزة لتأمين التوريد الفوري للمواسير البلاستيكية UPVC، مركبات المواسير بمواصفات ألمانية، وتوصيلات M&B بأعلى موثوقية تشغيلية.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <a
                href={AUTHORIZED_BRANCHES[0].whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>تواصل مع الإدارة المركزية</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
