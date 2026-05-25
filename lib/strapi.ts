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
      next: { revalidate: 0 }, // DEBUG: no cache — change back to 3600 after testing
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
  // Use explicit populate to include the category relation
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
    description_ar: data.description_ar || "",
    description_en: data.description_en || "",
    category: extractCategory(data.category),
    date: data.date || "",
    images: extractMediaUrls(data.images),
    videos: extractVideos(data.videos),
  }));
}

export async function getDesignBySlug(slug: string, locale?: string): Promise<Design | null> {
  const json = await fetchStrapi("/designs", {
    "filters[slug][$eq]": slug,
    "populate[images]": "true",
    "populate[category]": "true",
  });
  if (!json?.data || json.data.length === 0) return null;

  const data = json.data[0];

  // Debug: log the raw videos value so you can see what Strapi returns
  console.log(`[strapi] design "${slug}" raw videos:`, JSON.stringify(data.videos));

  return {
    id: data.id,
    slug: data.slug || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    description_ar: data.description_ar || "",
    description_en: data.description_en || "",
    category: extractCategory(data.category),
    date: data.date || "",
    images: extractMediaUrls(data.images),
    videos: extractVideos(data.videos),
  };
}

export async function getAllPosts(locale?: string): Promise<Post[]> {
  const json = await fetchStrapi("/posts");
  if (!json?.data) return [];

  return json.data.map((data: any): Post => ({
    id: data.id,
    slug: data.slug || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    content_ar: extractRichText(data.content_ar),
    content_en: extractRichText(data.content_en),
    date: data.date || "",
    tags: data.tags || "",
    images: extractMediaUrls(data.images),
  }));
}

export async function getPostBySlug(slug: string, locale?: string): Promise<Post | null> {
  const json = await fetchStrapi("/posts", { "filters[slug][$eq]": slug });
  if (!json?.data || json.data.length === 0) return null;

  const data = json.data[0];
  return {
    id: data.id,
    slug: data.slug || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    content_ar: extractRichText(data.content_ar),
    content_en: extractRichText(data.content_en),
    date: data.date || "",
    tags: data.tags || "",
    images: extractMediaUrls(data.images),
  };
}

export async function getContactInfo(locale?: string): Promise<ContactInfo | null> {
  const json = await fetchStrapi("/contact-info");
  if (!json?.data) return null;

  const data = json.data;
  const socialLinks = await getSocialLinks();

  return {
    email: data.email || "",
    phone: data.phone || "",
    location_ar: data.location_ar || "",
    location_en: data.location_en || "",
    social_links: socialLinks,
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

/**
 * Helper to extract Rich Text content from Strapi 5 format
 * Strapi 5 uses blocks for Rich Text if it's set as blocks, 
 * but our schema uses "richtext" which returns a markdown string.
 */
function extractRichText(content: any): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  // If it happens to be Strapi 5 blocks
  try {
    return JSON.stringify(content);
  } catch {
    return "";
  }
}
