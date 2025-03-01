export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  website: string;
  pricing: {
    free: boolean;
    paid: boolean;
    price_range: string;
  };
  features: string[];
  api_available: boolean;
  rating: number;
  reviews_count: number;
  logo: string;
  created_at: string;
  updated_at: string;
}