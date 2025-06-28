const STORAGE_KEY = 'short-links';

export function getShortLinks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveShortLink(link) {
  const all = getShortLinks();
  all.push({ ...link, clicks: [] });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function updateShortLink(updated) {
  const all = getShortLinks();
  const newList = all.map(link =>
    link.shortCode === updated.shortCode ? updated : link
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
}
