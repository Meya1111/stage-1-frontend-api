import "./NewsCard.css";
import { useEffect, useState } from "react";
import { isArticleSaved } from "../../utils/savedArticles.js";

function NewsCard({
  article,
  isLoggedIn,
  onSave,
  keyword,
  currentUserName,
  onSignInClick,
}) {
  const [isSaved, setIsSaved] = useState(() =>
    isArticleSaved(currentUserName, article.url)
  );

  useEffect(() => {
    setIsSaved(isArticleSaved(currentUserName, article.url));
  }, [currentUserName, article.url, isLoggedIn]);

  function handleSaveClick(e) {
    e.stopPropagation();

    if (!isLoggedIn) return;

    if (typeof onSave === "function") {
      onSave(article, keyword);
    }

    setIsSaved(true);
  }

  return (
    <li className="card">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img
          src={article.urlToImage}
          alt={article.title}
          className="card__image"
        />

        <div className="card__content">
          <p className="card__date">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h3 className="card__title">{article.title}</h3>
          <p className="card__text">{article.description}</p>
          <p className="card__source">{article.source.name}</p>
        </div>
      </a>

      <button
        className={`card__save-button ${
          isSaved ? "card__save-button_active" : ""
        } ${!isLoggedIn ? "card__save-button_disabled" : ""}`}
        type="button"
        aria-label="Save article"
        onClick={handleSaveClick}
      >
        {!isLoggedIn && (
          <span className="card__save-tooltip">Sign in to save articles</span>
        )}
      </button>
    </li>
  );
}

export default NewsCard;
