import "./Main.css";
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";

function Main({ isLoading, articles, isSearched }) {
  const [visibleCount, setVisibleCount] = React.useState(3);

  return (
    <main className="main">
      {isLoading && <Preloader />}

      {articles && articles.length > 0 && (
        <section className="search-results">
          <h2 className="search-results__title">Search results</h2>

          <ul className="cards">
            {articles.slice(0, visibleCount).map((article, index) => (
              <NewsCard key={index} article={article} isLoggedIn={false} />
            ))}
          </ul>

          {visibleCount < articles.length && (
            <button
              className="search-results__button"
              onClick={() => setVisibleCount(visibleCount + 3)}
            >
              Show more
            </button>
          )}
        </section>
      )}
      <section className="author">
        <div className="author__container">
          <div className="author__avatar">
            <div className="author__smiley">
              <span className="author__eye author__eye_left"></span>
              <span className="author__eye author__eye_right"></span>
              <img
                src="/src/assets/authorsmile.svg"
                className="author__smile"
              />
            </div>

            <p className="author__avatar-text">
              Placeholder image.
              <br />
              Put an image of yourself here.
            </p>
          </div>
          <div className="author__content">
            <h2 className="author__title">About the author</h2>

            <p className="author__text">
              This block describes the project author. Here you should indicate
              your name, what you do, and which development technologies you
              know.
            </p>

            <p className="author__text">
              You can also talk about your experience with TripleTen, what you
              learned there, and how you can help potential customers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
