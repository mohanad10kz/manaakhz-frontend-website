import { About, Category, ContactInfo, Design, Post, SocialLink } from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Generic fetcher for Strapi REST API
 */
async function fetchStrapi(path: string, params: Record<string, any> = {}) {
  try {
    const url = new URL(`${STRAPI_URL}/api${path}`);
    
    // Check if params already contains a populate key
    const hasCustomPopulate = Object.keys(params).some(key => key.startsWith('populate'));
    
    // Default to populate all media/relations if no custom populate is provided
    if (!hasCustomPopulate) {
      url.searchParams.append("populate", "*");
    }
    
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
    });

    if (!response.ok) {
      console.error(`Strapi fetch failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Strapi fetch exception:", error);
    return null;
  }
}

/**
 * Helper to extract absolute media URLs from Strapi 5 response
 */
function extractMediaUrls(media: any): string[] {
  if (!media) return [];
  const items = Array.isArray(media) ? media : [media];
  return items.map((item: any) => {
    if (!item?.url) return "";
    // If it's an external URL (e.g. cloudinary, AWS), return as is.
    // Otherwise, assume it's a local Strapi upload and it has been downloaded to /uploads/...
    return item.url.startsWith("http") ? item.url : item.url;
  }).filter(Boolean);
}

/**
 * Helper to parse videos field from Strapi JSON field.
 * Handles: string (single URL), string[] (array), null/undefined.
 */
function extractVideos(raw: any): string[] {
  if (!raw) return [];
  // Already an array
  if (Array.isArray(raw)) return raw.filter((v) => typeof v === "string" && v.trim());
  // Single URL stored as a plain string
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    // Try to parse as JSON first (e.g. '["url"]')
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.filter((v) => typeof v === "string" && v.trim());
      } catch { /* ignore */ }
    }
    // Single URL string
    return trimmed ? [trimmed] : [];
  }
  return [];
}

// ----------------------------------------------------------------------
// API Functions
// ----------------------------------------------------------------------

/**
 * Helper to extract a Category relation from Strapi response.
 * Returns null if no category is linked.
 */
function extractCategory(raw: any): Category | null {
  if (!raw) return null;
  return {
    id: raw.id || 0,
    slug: raw.slug || "",
    name_ar: raw.name_ar || "",
    name_en: raw.name_en || "",
  };
}

export async function getAbout(locale?: string): Promise<About | null> {
  const json = await fetchStrapi("/about", {
    "populate[photo]": "true",
    "populate[experience][populate][images]": "true",
    "populate[languages]": "true"
  });
  if (!json?.data) return null;

  const data = json.data;
  
  // We fetch social links as well since About type expects it
  const socialLinks = await getSocialLinks();

  return {
    name_ar: data.name_ar || "",
    name_en: data.name_en || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    bio_ar: data.bio_ar || "",
    bio_en: data.bio_en || "",
    birth_date: data.birth_date || "",
    birth_place_ar: data.birth_place_ar || "",
    birth_place_en: data.birth_place_en || "",
    nationality_ar: data.nationality_ar || "",
    nationality_en: data.nationality_en || "",
    marital_status_ar: data.marital_status_ar || "",
    marital_status_en: data.marital_status_en || "",
    phone: data.phone || "",
    education_ar: data.education_ar || "",
    education_en: data.education_en || "",
    memberships_ar: data.memberships_ar || [],
    memberships_en: data.memberships_en || [],
    skills_ar: data.skills_ar || [],
    skills_en: data.skills_en || [],
    languages: (data.languages || []).map((lang: any) => ({
      name_ar: lang.name_ar || "",
      name_en: lang.name_en || "",
      level_ar: lang.level_ar || "",
      level_en: lang.level_en || "",
      percentage: lang.percentage || 0,
    })),
    experience: (data.experience || []).map((exp: any) => ({
      period_ar: exp.period_ar || "",
      period_en: exp.period_en || "",
      place_ar: exp.place_ar || "",
      place_en: exp.place_en || "",
      role_ar: exp.role_ar || "",
      role_en: exp.role_en || "",
      description_ar: exp.description_ar || "",
      description_en: exp.description_en || "",
      images: extractMediaUrls(exp.images),
    })),
    social_links: socialLinks,
    photo: extractMediaUrls(data.photo)[0] || "",
  };
}

export async function getCategories(): Promise<Category[]> {
  const json = await fetchStrapi("/categories");
  if (!json?.data) return [];
  return json.data.map((data: any): Category => ({
    id: data.id,
    slug: data.slug || "",
    name_ar: data.name_ar || "",
    name_en: data.name_en || "",
  }));
}

export async function getAllDesigns(locale?: string): Promise<Design[]> {
  // Use explicit populate to include the category relation and images
  // blocks fields (description_ar/en) are returned automatically
  const json = await fetchStrapi("/designs", {
    "populate[images]": "true",
    "populate[category]": "true",
  });
  if (!json?.data) return [];

  return json.data.map((data: any): Design => ({
    id: data.id,
    slug: data.slug || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    description_ar: data.description_ar || [],
    description_en: data.description_en || [],
    category: extractCategory(data.category),
    date: data.date || "",
    images: extractMediaUrls(data.images),
    videos: extractVideos(data.videos),
  }));
}

export async function getDesignBySlug(slug: string, locale?: string): Promise<Design | null> {
  const decodedSlug = decodeURIComponent(slug);
  const json = await fetchStrapi("/designs", {
    "filters[slug][$eq]": decodedSlug,
    "populate[images]": "true",
    "populate[category]": "true",
  });
  if (!json?.data || json.data.length === 0) return null;

  const data = json.data[0];

  return {
    id: data.id,
    slug: data.slug || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    description_ar: data.description_ar || [],
    description_en: data.description_en || [],
    category: extractCategory(data.category),
    date: data.date || "",
    images: extractMediaUrls(data.images),
    videos: extractVideos(data.videos),
  };
}

export async function getAllPosts(locale?: string): Promise<Post[]> {
  // blocks fields are returned automatically — no deep populate needed
  // blocks fields are returned automatically — no populate needed
  const json = await fetchStrapi("/posts");
  if (!json?.data) return [];

  return json.data.map((data: any): Post => ({
    id: data.id,
    slug: data.slug || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    content_ar: data.content_ar || [],
    content_en: data.content_en || [],
    date: data.date || "",
    tags: data.tags || "",
  }));
}

export async function getPostBySlug(slug: string, locale?: string): Promise<Post | null> {
  const decodedSlug = decodeURIComponent(slug);
  // blocks fields are returned automatically — no populate needed
  const json = await fetchStrapi("/posts", {
    "filters[slug][$eq]": decodedSlug,
  });
  if (!json?.data || json.data.length === 0) return null;

  const data = json.data[0];
  return {
    id: data.id,
    slug: data.slug || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    content_ar: data.content_ar || [],
    content_en: data.content_en || [],
    date: data.date || "",
    tags: data.tags || "",
  };
}

export async function getContactInfo(locale?: string): Promise<ContactInfo | null> {
  const json = await fetchStrapi('/contact-info', {
    'populate[phones]': '*',
    'populate[social_links]': '*',
  });
  if (!json?.data) return null;

  const data = json.data;

  return {
    email: data.email || '',
    whatsapp_number: data.whatsapp_number || '',
    location_ar: data.location_ar || '',
    location_en: data.location_en || '',
    phones: (data.phones || []).map((p: any) => ({
      number: p.number || '',
      label_ar: p.label_ar || '',
      label_en: p.label_en || '',
    })),
    social_links: (data.social_links || []).map((s: any) => ({
      platform: s.platform || '',
      url: s.url || '',
      label: s.label || '',
    })),
  };
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const json = await fetchStrapi("/social-links");
  if (!json?.data) return [];

  return json.data.map((data: any): SocialLink => ({
    platform: data.platform || "",
    url: data.url || "",
    label: data.label || "",
  }));
}


// ──────────────────────────────────────────────────────────
// Pagination helpers
// ──────────────────────────────────────────────────────────

import { DESIGNS_PER_PAGE, POSTS_PER_PAGE } from './constants'

// ── Design Pagination ──────────────────────────────────────

export async function getDesignsPaginated(page: number) {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (API_TOKEN) headers['Authorization'] = `Bearer ${API_TOKEN}`

  const res = await fetch(
    `${STRAPI_URL}/api/designs?populate[images]=true&populate[category]=true&pagination[page]=${page}&pagination[pageSize]=${DESIGNS_PER_PAGE}&sort=date:desc`,
    { headers, next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 } }
  )
  if (!res.ok) return { designs: [], pagination: { page, pageCount: 1 } }

  const data = await res.json()
  const rawDesigns = data?.data ?? []

  const designs: Design[] = rawDesigns.map((item: any): Design => ({
    id: item.id,
    slug: item.slug || '',
    title_ar: item.title_ar || '',
    title_en: item.title_en || '',
    description_ar: item.description_ar || [],
    description_en: item.description_en || [],
    category: item.category
      ? { id: item.category.id, slug: item.category.slug || '', name_ar: item.category.name_ar || '', name_en: item.category.name_en || '' }
      : null,
    date: item.date || '',
    images: (Array.isArray(item.images) ? item.images : []).map((img: any) => img?.url || '').filter(Boolean),
    videos: Array.isArray(item.videos) ? item.videos : [],
  }))

  return {
    designs,
    pagination: data?.meta?.pagination ?? { page, pageCount: 1 },
  }
}

export async function getDesignsTotalPages(): Promise<number> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (API_TOKEN) headers['Authorization'] = `Bearer ${API_TOKEN}`

  const res = await fetch(
    `${STRAPI_URL}/api/designs?pagination[page]=1&pagination[pageSize]=${DESIGNS_PER_PAGE}`,
    { headers, next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 } }
  )
  if (!res.ok) return 1
  const data = await res.json()
  return data?.meta?.pagination?.pageCount ?? 1
}

// ── Post Pagination ────────────────────────────────────────

export async function getPostsPaginated(page: number) {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (API_TOKEN) headers['Authorization'] = `Bearer ${API_TOKEN}`

  const res = await fetch(
    `${STRAPI_URL}/api/posts?pagination[page]=${page}&pagination[pageSize]=${POSTS_PER_PAGE}&sort=date:desc`,
    { headers, next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 } }
  )
  if (!res.ok) return { posts: [], pagination: { page, pageCount: 1 } }

  const data = await res.json()
  const rawPosts = data?.data ?? []

  const posts: Post[] = rawPosts.map((item: any): Post => ({
    id: item.id,
    slug: item.slug || '',
    title_ar: item.title_ar || '',
    title_en: item.title_en || '',
    content_ar: item.content_ar || [],
    content_en: item.content_en || [],
    date: item.date || '',
    tags: item.tags || '',
  }))

  return {
    posts,
    pagination: data?.meta?.pagination ?? { page, pageCount: 1 },
  }
}

export async function getPostsTotalPages(): Promise<number> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (API_TOKEN) headers['Authorization'] = `Bearer ${API_TOKEN}`

  const res = await fetch(
    `${STRAPI_URL}/api/posts?pagination[page]=1&pagination[pageSize]=${POSTS_PER_PAGE}`,
    { headers, next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 } }
  )
  if (!res.ok) return 1
  const data = await res.json()
  return data?.meta?.pagination?.pageCount ?? 1
}
