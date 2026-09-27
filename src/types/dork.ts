export type RiskLevel = 'Info' | 'Recon' | 'Sensitive' | 'Audit' | 'Low';
export type SearchEngine = 'google' | 'yandex';

export interface DorkItem {
  id: string;
  category: string;
  title: string;
  description: string;
  queryTemplate: string;
  riskLevel: RiskLevel;
  engine: SearchEngine;
  tags: string[];
}

export interface CategoryMeta {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  borderColor: string;
  badgeBg: string;
  textColor: string;
}

export interface FavoriteDork {
  id: string;
  domain: string;
  query: string;
  title: string;
  category: string;
  engine: SearchEngine;
  savedAt: number;
}

export interface RecentSearch {
  domain: string;
  engine: SearchEngine;
  timestamp: number;
}
