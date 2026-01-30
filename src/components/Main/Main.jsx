import "./Main.css";
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import Hero from "../Hero/Hero";
import { getArticles } from "../../utils/newsApi";
import notFoundIcon from "../../assets/not-found.svg";
import defaultAuthor from "../../assets/Authorphoto.svg";

function Main({
  isSavedPage,
  isLoggedIn,
  onSignInClick,
  onSaveArticle,
}) {
  const [keyword, setKeyword] = React.useState("");
  const [articles, setArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(3);
  const [isNothingFound, setIsNothingFound] = React.useState(false);

  const [avatar, setAvatar] = React.useState(defaultAuthor);

  React.useEffect(() => {
    const savedAvatar = localStorage.getItem("author-avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!keyword.trim()) {
      return;
    }

    setIsNothingFound(false);
    setIsLoading(true);

    getArticles(keyword)
      .then((res) => {
        if (res.articles.length === 0) {
          setIsNothingFound(true);
          setArticles([]);
        } else {
          setArticles(res.articles);
          setIsNothingFound(false);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className="main">
      {!isSavedPage && (
        <Hero
          keyword={keyword}
          setKeyword={setKeyword}
          handleSubmit={handleSubmit}
        />
      )}

      {isLoading && <Preloader />}

      {!isLoading && isNothingFound && (
        <section className="not-found">
          <img
            src={notFoundIcon}
            alt="Nothing found"
            className="not-found__icon"
          />
          <h2 className="not-found__title"></h2>
          <p className="not-found__text"></p>
        </section>
      )}

      {articles && articles.length > 0 && (
        <section className="search-results">
          <h2 className="search-results__title">Search results</h2>

          <ul className="cards cards--main">
            {articles.slice(0, visibleCount).map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                isLoggedIn={isLoggedIn}
                onSave={onSaveArticle}
                keyword={keyword}
                onSignInClick={onSignInClick}
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

      <section className="author">
        <div className="author__container">
          <div className="author__avatar">
            {avatar ? (
              <img
                src={avatar}
                alt="Author avatar"
                className="author__avatar-image"
              />
            ) : (
              <div
                className="author__placeholder"
                onClick={() =>
                  isLoggedIn &&
                  document.getElementById("author-avatar-input").click()
                }
              >
              </div>
            )}
          </div>

          <div className="author__content">
            <h2 className="author__title">About the author</h2>

            <p className="author__text">
              My name is Meya Warrior, and I am a software engineer with
              experience building modern websites and applications. I work with
              front-end and back-end development technologies such as HTML, CSS,
              and JavaScript, and I enjoy bringing ideas to life through clean
              and functional design.
            </p>

            <p className="author__text">
              My experience with TripleTen was a learning journey that involved
              a lot of problem-solving and moments that were challenging at
              times. Some concepts were complicated at first, but with
              consistency, practice, and support from the staff, I was able to
              catch on and eventually work through them on my own. Through the
              program, I learned how to build different websites, structure
              front-end layouts, and set up both front-end and back-end
              functionality. In the future, I hope to help potential customers
              by creating user-friendly, reliable websites and continuing to
              grow as a developer with each project I take on.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
