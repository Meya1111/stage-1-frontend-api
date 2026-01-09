const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/everything";

export function getArticles(keyword) {
  const from = new Date();
  from.setDate(from.getDate() - 7);

  const url = `${BASE_URL}?q=${encodeURIComponent(
    keyword
  )}&from=${from.toISOString()}&pageSize=100&apiKey=${API_KEY}`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

