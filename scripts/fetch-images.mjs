import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^#\s][^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

async function fetchStrapi(endpoint) {
  try {
    // using populate=* for simple endpoints, and specific populate for /about
    let populateParam = '?populate=*';
    if (endpoint === '/about') {
      populateParam = '?populate[photo]=true&populate[experience][populate][images]=true&populate[languages]=true';
    }
    const res = await fetch(`${STRAPI_URL}/api${endpoint}${populateParam}`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    });
    if (!res.ok) {
      console.error(`Failed to fetch ${endpoint}: Status ${res.status}`);
      return null;
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error(`Failed to fetch ${endpoint}:`, err);
    return null;
  }
}

function extractUrls(data, urls = new Set()) {
  if (!data) return urls;

  if (Array.isArray(data)) {
    data.forEach(item => extractUrls(item, urls));
  } else if (typeof data === 'object') {
    // If it's a Strapi media object with a url
    if (data.url && typeof data.url === 'string') {
      const rawUrl = data.url;
      if (rawUrl.startsWith('/uploads/')) {
        // مسار نسبي → أضفه مباشرة
        urls.add(rawUrl);
      } else if (rawUrl.startsWith('http')) {
        // URL كامل → استخرج المسار إذا كان /uploads/
        try {
          const parsed = new URL(rawUrl);
          if (parsed.pathname.startsWith('/uploads/')) {
            urls.add(parsed.pathname);
          }
        } catch { /* تجاهل */ }
      }
    }
    // Check all properties
    for (const key in data) {
      extractUrls(data[key], urls);
    }
  }

  return urls;
}

async function downloadImage(urlPath) {
  const fullUrl = `${STRAPI_URL}${urlPath}`;
  const filename = path.basename(urlPath);
  const dest = path.join(UPLOADS_DIR, filename);

  // Skip if already exists
  if (fs.existsSync(dest)) {
    return;
  }

  try {
    const response = await fetch(fullUrl, {
      headers: STRAPI_TOKEN ? { 'Authorization': `Bearer ${STRAPI_TOKEN}` } : {}
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${filename}`);
  } catch (err) {
    console.error(`❌ Failed to download ${filename}:`, err.message);
  }
}

async function main() {
  console.log('🔄 Fetching images from Strapi...');
  
  const [about, designs, posts, contactInfo] = await Promise.all([
    fetchStrapi('/about'),
    fetchStrapi('/designs'),
    fetchStrapi('/posts'),
    fetchStrapi('/contact-info'),
  ]);

  const allUrls = new Set();
  
  extractUrls(about, allUrls);
  extractUrls(designs, allUrls);
  extractUrls(posts, allUrls);
  extractUrls(contactInfo, allUrls);

  if (allUrls.size === 0) {
    console.log('⚠️ No images found in Strapi data.');
    return;
  }

  console.log(`⬇️ Downloading ${allUrls.size} images...`);

  const downloadPromises = Array.from(allUrls).map(url => downloadImage(url));
  await Promise.all(downloadPromises);

  console.log('🎉 All images downloaded to public/uploads/');
}

main().catch(console.error);
