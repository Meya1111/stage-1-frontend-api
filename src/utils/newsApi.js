const API_KEY = "4bee7c3e3d654a099bb85948d861b4d1";
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

