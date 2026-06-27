import type { BlocksContent } from '@strapi/blocks-react-renderer'

export type SocialLink = {
  platform: string;
  url: string;
  label: string;
};

export interface WorkExperience {
  period_ar: string
  period_en: string
  place_ar: string
  place_en: string
  role_ar: string
  role_en: string
  description_ar: string
  description_en: string
  images: string[]
}

export interface Language {
  name_ar: string
  name_en: string
  level_ar: string
  level_en: string
  percentage: number
}

export interface About {
  name_ar: string
  name_en: string
  title_ar: string
  title_en: string
  bio_ar: string
  bio_en: string
  birth_date: string
  birth_place_ar: string
  birth_place_en: string
  nationality_ar: string
  nationality_en: string
  marital_status_ar: string
  marital_status_en: string
  phone: string
  education_ar: string
  education_en: string
  memberships_ar: string[]
  memberships_en: string[]
  skills_ar: string[]
  skills_en: string[]
  languages: Language[]
  experience: WorkExperience[]
  photo: string
  social_links: SocialLink[]
}

export type Category = {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
};

export type Design = {
  id: number;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: BlocksContent;
  description_en: BlocksContent;
  category: Category | null;   // relation اختيارية من Strapi
  date: string;
  images: string[];
  videos: string[];
};

export type Post = {
  id: number;
  slug: string;
  title_ar: string;
  title_en: string;
  content_ar: BlocksContent;
  content_en: BlocksContent;
  date: string;
  tags: string;
};

export interface Phone {
  number: string
  label_ar: string
  label_en: string
}

export interface ContactSocialLink {
  platform: string
  url: string
  label: string
}

export type ContactInfo = {
  email: string;
  whatsapp_number: string;
  location_ar: string;
  location_en: string;
  phones: Phone[];
  social_links: ContactSocialLink[];
};
