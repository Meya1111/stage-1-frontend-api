import { useEffect, useMemo, useState } from "react";
import { getSavedArticles, removeSavedArticleByUrl } from "../../utils/savedArticles";

export default function SavedArticles({ currentUserName = "Elise" }) {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    setSaved(getSavedArticles());
  }, []);

  const keywordsLine = useMemo(() => {
    const keywords = saved
      .map((a) => a.keyword)
      .filter(Boolean);

    const counts = keywords.reduce((acc, k) => {
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k]) => k);

    if (sorted.length === 0) return "";
    if (sorted.length === 1) return sorted[0];
    if (sorted.length === 2) return `${sorted[0]}, ${sorted[1]}`;

    return `${sorted[0]}, ${sorted[1]}, and ${sorted.length - 2} other`;
  }, [saved]);

  function handleDelete(url) {
    const next = removeSavedArticleByUrl(url);
    setSaved(next);
  }

  return (
    <main className="saved">
      <section className="saved__hero">
        <div className="saved__header">
        <p className="saved__title">Saved articles</p>

        <h1 className="saved__count">
          {currentUserName}, you have {saved.length} saved articles
        </h1>

        {keywordsLine && (
          <p className="saved__keywords">
            By keywords: <span>{keywordsLine}</span>
          </p>
        )}
        </div>
      </section>

      <section className="saved__list">
        <div className="cards">
          {saved.map((a) => (
            <article className="card" key={a.url}>
              <div className="card__image-wrap">
                {a.keyword && <span className="card__keyword">{a.keyword}</span>}

                <button
                  className="card__delete-button"
                  type="button"
                  aria-label="Remove from saved"
                  onClick={() => handleDelete(a.url)}
                />
                <img className="card__image" src={a.urlToImage} alt={a.title} />
              </div>

              <div className="card__content">
                <p className="card__date">{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : ""}</p>
                <h2 className="card__title">{a.title}</h2>
                <p className="card__text">{a.description}</p>
                <p className="card__source">{(a.source && a.source.name) || a.sourceName || ""}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}