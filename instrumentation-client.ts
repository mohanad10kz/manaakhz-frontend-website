// Intercept RSC segment fetch requests and rewrite flat filenames
// to hierarchical directory paths that actually exist in the static export.
//
// ──────────────────────────────────────────────────────────────────────────────
// Problem (Next.js 16 + Static Export):
//
// When navigating client-side, Next.js fetches RSC segment files using
// "flat" filenames constructed by joining segment names with dots, e.g.:
//
//   GET /ar/blog/my-post/__next.$d$locale.blog.$d$slug.__PAGE__.txt
//
// But the static export writes them as NESTED directory trees, e.g.:
//
//   out/ar/blog/my-post/__next.$d$locale/blog/$d$slug/__PAGE__.txt
//
// The mismatch causes a 404 → Next.js retries → 2-3 second page freeze.
//
// Fix:
//   Intercept the flat fetch, rewrite the filename to a nested path, and
//   fetch the hierarchical file instead. Fall back to the original request
//   if the rewritten path also fails.
// ──────────────────────────────────────────────────────────────────────────────

if (typeof window !== 'undefined') {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async function patchedFetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    // ── 1. Extract URL string ────────────────────────────────────────────────
    let urlStr = '';
    if (typeof input === 'string') {
      urlStr = input;
    } else if (input instanceof URL) {
      urlStr = input.href;
    } else if (input && typeof input === 'object' && 'url' in input) {
      urlStr = (input as Request).url;
    } else {
      return originalFetch.call(this, input, init);
    }

    // ── 2. Parse URL ─────────────────────────────────────────────────────────
    let url: URL;
    try {
      url = new URL(urlStr, window.location.origin);
    } catch {
      return originalFetch.call(this, input, init);
    }

    // ── 3. Only intercept same-origin requests ───────────────────────────────
    if (url.origin !== window.location.origin) {
      return originalFetch.call(this, input, init);
    }

    // ── 4. Check if this is an RSC segment file (flat __next.*.txt) ──────────
    const pathname = url.pathname;
    const lastSlashIdx = pathname.lastIndexOf('/');
    if (lastSlashIdx === -1) return originalFetch.call(this, input, init);

    const dirPath = pathname.slice(0, lastSlashIdx);
    const filename = pathname.slice(lastSlashIdx + 1);

    // Match: __next.<segments...>.txt  (where segments are separated by dots)
    // Examples:
    //   __next.$d$locale.txt
    //   __next.$d$locale.blog.$d$slug.__PAGE__.txt
    //   __next._full.txt  ← single segment, no rewrite needed
    if (!filename.startsWith('__next.') || !filename.endsWith('.txt')) {
      return originalFetch.call(this, input, init);
    }

    // Extract the part between "__next." and ".txt"
    const inner = filename.slice('__next.'.length, -'.txt'.length); // e.g. "$d$locale.blog.$d$slug.__PAGE__"
    const parts = inner.split('.');

    // Only rewrite if there are multiple segments (otherwise no nesting needed)
    if (parts.length <= 1) {
      return originalFetch.call(this, input, init);
    }

    // ── 5. Rewrite: flat → hierarchical ─────────────────────────────────────
    // "__next.A.B.C.txt"  →  "__next.A/B/C.txt"
    const [first, ...rest] = parts;
    const nestedPath = `${dirPath}/__next.${first}/${rest.join('/')}.txt`;

    const rewrittenUrl = new URL(url.href);
    rewrittenUrl.pathname = nestedPath;

    let newInput: RequestInfo | URL;
    if (typeof input === 'string') {
      newInput = rewrittenUrl.href;
    } else if (input instanceof URL) {
      newInput = rewrittenUrl;
    } else {
      newInput = new Request(rewrittenUrl.href, input as Request);
    }

    // ── 6. Try rewritten path, fall back to original on any failure ──────────
    try {
      console.log(`[Patch Fetch] Intercepted RSC: ${url.pathname} -> Rewriting to: ${rewrittenUrl.pathname}`);
      const response = await originalFetch.call(this, newInput, init);
      if (response.ok) {
        console.log(`[Patch Fetch] Success fetching: ${rewrittenUrl.pathname}`);
        return response;
      }
      console.warn(`[Patch Fetch] Failed to fetch rewritten path (Status ${response.status}): ${rewrittenUrl.pathname}`);
    } catch (err) {
      console.error(`[Patch Fetch] Network error fetching rewritten path: ${rewrittenUrl.pathname}`, err);
    }

    console.log(`[Patch Fetch] Falling back to original fetch: ${url.pathname}`);
    return originalFetch.call(this, input, init);
  };
}

