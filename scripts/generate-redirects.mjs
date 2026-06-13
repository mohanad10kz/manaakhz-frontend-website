import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, '../out');
const REDIRECTS_FILE = path.join(OUT_DIR, '_redirects');

// Helper to recursively walk a directory
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath);
    }
  }
}

function generateRedirects() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`Error: out directory not found at ${OUT_DIR}`);
    process.exit(1);
  }

  console.log(`Generating Netlify redirects from static export in ${OUT_DIR}...`);

  const redirectRules = [];

  walkDir(OUT_DIR, (filePath) => {
    // Only target RSC chunks (.txt files under __next. directories)
    if (!filePath.endsWith('.txt')) return;

    // Convert backslashes to forward slashes for URLs
    const relativePath = path.relative(OUT_DIR, filePath).replace(/\\/g, '/');

    // Match path containing a subdirectory starting with "__next."
    // e.g. "ar/about/__next.$d$locale/about/__PAGE__.txt" -> match[1]="ar/about", match[2]="$d$locale", match[3]="about/__PAGE__.txt"
    const match = relativePath.match(/(.*)\/__next\.([^/]+)\/(.+)$/);
    if (!match) return;

    const routeDir = match[1];
    const firstSegment = match[2];
    const remainingPath = match[3];

    const pathParts = remainingPath.split('/');
    const filenameWithExt = pathParts.pop();
    const filename = filenameWithExt.slice(0, -'.txt'.length);
    const remainingSegments = pathParts;

    // Build the dot-separated flat filename
    const flatSegments = [firstSegment, ...remainingSegments, filename].join('.');
    const flatRequestPath = `/${routeDir}/__next.${flatSegments}.txt`;
    const actualFilePath = `/${relativePath}`;

    // Netlify redirect syntax: /from /to 200 (200 status is an internal rewrite)
    redirectRules.push(`${flatRequestPath} ${actualFilePath} 200`);

    // If the path contains '$', also add a URL-encoded version (replacing '$' with '%24')
    // to match browser-encoded prefetch requests
    if (flatRequestPath.includes('$')) {
      const encodedRequestPath = flatRequestPath.replace(/\$/g, '%24');
      redirectRules.push(`${encodedRequestPath} ${actualFilePath} 200`);
    }
  });

  if (redirectRules.length === 0) {
    console.log('No nested RSC files found. No redirects generated.');
    return;
  }

  // Prepend existing redirects if _redirects already exists (to preserve user-defined ones)
  let existingContent = '';
  if (fs.existsSync(REDIRECTS_FILE)) {
    existingContent = fs.readFileSync(REDIRECTS_FILE, 'utf8') + '\n';
  }

  const rulesContent = redirectRules.join('\n');
  fs.writeFileSync(REDIRECTS_FILE, existingContent + rulesContent + '\n');
  
  console.log(`Successfully generated ${redirectRules.length} redirect rules in ${REDIRECTS_FILE}`);
}

generateRedirects();
