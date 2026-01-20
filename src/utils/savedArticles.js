const getUserKey = (username) => `saved_articles_${username || "guest"}`;

export function getSavedArticles(username) {
  const key = getUserKey(username);

  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("getSavedArticles error:", e);
    return [];
  }
}

export function saveArticles(username, list) {
  const key = getUserKey(username);
  localStorage.setItem(key, JSON.stringify(list));
}

export function isArticleSaved(username, url) {
  if (!username || !url) return false;
  const saved = getSavedArticles(username);
  return saved.some((a) => a.url === url);
}

export function addSavedArticle(username, article, keyword = "") {
  if (!username) return [];
  const saved = getSavedArticles(username);

  if (saved.some((a) => a.url === article.url)) return saved;

  const next = [
    {
      ...article,
      keyword,
      savedAt: Date.now(),
    },
    ...saved,
  ];

  saveArticles(username, next);
  return next;
}

export function removeSavedArticleByUrl(username, url) {
  if (!username) return [];
  const saved = getSavedArticles(username);

  const next = saved.filter((a) => a.url !== url);

  saveArticles(username, next);
  return next;
}
