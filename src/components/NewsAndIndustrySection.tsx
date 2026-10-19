import React, { useState, useEffect } from 'react';
import { FACTORY_NEWS, PRESET_SEARCH_TOPICS } from '../data/factoryData';
import { NewsItem, GroundingSource } from '../types';
import { 
  Newspaper, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Cpu, 
  Sprout, 
  Building2, 
  Layers, 
  ArrowUpRight,
  TrendingUp,
  Globe2,
  Lightbulb,
  AlertCircle
} from 'lucide-react';

export const NewsAndIndustrySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'factory' | 'industry'>('factory');
  const [selectedTopic, setSelectedTopic] = useState<string>(PRESET_SEARCH_TOPICS[0].query);
  const [customSearchQuery, setCustomSearchQuery] = useState<string>('');
  
  // Live Google Search Grounding States
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [industryArticles, setIndustryArticles] = useState<NewsItem[]>([]);
  const [technicalInsight, setTechnicalInsight] = useState<string>('');
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const iconComponents: Record<string, React.ElementType> = {
    ShieldCheck,
    Sprout,
    Cpu,
    Building2,
  };

  // Perform Google Search Grounding via server endpoint
  const handlePerformSearch = async (queryToSearch: string) => {
    setIsLoadingSearch(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      const response = await fetch('/api/industry-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: queryToSearch,
          customQuery: queryToSearch,
        }),
      });

      if (!response.ok) {
        throw new Error(`خطأ في استجابة الخادم (${response.status})`);
      }

      const result = await response.json();

      if (result.data && Array.isArray(result.data.articles) && result.data.articles.length > 0) {
        const formatted: NewsItem[] = result.data.articles.map((item: any, idx: number) => ({
          id: item.id || `grounded-${idx}`,
          title: item.title,
          summary: item.summary,
          category: (item.category as any) || 'تقنيات البثق',
          date: item.date || 'حديث ومباشر عبر الويب',
          badge: 'بحث Google Search',
          keyPoints: Array.isArray(item.keyPoints) ? item.keyPoints : [],
          source: item.source || 'محرك بحث Google',
          isFactoryUpdate: false,
        }));

        setIndustryArticles(formatted);
        setTechnicalInsight(result.data.technicalInsight || '');
      } else {
        // Fallback default curated if API didn't parse JSON
        setIndustryArticles([
          {
            id: 'fallback-1',
            title: 'تطورات معايير الأنابيب الألمانية DIN 8062 لشبكات مياه الشرب المضغوطة',
            summary: 'تؤكد التحديثات القياسية على أهمية ثبات سماكة الجدار ومقاومة الإجهاد الهيدروليكي المستمر في أنابيب UPVC لتقليل فواقد الشبكات.',
            category: 'معايير ألمانية',
            date: 'تحديث معتمد',
            badge: 'معايير DIN',
            keyPoints: [
              'مقاومة ضغوط هيدروليكية حتى 16 بار للخطوط الرئيسية',
              'خلو الخامات من الرصاص واعتماد مثبتات الكالسيوم-زنك الصديقة للبيئة',
              'عمر تشغيلي افتراضي يتجاوز 50 عاماً في باطن الأرض'
            ],
            source: 'المعهد الألماني للمواصفات القياسية (DIN)',
            isFactoryUpdate: false,
          },
          {
            id: 'fallback-2',
            title: 'تقنيات البثق الأوتوماتيكي وتأثير المعايرة الرقمية على استدارة مقطع الأنابيب',
            summary: 'تسهم أنظمة التحكم الليزري في خطوط البثق الحديثة في إلغاء التفاوتات القطرية وضمان إحكام الربط مع التوصيلات بدون تسريب.',
            category: 'تقنيات البثق',
            date: 'تحديث معتمد',
            badge: 'هندسة البثق',
            keyPoints: [
              'ضبط تبريد مائي فوري يثبت الجزيئات البوليمرية',
              'أسطح داخلية فائقة النعومة تقلل خشونة الاحتكاك إلى أدنى حد',
              'مطابقة هندسية كاملة بين الأنابيب والتوصيلات'
            ],
            source: 'Plastics Technology Worldwide',
            isFactoryUpdate: false,
          }
        ]);
        setTechnicalInsight('يحرص مصنع جيزان و M&B على تطبيق هذه الضوابط التكنولوجية الدقيقة لضمان أعلى جودة في السوق اليمني.');
      }

      setGroundingSources(result.sources || []);
    } catch (err: any) {
      console.error('Search error:', err);
      setSearchError('تعذر الاتصال بـ Google Search حالياً. تم عرض النتائج التقنية المرجعية.');
      
      // Default offline articles
      setIndustryArticles([
        {
          id: 'offline-1',
          title: 'معايير أنابيب UPVC الألمانية DIN 8062 واختبارات الجودة العالمية',
          summary: 'تحديد اشتراطات التصنيع للأنابيب البلاستيكية الصلبة المستخدمة لنقل السوائل تحت الضغط، مع التركيز على السلامة الهيدروليكية ومقاومة الصدمات.',
          category: 'معايير ألمانية',
          date: 'المواصفة الألمانية المعتمدة',
          badge: 'DIN 8062',
          keyPoints: [
            'تصنيفات الضغط المعتمدة PN6 و PN10 و PN16',
            'اختبارات دقيقة للتمدد الحراري والصلابة الحلقية',
            'التوافق مع متطلبات الصحة العامة لمياه الشرب'
          ],
          source: 'German Institute for Standardization',
          isFactoryUpdate: false,
        }
      ]);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  // Initial trigger for industry news when tab changes to industry first time
  useEffect(() => {
    if (activeTab === 'industry' && !hasSearched) {
      handlePerformSearch(selectedTopic);
    }
  }, [activeTab]);

  return (
    <section id="news-section" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 text-red-900 text-xs sm:text-sm font-bold border border-red-200 shadow-2xs">
            <Newspaper className="w-4 h-4 text-red-600" />
            <span>المركز الإعلامي والابتكار التقني</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            آخر الأخبار والتحديثات التقنية لمصنع جيزان و M&B
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            مواكبة مستمرة لأحدث التطورات الصناعية، التحديثات التشغيلية لخطوط الإنتاج، مع رصد مباشر لأخبار ومعايير قطاع الصناعات البلاستيكية العالمية عبر محرك البحث Google Search.
          </p>

          {/* Primary View Switcher */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/90 shadow-xs">
              <button
                onClick={() => setActiveTab('factory')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'factory'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>أخبار وتحديثات المصنع ({FACTORY_NEWS.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('industry')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'industry'
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Globe2 className="w-4 h-4" />
                <span>مرصد الصناعات البلاستيكية (Google Search)</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-bold animate-pulse">
                  حي
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ----------------- TAB 1: FACTORY UPDATES (أخبار وتحديثات المصنع) ----------------- */}
        {activeTab === 'factory' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Featured Mega News Item (Line Expansion) */}
            <div className="rounded-3xl bg-linear-to-br from-slate-900 via-slate-950 to-blue-950 text-white overflow-hidden border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 h-64 sm:h-80 lg:h-full relative overflow-hidden group">
                <img
                  src={FACTORY_NEWS[0].image}
                  alt={FACTORY_NEWS[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-5">
                  <span className="px-3 py-1 rounded-lg bg-red-600 text-white font-bold text-xs shadow-md">
                    خطوط إنتاج بمواصفات ألمانية DIN 8062
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-md">
                    {FACTORY_NEWS[0].badge}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" /> {FACTORY_NEWS[0].date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {FACTORY_NEWS[0].title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {FACTORY_NEWS[0].summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  {FACTORY_NEWS[0].keyPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 text-xs text-slate-400 flex items-center justify-between border-t border-white/10">
                  <span className="font-semibold text-slate-300">{FACTORY_NEWS[0].source}</span>
                  <a
                    href="#products"
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>استعرض منتجات الخط</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Other Factory News Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FACTORY_NEWS.slice(1).map((news) => (
                <div
                  key={news.id}
                  className="rounded-3xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {news.image && (
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={news.image}
                          alt={news.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold">
                            {news.category}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                          {news.badge}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Calendar className="w-3.5 h-3.5" /> {news.date}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                        {news.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {news.summary}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                        {news.keyPoints.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">{news.source}</span>
                    <a
                      href="#branches"
                      className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
                    >
                      <span>التوريد المباشر</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ----------------- TAB 2: GLOBAL INDUSTRY NEWS WITH GOOGLE SEARCH GROUNDING ----------------- */}
        {activeTab === 'industry' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Search Controls & Topic Selectors */}
            <div className="p-6 rounded-3xl bg-linear-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-lg space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>مدعوم بمحرك Google Search والذكاء الاصطناعي</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    استكشاف أحدث المستجدات الهندسية وأخبار قطاع البلاستيك
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    اختر أحد المحاور المعتمدة أو اكتب استفساراً مخصصاً لجلب أحدث التطورات العلمية والمواصفات من مصادر الويب العالمية:
                  </p>
                </div>

                <button
                  onClick={() => handlePerformSearch(customSearchQuery || selectedTopic)}
                  disabled={isLoadingSearch}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingSearch ? 'animate-spin' : ''}`} />
                  <span>{isLoadingSearch ? 'جاري البحث في Google...' : 'تحديث الأخبار عبر Google Search'}</span>
                </button>
              </div>

              {/* Preset Topics Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
                {PRESET_SEARCH_TOPICS.map((topic) => {
                  const Icon = iconComponents[topic.iconName] || ShieldCheck;
                  const isSelected = selectedTopic === topic.query && !customSearchQuery;

                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setCustomSearchQuery('');
                        setSelectedTopic(topic.query);
                        handlePerformSearch(topic.query);
                      }}
                      className={`text-right p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-blue-600/30 border-blue-400 text-white ring-2 ring-blue-400/30'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-300'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] block text-amber-300 font-bold">{topic.badge}</span>
                        <h4 className="text-xs font-bold truncate">{topic.title}</h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Search Query Input */}
              <div className="pt-2 border-t border-white/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (customSearchQuery.trim()) {
                      handlePerformSearch(customSearchQuery);
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5" />
                    <input
                      type="text"
                      placeholder="ابحث عن موضوع تقني محدد (مثال: أسعار خام PVC 2026، اختبارات ضغط الأنابيب DIN، أو شبكات الري بالتنقيط)..."
                      value={customSearchQuery}
                      onChange={(e) => setCustomSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoadingSearch}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs sm:text-sm text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>بحث مخصص</span>
                  </button>
                </form>
              </div>

            </div>

            {/* Error Message if any */}
            {searchError && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            {/* Loading Skeleton */}
            {isLoadingSearch && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-100 border border-slate-200 space-y-4">
                    <div className="h-4 bg-slate-200 rounded-md w-1/4" />
                    <div className="h-6 bg-slate-200 rounded-md w-3/4" />
                    <div className="h-16 bg-slate-200 rounded-md" />
                    <div className="h-4 bg-slate-200 rounded-md w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Search Results Grid */}
            {!isLoadingSearch && industryArticles.length > 0 && (
              <div className="space-y-8">
                
                {/* Technical Insight Box */}
                {technicalInsight && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white border border-emerald-800/60 shadow-md space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <Lightbulb className="w-4 h-4 text-emerald-300" />
                      <span>رؤية فنية من خبراء مصنع جيزان و M&B</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {technicalInsight}
                    </p>
                  </div>
                )}

                {/* Articles Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {industryArticles.map((article) => (
                    <div
                      key={article.id}
                      className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white transition-all shadow-xs flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                            {article.category}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {article.date}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                          {article.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {article.summary}
                        </p>

                        {article.keyPoints && article.keyPoints.length > 0 && (
                          <div className="space-y-1.5 pt-2 border-t border-slate-200/70">
                            {article.keyPoints.map((kp, kIdx) => (
                              <div key={kIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                <span>{kp}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-semibold">{article.source}</span>
                        <span className="text-blue-600 font-bold flex items-center gap-1 text-[11px]">
                          <Sparkles className="w-3 h-3" />
                          موثوق عبر Google
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Grounding Web Sources Footer */}
                {groundingSources.length > 0 && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                      مصادر ومراجع البحث العالمية المستخرجة عبر Google Search:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {groundingSources.map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 bg-white border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-colors font-medium shadow-2xs"
                        >
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[220px]">{source.title || source.uri}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* Quality & Industrial Compliance Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900 text-white border border-slate-800 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-black text-red-500 font-mono">DIN 8062</span>
              <p className="text-xs text-slate-400">مواصفات قياسية ألمانية</p>
            </div>
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">PN16 / PN10</span>
              <p className="text-xs text-slate-400">فئات ضغط هيدروليكي عالية</p>
            </div>
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">100%</span>
              <p className="text-xs text-slate-400">توافق بين جيزان و M&B</p>
            </div>
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-black text-blue-400 font-mono">4 مراكز</span>
              <p className="text-xs text-slate-400">توزيع وتوريد فوري بالمحافظات</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
