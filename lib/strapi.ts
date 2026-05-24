import { About, ContactInfo, Design, Post, SocialLink } from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Generic fetcher for Strapi REST API
 */
async function fetchStrapi(path: string, params: Record<string, any> = {}) {
  try {
    const url = new URL(`${STRAPI_URL}/api${path}`);
    
    // Default to populate all media/relations
    url.searchParams.append("populate", "*");
    
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
      next: { revalidate: 3600 }, // ISR - 1 hour
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
    return item.url.startsWith("http") ? item.url : `${STRAPI_URL}${item.url}`;
  }).filter(Boolean);
}

// ----------------------------------------------------------------------
// API Functions
// ----------------------------------------------------------------------

export async function getAbout(locale?: string): Promise<About | null> {
  const json = await fetchStrapi("/about");
  if (!json?.data) return null;

  const data = json.data;
  
  // We fetch social links as well since About type expects it
  const socialLinks = await getSocialLinks();

  return {
    name: data.name || "",
    title: locale === "ar" ? data.title_ar || data.title_en : data.title_en || data.title_ar || "",
    bio_ar: data.bio_ar || "",
    bio_en: data.bio_en || "",
    birth_date: data.birth_date || "",
    nationality: data.nationality || "",
    skills: data.skills || [],
    social_links: socialLinks,
    photo: extractMediaUrls(data.photo)[0] || "",
  };
}

export async function getAllDesigns(locale?: string): Promise<Design[]> {
  const json = await fetchStrapi("/designs");
  if (!json?.data) return [];

  return json.data.map((data: any): Design => ({
    id: data.id,
    slug: data.slug || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    description_ar: data.description_ar || "",
    description_en: data.description_en || "",
    category: data.category || "other",
    date: data.date || "",
    images: extractMediaUrls(data.images),
  }));
}

export async function getDesignBySlug(slug: string, locale?: string): Promise<Design | null> {
  const json = await fetchStrapi("/designs", { "filters[slug][$eq]": slug });
  if (!json?.data || json.data.length === 0) return null;

  const data = json.data[0];
  return {
    id: data.id,
    slug: data.slug || "",
    title_ar: data.title_ar || "",
    title_en: data.title_en || "",
    description_ar: data.description_ar || "",
    description_en: data.description_en || "",
    category: data.category || "other",
    date: data.date || "",
    images: extractMediaUrls(data.images),
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
