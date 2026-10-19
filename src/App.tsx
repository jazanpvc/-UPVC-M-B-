/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductsSection } from './components/ProductsSection';
import { SectorsSection } from './components/SectorsSection';
import { MaterialsAndStrengthSection } from './components/MaterialsAndStrengthSection';
import { QualitySection } from './components/QualitySection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { AuthorizedBranchesSection } from './components/AuthorizedBranchesSection';
import { NewsAndIndustrySection } from './components/NewsAndIndustrySection';
import { PipeCalculator } from './components/PipeCalculator';
import { VeoVideoStudio } from './components/VeoVideoStudio';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { QuoteItem } from './types';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { FACTORY_INFO } from './data/factoryData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [selectedPhotoForVeo, setSelectedPhotoForVeo] = useState<string | null>(null);

  // When user clicks "تحريك هذه الصورة" from anywhere
  const handleSelectPhotoForVeo = (photoUrl: string) => {
    setSelectedPhotoForVeo(photoUrl);
    const studioElem = document.getElementById('veo-studio');
    if (studioElem) {
      studioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When user adds a product to quote
  const handleSelectProductForQuote = (productName: string, size: string) => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      productType: productName,
      size: size,
      quantity: 10,
    };
    setQuoteItems((prev) => [...prev, newItem]);
    setQuoteModalOpen(true);
  };

  // When user calculates pipeline and adds to quote
  const handleAddCalculatedToQuote = (productName: string, size: string, quantity: number) => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      productType: productName,
      size: size,
      quantity: quantity,
    };
    setQuoteItems((prev) => [...prev, newItem]);
    setQuoteModalOpen(true);
  };

  const handleOpenVeo = () => {
    const studioElem = document.getElementById('veo-studio');
    if (studioElem) {
      studioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header & Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenVeo={handleOpenVeo}
        onOpenQuote={() => setQuoteModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenVeo={handleOpenVeo}
          onOpenQuote={() => setQuoteModalOpen(true)}
          onSelectPhotoForVeo={handleSelectPhotoForVeo}
        />

        {/* 01 | من نحن */}
        <AboutSection />

        {/* 02 | منتجاتنا: JIZAN مواسير PVC & M&B توصيلات PVC */}
        <ProductsSection
          onSelectProductForQuote={handleSelectProductForQuote}
        />

        {/* 03 | مجالات الاستخدام */}
        <SectorsSection />

        {/* 04 | المواد الأساسية & 05 | القوة والسماكة والمرونة */}
        <MaterialsAndStrengthSection />

        {/* 06 | الجودة وضبط الإنتاج */}
        <QualitySection />

        {/* 07 | لماذا يختارنا السباكون؟ & 08 | لماذا يختارنا المزارعون؟ */}
        <WhyChooseUsSection 
          onOpenQuote={() => setQuoteModalOpen(true)}
        />

        {/* نقاط ومراكز البيع المعتمدة (تعز، عدن، إب، صنعاء) */}
        <AuthorizedBranchesSection
          onOpenQuoteWithBranch={(branchCity) => {
            setQuoteModalOpen(true);
          }}
        />

        {/* آخر الأخبار والتحديثات التقنية ومرصد قطاع البلاستيك (Google Search Grounding) */}
        <NewsAndIndustrySection />

        {/* Interactive Engineering Flow & Quantity Calculator */}
        <PipeCalculator
          onAddCalculatedToQuote={handleAddCalculatedToQuote}
        />

        {/* Veo Video Generations AI Studio */}
        <VeoVideoStudio
          initialImage={selectedPhotoForVeo}
        />

        {/* Contact & Factory Locations */}
        <ContactAndLocation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Request For Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialItems={quoteItems}
      />

      {/* Floating Quick Action Widget (WhatsApp & Call) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5">
        <button
          onClick={handleOpenVeo}
          className="w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center transition-all hover:scale-110 group cursor-pointer"
          title="تحريك الصور بالذكاء الاصطناعي Veo"
        >
          <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
        </button>

        <a
          href={FACTORY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center transition-all hover:scale-110"
          title="تواصل معنا عبر الواتساب"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <a
          href={`tel:${FACTORY_INFO.primaryPhone}`}
          className="w-12 h-12 rounded-2xl bg-blue-700 hover:bg-blue-600 text-white shadow-lg shadow-blue-700/30 flex items-center justify-center transition-all hover:scale-110"
          title="اتصال هاتفي مباشر بالمبيعات"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
