import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Gauge, Layers, Info } from 'lucide-react';

interface PipeCalculatorProps {
  onAddCalculatedToQuote: (productName: string, size: string, quantity: number) => void;
}

export const PipeCalculator: React.FC<PipeCalculatorProps> = ({ onAddCalculatedToQuote }) => {
  const [diameter, setDiameter] = useState<number>(110); // in mm
  const [pressureClass, setPressureClass] = useState<'PN6' | 'PN10' | 'PN16'>('PN16');
  const [pipelineLength, setPipelineLength] = useState<number>(120); // in meters
  const [application, setApplication] = useState<string>('water');

  // Specs look-up
  const diameterInchMap: Record<number, string> = {
    20: '1/2"',
    25: '3/4"',
    32: '1"',
    50: '1.5"',
    63: '2"',
    75: '2.5"',
    90: '3"',
    110: '4"',
    160: '6"',
    200: '8"',
  };

  const wallThicknessMap: Record<string, Record<number, number>> = {
    PN6: {
      50: 1.6,
      63: 1.9,
      75: 2.2,
      90: 2.7,
      110: 2.7,
      160: 4.0,
      200: 4.9,
    },
    PN10: {
      20: 1.5,
      25: 1.9,
      32: 2.4,
      50: 2.4,
      63: 3.0,
      75: 3.6,
      90: 4.3,
      110: 4.2,
      160: 6.2,
      200: 7.7,
    },
    PN16: {
      20: 1.9,
      25: 2.3,
      32: 2.9,
      50: 3.7,
      63: 4.7,
      75: 5.6,
      90: 6.7,
      110: 6.6,
      160: 9.5,
      200: 11.9,
    },
  };

  const wallThickness = wallThicknessMap[pressureClass]?.[diameter] || 4.2;
  const innerDiameter = diameter - 2 * wallThickness;
  const pipePieces = Math.ceil(pipelineLength / 6); // standard 6 meter lengths
  
  // Approximate flow rate assuming 1.5 m/s safe velocity: Q = v * A
  const areaM2 = Math.PI * Math.pow((innerDiameter / 1000) / 2, 2);
  const flowLitersPerSecond = (1.5 * areaM2 * 1000).toFixed(1);
  const flowCubicMetersPerHour = (parseFloat(flowLitersPerSecond) * 3.6).toFixed(1);
  
  // Estimated weight per 6m stick
  const weightKgPerPiece = (Math.PI * (diameter - wallThickness) * wallThickness * 0.0014 * 6).toFixed(1);
  const totalWeightKg = (parseFloat(weightKgPerPiece) * pipePieces).toFixed(0);

  const handleAdd = () => {
    const sizeStr = diameterInchMap[diameter] || `${diameter}mm`;
    const prodName = `أنبوب جيزan UPVC قطر ${sizeStr} (${diameter}ملم) ضغط ${pressureClass}`;
    onAddCalculatedToQuote(prodName, sizeStr, pipePieces);
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            أدوات هندسية
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            حاسبة مواصفات وتدفق أنابيب جيزان UPVC
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            أداة فورية للمهندسين والمقاولين لحساب عدد الشواخص، السماكات، التدفق التقديري، والوزن الإجمالي لخطوط التمديد.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="space-y-5">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
                <Calculator className="w-5 h-5 text-blue-700" />
                <span>بيانات خط الأنابيب المطلوب</span>
              </h3>

              {/* Diameter Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>القطر الاسمي للأنبوب:</span>
                  <span className="font-mono text-blue-700 font-bold">
                    {diameterInchMap[diameter]} ({diameter} ملم)
                  </span>
                </label>
                <select
                  value={diameter}
                  onChange={(e) => setDiameter(Number(e.target.value))}
                  className="w-full rounded-xl bg-white border border-slate-300 p-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                >
                  <option value={20}>1/2 إنش (20 ملم)</option>
                  <option value={25}>3/4 إنش (25 ملم)</option>
                  <option value={32}>1 إنش (32 ملم)</option>
                  <option value={50}>1.5 إنش (50 ملم)</option>
                  <option value={63}>2 إنش (63 ملم)</option>
                  <option value={75}>2.5 إنش (75 ملم)</option>
                  <option value={90}>3 إنش (90 ملم)</option>
                  <option value={110}>4 إنش (110 ملم) - الأكثر طلباً</option>
                  <option value={160}>6 إنش (160 ملم)</option>
                  <option value={200}>8 إنش (200 ملم)</option>
                </select>
              </div>

              {/* Pressure Class */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">فئة الضغط الاسمي (Pressure Class):</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['PN6', 'PN10', 'PN16'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPressureClass(p)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        pressureClass === p
                          ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {p} {p === 'PN16' ? '(16 بار)' : p === 'PN10' ? '(10 بار)' : '(6 بار)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pipeline Length */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>طول الخط الإجمالي (بالمتر):</span>
                  <span className="font-mono text-blue-700">{pipelineLength} م</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={1200}
                  step={6}
                  value={pipelineLength}
                  onChange={(e) => setPipelineLength(Number(e.target.value))}
                  className="w-full accent-blue-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>6 م</span>
                  <span>300 م</span>
                  <span>600 م</span>
                  <span>1200 م</span>
                </div>
              </div>

              {/* Application Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">نوع التطبيق والمشروع:</label>
                <select
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  className="w-full rounded-xl bg-white border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="water">شبكات مياه شرب وتوزيع</option>
                  <option value="irrigation">شبكات ري زراعي وضخ آبار</option>
                  <option value="drainage">شبكات تصريف وصرف صحي</option>
                  <option value="building">أعمال سباكة وتغذية مباني</option>
                  <option value="industrial">مشاريع بنية تحتية ومصانع</option>
                </select>
              </div>

            </div>

            {/* Calculations Result Box */}
            <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm space-y-5">
              <h4 className="font-bold text-sm text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-blue-700">النتائج والمواصفات التقديرية</span>
                <span className="text-xs font-mono bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">
                  {pressureClass} / ISO
                </span>
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">عدد الشواخص (شاخصة 6م):</span>
                  <span className="text-lg font-black text-slate-900 font-mono">{pipePieces}</span>
                  <span className="text-slate-500 text-[10px] mr-1">حبة أنبوب</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">سماكة الجدار المقدرة:</span>
                  <span className="text-lg font-black text-blue-700 font-mono">{wallThickness}</span>
                  <span className="text-slate-500 text-[10px] mr-1">ملم</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">التدفق الهيدروليكي الآمن:</span>
                  <span className="text-lg font-black text-emerald-700 font-mono">{flowLitersPerSecond}</span>
                  <span className="text-slate-500 text-[10px] mr-1">لتر / ثانية</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">الوزن التقريبي الإجمالي:</span>
                  <span className="text-lg font-black text-slate-900 font-mono">{totalWeightKg}</span>
                  <span className="text-slate-500 text-[10px] mr-1">كجم</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs space-y-1 text-slate-700">
                <p className="font-bold text-blue-900 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> توصيات مصنع جيزان & M&B:
                </p>
                <p className="text-[11px] leading-relaxed">
                  يُوصى باستخدام توصيلات M&B المتطابقة (أكواع، جلب، ومثلوثات) مع غراء UPVC معتمد لضمان متانة الربط وعدم حدوث تسريبات تحت ضغط {pressureClass}.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>إضافة هذه الكمية لطلب التسعيرة</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
