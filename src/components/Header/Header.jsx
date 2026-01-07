import "./Header.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header({
  onSignInClick,
  isLoggedIn,
  currentUser,
  onLogout,
  onSearch,
}) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isSavedPage = location.pathname === "/saved-news";

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword.trim()) return;
    onSearch(keyword);
  }

  return (
    <header className={`header ${isSavedPage ? "header_saved" : ""}`}>
      <div className="header__overlay">
        <div className="header__content">
          <p className="header__logo">NewsExplorer</p>

          <nav className="header__nav">
            <button
              className="header__link header__link_active"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            {isLoggedIn ? (
              <>
                <button
                  className={`header__link ${
                    isSavedPage ? "header__link_saved" : ""
                  }`}
                  onClick={() => navigate("/saved-news")}
                >
                  Saved articles
                </button>

                <button
                  className="header__user"
                  onClick={() => {
                    onLogout();
                    navigate("/");
                  }}
                >
                  {currentUser?.name}
                  <span className="header__logout" aria-label="Log out" />
                </button>
              </>
            ) : (
              <button className="header__button" onClick={onSignInClick}>
                Sign in
              </button>
            )}
          </nav>
        </div>
        {!isSavedPage && (
          <div className="header__hero">
            <h1 className="header__title">
              What's going on in <br />
              the world?
            </h1>

            <p className="header__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>

            <form className="search-form" onSubmit={handleSubmit}>
              <input
                className="search-form__input"
                type="text"
                placeholder="Enter topic"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="search-form__button" type="submit">
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
