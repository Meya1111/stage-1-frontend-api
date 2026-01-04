const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const getNews = ({ keyword, from, to, pageSize = 100 }) => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const url = `${newsApiBaseUrl}?q=${keyword}&from=${from}&to=${to}&pageSize=${pageSize}&apiKey=${apiKey}`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};
