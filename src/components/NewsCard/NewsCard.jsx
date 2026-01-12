import "./NewsCard.css";
import { useEffect, useState } from "react";
import {
  addSavedArticle,
  removeSavedArticleByUrl,
  isArticleSaved,
} from "../../utils/savedArticles.js";

function NewsCard({ article, isLoggedIn, onSave }) {
  const [isSaved, setIsSaved] = useState(isArticleSaved(article.url));

  function handleSaveClick() {
    if (!isLoggedIn) {
      onSave();
      return;
    }

    if (isSaved) {
      removeSavedArticleByUrl(article.url);
      setIsSaved(false);
    } else {
      addSavedArticle(article);
      setIsSaved(true);
    }
  }

  return (
    <li className="card">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="card__image"
      />

      <button
        className={`card__save-button ${
          isSaved ? "card__save-button_active" : ""
        }`}
        type="button"
        aria-label="Save article"
        onClick={handleSaveClick}
      >
        {!isLoggedIn && (
          <span className="card__save-tooltip">Sign in to save articles</span>
        )}
      </button>

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
    </li>
  );
}

export default NewsCard;
