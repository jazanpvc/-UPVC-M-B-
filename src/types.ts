export interface PipeProduct {
  id: string;
  name: string;
  nameEn: string;
  category: 'pipes' | 'fittings';
  brand: 'جيزان' | 'M&B';
  diameterInch: string;
  diameterMm: number;
  pressureClass: 'PN6' | 'PN10' | 'PN16';
  standard: string;
  lengthMeters?: number;
  description: string;
  application: string[];
  features: string[];
}

export interface FittingProduct {
  id: string;
  name: string;
  nameEn: string;
  type: 'elbow90' | 'elbow45' | 'tee' | 'coupling' | 'reducer' | 'endcap' | 'union';
  brand: 'M&B';
  sizes: string[];
  pressureRating: string;
  description: string;
  features: string[];
}

export interface SectorItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface VideoGenerationState {
  isGenerating: boolean;
  operationName: string | null;
  statusText: string;
  progressStep: number;
  error: string | null;
  videoBlobUrl: string | null;
  aspectRatio: '16:9' | '9:16';
  elapsedSeconds: number;
}

export interface QuoteItem {
  id: string;
  productType: string;
  size: string;
  quantity: number;
  notes?: string;
}

export interface QuoteFormState {
  clientName: string;
  companyName: string;
  phone: string;
  city: string;
  projectType: string;
  notes: string;
  items: QuoteItem[];
}

export interface BranchItem {
  id: string;
  name: string;
  city: string;
  governorate: 'تعز' | 'عدن' | 'إب' | 'صنعاء';
  badge: string;
  isMain?: boolean;
  address: string;
  supplyDescription: string;
  phone: string;
  whatsappUrl: string;
  coverage: string;
  highlights: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'تحديثات المصنع' | 'تقنيات البثق' | 'مشاريع وتوريد' | 'معايير ألمانية' | 'استدامة وخامات';
  date: string;
  badge?: string;
  image?: string;
  keyPoints: string[];
  source?: string;
  technicalDetails?: string;
  isFactoryUpdate?: boolean;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface IndustryNewsState {
  searchTopic: string;
  articles: NewsItem[];
  technicalInsight?: string;
  sources: GroundingSource[];
  searchQueries?: string[];
  isLoading: boolean;
  lastUpdated?: string;
  error?: string | null;
}
