import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Upload, Video, RefreshCw, Download, Play, Pause, Maximize2, AlertCircle, CheckCircle2, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { VEO_MOTION_PROMPTS } from '../data/factoryData';
import factoryPipesImg from '../assets/images/jizan_pipes_factory_1788364853190.jpg';
import mbFittingsImg from '../assets/images/mb_fittings_showcase_1788364871292.jpg';
import irrigationImg from '../assets/images/modern_irrigation_field_1788364891132.jpg';
import industrialImg from '../assets/images/industrial_plant_pipes_1788364911632.jpg';

interface VeoVideoStudioProps {
  initialImage?: string | null;
  onClose?: () => void;
}

export const VeoVideoStudio: React.FC<VeoVideoStudioProps> = ({ initialImage, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string>(initialImage || factoryPipesImg);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState<string>(VEO_MOTION_PROMPTS[0].prompt);
  
  // Generation States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [progressStep, setProgressStep] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const timerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  // Sync if initialImage changes
  useEffect(() => {
    if (initialImage) {
      setSelectedImage(initialImage);
    }
  }, [initialImage]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('يرجى اختيار ملف صورة صالح (PNG, JPEG, WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
        setErrorMessage(null);
        setVideoUrl(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Preset sample images
  const sampleImages = [
    { title: 'أنابيب جيزان في المصنع', url: factoryPipesImg },
    { title: 'توصيلات M&B البلاستيكية', url: mbFittingsImg },
    { title: 'أنظمة الري الحديثة', url: irrigationImg },
    { title: 'البنية التحتية والمصانع', url: industrialImg },
  ];

  // Initiate Video Generation with Veo
  const handleGenerateVideo = async () => {
    if (!selectedImage) {
      setErrorMessage('يرجى اختيار صورة أولاً لتحريكها');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setVideoUrl(null);
    setProgressStep(1);
    setStatusMessage('جاري تهيئة نموذج Veo وإرسال الصورة...');
    setElapsedSeconds(0);

    // Start timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    try {
      // Step 1: Call /api/generate-video
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          prompt: prompt,
          aspectRatio: aspectRatio,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `فشل بدء العملية (رمز الاستجابة: ${response.status})`);
      }

      const { operationName } = await response.json();
      if (!operationName) {
        throw new Error('لم يتم استلام اسم العملية من الخادم');
      }

      console.log('Veo generation started with operation:', operationName);
      setProgressStep(2);
      setStatusMessage('النموذج يحلل حركة العناصر والسوائل في المشهد...');

      // Step 2: Poll /api/video-status
      let attempts = 0;
      const maxAttempts = 100; // ~5 minutes max
      const pollInterval = 3500;

      const pollStatus = async () => {
        if (attempts >= maxAttempts) {
          throw new Error('استغرقت العملية وقتاً أطول من المتوقع. يرجى المحاولة مرة أخرى.');
        }
        attempts++;

        if (attempts === 4) {
          setProgressStep(3);
          setStatusMessage('جاري رندرة وتوليد إطارات الفيديو السينمائي بنموذج veo-3.1-fast-generate-preview...');
        } else if (attempts === 8) {
          setStatusMessage('إضافة التأثيرات الحركية والتفاصيل الهيدروليكية الدقيقة...');
        }

        const statusRes = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName }),
        });

        if (!statusRes.ok) {
          const errData = await statusRes.json().catch(() => ({}));
          throw new Error(errData.error || 'خطأ أثناء متابعة حالة المعالجة');
        }

        const statusData = await statusRes.json();

        if (statusData.error) {
          throw new Error(statusData.error);
        }

        if (statusData.done && statusData.ready) {
          // Completed! Step 3: Download
          setProgressStep(4);
          setStatusMessage('اكتملت الرندرة! جاري تنزيل ملف الفيديو وتشغيله...');
          
          const dlRes = await fetch('/api/video-download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName }),
          });

          if (!dlRes.ok) {
            throw new Error('فشل تنزيل ملف الفيديو النهائي من الخادم');
          }

          const blob = await dlRes.blob();
          const videoBlobUrl = URL.createObjectURL(blob);
          setVideoUrl(videoBlobUrl);
          setIsGenerating(false);
          if (timerRef.current) clearInterval(timerRef.current);
          return;
        }

        // Wait and poll again
        setTimeout(pollStatus, pollInterval);
      };

      // Launch first poll after 3 seconds
      setTimeout(pollStatus, 3000);

    } catch (err: any) {
      console.error('Error generating video:', err);
      setIsGenerating(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setErrorMessage(err?.message || 'حدث خطأ غير متوقع أثناء توليد الفيديو.');
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="veo-studio" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>ميزة الذكاء الاصطناعي التوليدي: Veo Video Generations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              استوديو تحريك الصور إلى فيديو بنموذج Veo
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              قم برفع أي صورة للأنابيب أو المشاريع وحوّلها إلى مقطع فيديو سينمائي متحرك بجودة فائقة باستخدام نموذج{' '}
              <span className="font-mono text-amber-400 font-bold">veo-3.1-fast-generate-preview</span>
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (RTL Start) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Image Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>1. اختر أو ارفع صورة المصدر</span>
                <span className="text-[11px] text-blue-400 font-normal">PNG / JPEG</span>
              </label>

              {/* Upload Drop Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition-colors group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-400 mx-auto mb-2 transition-colors" />
                <p className="text-xs font-bold text-slate-200">
                  انقر هنا لرفع صورة من جهازك
                </p>
                <p className="text-[11px] text-slate-400">
                  صور الأنابيب، التوصيلات، شبكات الري، أو المنشآت
                </p>
              </div>

              {/* Sample Presets */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] text-slate-400 font-medium">أو اختر من صور المصنع الجاهزة:</p>
                <div className="grid grid-cols-4 gap-2">
                  {sampleImages.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImage(sample.url);
                        setVideoUrl(null);
                        setErrorMessage(null);
                      }}
                      className={`relative rounded-xl overflow-hidden border transition-all h-16 ${
                        selectedImage === sample.url
                          ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105'
                          : 'border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                      title={sample.title}
                    >
                      <img
                        src={sample.url}
                        alt={sample.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Aspect Ratio Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. أبعاد الفيديو المطلوب (Aspect Ratio)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    aspectRatio === '16:9'
                      ? 'bg-blue-600/20 border-blue-500 text-white font-bold ring-1 ring-blue-500'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-sm font-bold">16:9 عريض (Landscape)</div>
                  <div className="text-[11px] text-slate-400">مثالي للشاشات والمواقع والمشاريع</div>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    aspectRatio === '9:16'
                      ? 'bg-blue-600/20 border-blue-500 text-white font-bold ring-1 ring-blue-500'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-sm font-bold">9:16 طولي (Portrait)</div>
                  <div className="text-[11px] text-slate-400">مثالي للموبايل وقصص التواصل</div>
                </button>
              </div>
            </div>

            {/* 3. Prompt & Presets */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>3. وصف الحركة المطلوب (Motion Prompt)</span>
                <span className="text-[11px] text-slate-500 font-normal">اختياري / قابل للتعديل</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="اكتب وصف الحركة المرغوبة بالفيديو..."
                className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                dir="auto"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {VEO_MOTION_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(p.prompt)}
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleGenerateVideo}
                disabled={isGenerating}
                className={`w-full py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isGenerating
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-indigo-600/30 hover:scale-[1.01]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-indigo-400" />
                    <span>جاري توليد الفيديو بنموذج Veo ({formatTime(elapsedSeconds)})...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>توليد فيديو متحرك بواسطة Veo</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">تنبيه أثناء توليد الفيديو:</p>
                  <p className="leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}

          </div>

          {/* Preview / Output Column (RTL End) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-base text-white">معاينة النتيجة</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300">
                  {aspectRatio === '16:9' ? '16:9 Landscape' : '9:16 Portrait'}
                </span>
              </div>

              {/* Display Area: Either Video, Loading, or Source Image */}
              <div className="relative rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center min-h-[320px] max-h-[500px]">
                
                {/* 1. Generated Video Ready */}
                {videoUrl && (
                  <div className="w-full flex flex-col items-center">
                    <video
                      ref={videoPlayerRef}
                      src={videoUrl}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className={`rounded-xl object-contain max-h-[460px] ${
                        aspectRatio === '9:16' ? 'w-auto max-w-[280px]' : 'w-full'
                      }`}
                    />
                  </div>
                )}

                {/* 2. Currently Generating Loading State */}
                {isGenerating && (
                  <div className="p-8 text-center space-y-5 max-w-md mx-auto">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping" />
                      <div className="w-20 h-20 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-mono text-xl font-bold text-indigo-400">
                        {formatTime(elapsedSeconds)}
                      </div>
                      <h4 className="font-bold text-base text-white">
                        {statusMessage}
                      </h4>
                      <p className="text-xs text-slate-400">
                        قد يستغرق توليد الفيديو بنموذج Veo من 30 إلى 90 ثانية. يرجى الانتظار بينما تكتمل الرندرة.
                      </p>
                    </div>

                    {/* Progress Steps Indicators */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-2 rounded-full transition-all duration-500 ${
                            progressStep >= step ? 'w-8 bg-indigo-500' : 'w-3 bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Initial Source Image Preview */}
                {!videoUrl && !isGenerating && selectedImage && (
                  <div className="relative w-full h-full group">
                    <img
                      src={selectedImage}
                      alt="الصورة المختارة"
                      referrerPolicy="no-referrer"
                      className={`mx-auto rounded-xl object-contain max-h-[420px] ${
                        aspectRatio === '9:16' ? 'w-auto max-w-[280px]' : 'w-full'
                      }`}
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white backdrop-blur-xs">
                      صورة المصدر جاهزة للتحريك بواسطة Veo
                    </div>
                  </div>
                )}

              </div>

              {/* Video Actions when ready */}
              {videoUrl && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم توليد الفيديو بنجاح بنموذج veo-3.1-fast-generate-preview</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={videoUrl}
                      download="jizan_mb_veo_video.mp4"
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>تنزيل الفيديو (MP4)</span>
                    </a>

                    <button
                      onClick={() => setVideoUrl(null)}
                      className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      توليد فيديو آخر
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
