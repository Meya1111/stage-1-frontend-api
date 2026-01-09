import "./Main.css";
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import Hero from "../Hero/Hero";
import { getArticles } from "../../utils/newsApi";

function Main({ isSavedPage }) {
  // ---------- STATE ----------
  const [keyword, setKeyword] = React.useState("");
  const [articles, setArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(3);

  // ---------- HANDLERS ----------
  function handleSubmit(e) {
    e.preventDefault();

    if (!keyword.trim()) {
      return;
    }

    setIsLoading(true);

   
      getArticles(keyword)
      .then((res) => {
        setArticles(res.articles);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ---------- RENDER ----------
  return (
    <main className="main">
      {/* HERO (only on main page) */}
      {!isSavedPage && (
        <Hero
          keyword={keyword}
          setKeyword={setKeyword}
          handleSubmit={handleSubmit}
        />
      )}

      {/* PRELOADER */}
      {isLoading && <Preloader />}

      {/* SEARCH RESULTS */}
      {articles && articles.length > 0 && (
        <section className="search-results">
          <h2 className="search-results__title">Search results</h2>

          <ul className="cards">
            {articles.slice(0, visibleCount).map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                isLoggedIn={false}
              />
            ))}
          </ul>

          {visibleCount < articles.length && (
            <div className="search-results__button-wrapper">
              <button
                className="search-results__button"
                onClick={() => setVisibleCount(visibleCount + 3)}
              >
                Show more
              </button>
            </div>
          )}
        </section>
      )}

      {/* ABOUT THE AUTHOR */}
      <section className="author">
        <div className="author__container">
          <div className="author__avatar">
            <div className="author__smiley">
              <span className="author__eye author__eye_left"></span>
              <span className="author__eye author__eye_right"></span>
              <img
                src="/src/assets/authorsmile.svg"
                alt="smile"
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