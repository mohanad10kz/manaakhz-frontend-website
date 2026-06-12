// Intercept RSC segment fetch requests and rewrite flat __next.*.txt
// to hierarchical __next.X/Y/Z.txt paths that actually exist in static export

const originalFetch = globalThis.fetch;

globalThis.fetch = async function patchedFetch(input, init) {
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

  let url: URL;
  try {
    url = new URL(urlStr, typeof window !== 'undefined' ? window.location.origin : undefined);
  } catch {
    return originalFetch.call(this, input, init);
  }

  // Only intercept same-origin requests
  if (typeof window !== 'undefined' && url.origin !== window.location.origin) {
    return originalFetch.call(this, input, init);
  }

  const pathname = url.pathname;
  const lastSlashIndex = pathname.lastIndexOf('/');
  if (lastSlashIndex !== -1) {
    const dirPath = pathname.slice(0, lastSlashIndex);
    const filename = pathname.slice(lastSlashIndex + 1);

    if (filename.startsWith('__next.') && filename.endsWith('.txt')) {
      const withoutPrefix = filename.slice('__next.'.length, -'.txt'.length);
      const parts = withoutPrefix.split('.');

      if (parts.length > 1) {
        const firstPart = parts[0];
        const restParts = parts.slice(1);
        const newFilename = `__next.${firstPart}/${restParts.join('/')}.txt`;
        const hierarchicalPath = `${dirPath}/${newFilename}`;

        url.pathname = hierarchicalPath;

        // Construct new input
        let newInput: RequestInfo | URL;
        if (typeof input === 'string') {
          newInput = url.href;
        } else if (input instanceof URL) {
          newInput = url;
        } else {
          // It is a Request object. Clone with new URL.
          newInput = new Request(url.href, input as Request);
        }

        try {
          const response = await originalFetch.call(this, newInput, init);
          if (response.ok) {
            return response;
          }
        } catch (err) {
          console.error('[Patch Fetch] Failed to fetch hierarchical RSC:', err);
        }
      }
    }
  }

  return originalFetch.call(this, input, init);
};
