import "./NewsCard.css";

function NewsCard({ article }) {
  return (
    <li className="card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="card__image"
        />
      )}

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

        <p className="card__source">{article.source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;