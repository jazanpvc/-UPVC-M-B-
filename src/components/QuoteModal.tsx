import React, { useState } from 'react';
import { X, Plus, Trash2, MessageSquare, Send, CheckCircle2, Phone, Building } from 'lucide-react';
import { FACTORY_INFO } from '../data/factoryData';
import { QuoteItem } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItems?: QuoteItem[];
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialItems = [] }) => {
  const [items, setItems] = useState<QuoteItem[]>(
    initialItems.length > 0
      ? initialItems
      : [
          { id: '1', productType: 'أنبوب جيزان UPVC قطر 110ملم (4 إنش) PN16', size: '4"', quantity: 50 },
          { id: '2', productType: 'كوع M&B بزاوية 90 درجة مقاس 4 إنش', size: '4"', quantity: 20 },
        ]
  );

  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('صنعاء');
  const [projectType, setProjectType] = useState('مشروع شبكة مياه');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAddItem = () => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      productType: 'أنبوب جيزان UPVC قطر 63ملم (2 إنش) PN16',
      size: '2"',
      quantity: 10,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Generate WhatsApp formatted text
  const generateWhatsAppMessage = () => {
    let msg = `السلام عليكم ورحمة الله وبركاته،\n`;
    msg += `طلب عرض سعر رسمي من مصنع جيزان & M&B للصناعات البلاستيكية:\n\n`;
    msg += `👤 الاسم: ${clientName || 'غير محدد'}\n`;
    if (companyName) msg += `🏢 اسم الشركة/المقاول: ${companyName}\n`;
    msg += `📱 رقم الهاتف: ${phone || 'غير محدد'}\n`;
    msg += `📍 المحافظة / المدينة: ${city}\n`;
    msg += `🏗 نوع المشروع: ${projectType}\n\n`;
    msg += `📋 قائمة المواد المطلوبة:\n`;

    items.forEach((item, index) => {
      msg += `${index + 1}. ${item.productType} - المقاس: ${item.size} - الكمية: ${item.quantity} حبة\n`;
    });

    if (notes) {
      msg += `\n📝 ملاحظات إضافية: ${notes}\n`;
    }

    msg += `\nنرجو تزويدنا بأفضل الأسعار ومدة التوريد المتاحة. شكراً لكم.`;
    return encodeURIComponent(msg);
  };

  const handleSendViaWhatsApp = (targetPhone: string) => {
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/967${targetPhone}?text=${text}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6 space-y-1">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
            عرض سعر رسمي للمشاريع
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            طلب تسعيرة أنابيب جيزان & توصيلات M&B
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            أرسل كشف المواد مباشرة إلى قسم المبيعات والمشاريع عبر الواتساب أو الهاتف.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">تم تجهيز وإرسال الطلب بنجاح!</h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              تم تحويل طلب التسعيرة إلى فريق المبيعات في مصنع جيزان & M&B. سنقوم بمراجعة الكشف وتزويدكم بعرض السعر وجدول التوريد في أسرع وقت.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                تعديل القائمة
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">الاسم الكريم / المهندس:</label>
                <input
                  type="text"
                  placeholder="مثال: م. أحمد صالح"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">اسم الشركة / المؤسسة / المقاول:</label>
                <input
                  type="text"
                  placeholder="مثال: مؤسسة البناء للمقاولات"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">رقم الهاتف / الواتساب:</label>
                <input
                  type="tel"
                  placeholder="مثال: 770000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">المحافظة / المدينة:</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                >
                  <option value="صنعاء">صنعاء</option>
                  <option value="عدن">عدن</option>
                  <option value="تعز">تعز</option>
                  <option value="الحديدة">الحديدة</option>
                  <option value="إب">إب</option>
                  <option value="حضرموت">حضرموت (المكلا / سيئون)</option>
                  <option value="ذمار">ذمار</option>
                  <option value="مأرب">مأرب</option>
                  <option value="محافظات أخرى">محافظات أخرى</option>
                </select>
              </div>
            </div>

            {/* Materials List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800">قائمة المواد المطلوبة:</span>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" /> إضافة صنف
                </button>
              </div>

              <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex-1 w-full sm:w-auto">
                      <input
                        type="text"
                        value={item.productType}
                        onChange={(e) => handleUpdateItem(item.id, 'productType', e.target.value)}
                        placeholder="اسم الصنف (أنبوب / كوع / وصلة)"
                        className="w-full bg-white border border-slate-200 rounded-lg p-1.5 font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 text-[10px]">المقاس:</span>
                        <input
                          type="text"
                          value={item.size}
                          onChange={(e) => handleUpdateItem(item.id, 'size', e.target.value)}
                          className="w-16 bg-white border border-slate-200 rounded-lg p-1.5 text-center font-mono text-slate-800"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 text-[10px]">الكمية:</span>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                          className="w-16 bg-white border border-slate-200 rounded-lg p-1.5 text-center font-mono text-slate-800 font-bold"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="حذف الصنف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">ملاحظات أو مواصفات خاصة:</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أية مواصفات فنية إضافية، موقع التسليم، أو مدة المشروع..."
                className="w-full rounded-xl bg-slate-50 border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Direct Send via WhatsApp to either number or authorized branches */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-bold text-slate-700">اختر مركز البيع أو المبيعات لإرسال الكشف فوراً عبر الواتساب:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSendViaWhatsApp('779445115')}
                  className="p-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>المركز الرئيسي (تعز - الجندية)</span>
                  </span>
                  <span className="font-mono text-[11px]">779445115</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendViaWhatsApp('771900777')}
                  className="p-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>فرع عدن (جولة الكراع)</span>
                  </span>
                  <span className="font-mono text-[11px]">771900777</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendViaWhatsApp('784137077')}
                  className="p-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>نقطة بيع إب (الدائري الغربي)</span>
                  </span>
                  <span className="font-mono text-[11px]">784137077</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendViaWhatsApp('771200777')}
                  className="p-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>نقطة صنعاء (شارع الأربعين)</span>
                  </span>
                  <span className="font-mono text-[11px]">771200777</span>
                </button>
              </div>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => handleSendViaWhatsApp(FACTORY_INFO.primaryPhone)}
                  className="text-xs text-slate-500 hover:text-blue-700 underline font-medium"
                >
                  أو إرسال للإدارة والمبيعات العامة ({FACTORY_INFO.primaryPhone})
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
