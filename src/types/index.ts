export interface Attraction {
  id: string;
  name: string;
  nameEn: string;
  category: 'palace' | 'modern' | 'nature' | 'shopping' | 'culture' | 'all';
  description: string;
  fullDescription: string[];
  image: string;
  images: string[];
  location: string;
  address: string;
  hours: string;
  fee: string;
  transport: string;
  tips: string[];
  nearbyAttractions: string[];
}

export interface Season {
  name: string;
  nameEn: string;
  temperature: string;
  activities: string[];
  festivals: string[];
  tips: string[];
  image: string;
}

export interface CultureSection {
  title: string;
  titleEn: string;
  description: string;
  places: string[];
  image: string;
}
