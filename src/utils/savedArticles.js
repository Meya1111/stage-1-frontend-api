const STORAGE_KEY = "saved_articles_v1";

export function getSavedArticles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("getSavedArticles error:", e);
    return [];
  }
}

export function saveArticles(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function isArticleSaved(article) {
  const saved = getSavedArticles();
  return saved.some((a) => a.url === article.url);
}

export function addSavedArticle(article, keyword = "") {
  const saved = getSavedArticles();


  if (saved.some((a) => a.url === article.url)) return saved;

  const next = [
    {
      ...article,
      keyword,            
      savedAt: Date.now(),
    },
    ...saved,
  ];

  saveArticles(next);
  return next;
}

export function removeSavedArticleByUrl(url) {
  const saved = getSavedArticles();
  const next = saved.filter((a) => a.url !== url);
  saveArticles(next);
  return next;
}