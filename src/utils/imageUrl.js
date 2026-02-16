// Append Sanity CDN auto-format parameter to serve optimal format per browser
// JXL → Safari 17+, WebP → Chrome/Firefox, original → fallback
export function optimizedUrl(url) {
  if (!url) return url;
  if (url.includes('cdn.sanity.io')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=format`;
  }
  return url;
}
