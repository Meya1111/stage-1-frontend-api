import "./Main.css";
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import Hero from "../Hero/Hero";
import { getArticles } from "../../utils/newsApi";
import notFoundIcon from "../../assets/not-found.svg";
import authorSmile from "../../assets/authorsmile.svg";

function Main({
  isSavedPage,
  isLoggedIn,
  onSignInClick,
  onSaveArticle,
  saveArticles,
  currentUser, 
}) {
  const [keyword, setKeyword] = React.useState("");
  const [articles, setArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(3);
  const [isNothingFound, setIsNothingFound] = React.useState(false);

  const [avatar, setAvatar] = React.useState(null);

  React.useEffect(() => {
    if (!isLoggedIn || !currentUser?.name) return;

    const savedAvatar = localStorage.getItem(
      `avatar-${currentUser.name}`
    );

    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, [isLoggedIn, currentUser]);

  React.useEffect(() => {
    if (!isLoggedIn) {
      setAvatar(null);
    }
  }, [isLoggedIn]);

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

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      setAvatar(base64Image);

      if (currentUser?.name) {
        localStorage.setItem(
          `avatar-${currentUser.name}`,
          base64Image
        );
      }
    };

    reader.readAsDataURL(file);
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
          {isLoggedIn ? (
            <label className="author__avatar">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />

              {avatar ? (
                <img
                  src={avatar}
                  alt="Author avatar"
                  className="author__avatar-image"
                />
              ) : (
                <>
                  <div className="author__smiley">
                    <span className="author__eye author__eye_left"></span>
                    <span className="author__eye author__eye_right"></span>
                    <img
                      src={authorSmile}
                      alt="smile"
                      className="author__smile"
                    />
                  </div>

                  <p className="author__avatar-text">
                    Placeholder image.
                    <br />
                    Put an image of yourself here.
                  </p>
                </>
              )}
            </label>
          ) : (
            <div className="author__avatar">
              <div className="author__smiley">
                <span className="author__eye author__eye_left"></span>
                <span className="author__eye author__eye_right"></span>
                <img
                  src={authorSmile}
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
          )}

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