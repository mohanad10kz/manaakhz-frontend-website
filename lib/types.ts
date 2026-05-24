export type SocialLink = {
  platform: string;
  url: string;
  label: string;
};

export type About = {
  name: string;
  title: string;
  bio_ar: string;
  bio_en: string;
  birth_date: string;
  nationality: string;
  skills: string[];
  social_links: SocialLink[];
  photo: string;
};

export type Design = {
  id: number;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  category: string;
  date: string;
  images: string[];
};

export type Post = {
  id: number;
  slug: string;
  title_ar: string;
  title_en: string;
  content_ar: string;
  content_en: string;
  date: string;
  tags: string;
  images: string[];
};

export type ContactInfo = {
  email: string;
  phone: string;
  location_ar: string;
  location_en: string;
  social_links: SocialLink[];
};
