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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedPage ? "header_saved" : ""}`}>
      <div className="header__content header__content_saved">
        <p className="header__logo">NewsExplorer</p>

        <button
          className="header__burger"
          aria-label="Open menu"
          onClick={() => setIsMobileMenuOpen(true)}
        >
        =
        </button>

        <nav className="header__nav">
          <button
            className={`header__link ${
              !isSavedPage ? "header__link_active" : ""
            }`}
            onClick={() => navigate("/")}
          >
            Home
          </button>

          {isLoggedIn ? (
            <>
              <button
                className={`header__link ${
                  isSavedPage ? "header__link_active header__link_saved" : ""
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

      {isMobileMenuOpen && (
        <div className="header__help">
        <div className="header__mobile"> 
            <div className="header__content header__content_saved">
            <p className="header__logo">NewsExplorer</p>
            </div>
          <button
            className="header__close"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✕
          </button>

          <nav className="header__mobile-nav">
            <button
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            >
              Home
            </button>

            {isLoggedIn && (
              <button
                onClick={() => {
                  navigate("/saved-news");
                  setIsMobileMenuOpen(false);
                }}
              >
                Saved articles
              </button>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  onLogout();
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
              >
                Log out
              </button>
            ) : (
              <button
                onClick={() => {
                  onSignInClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign in
              </button>
            )}
          </nav>
        </div>
        </div>
      )}
    </header>
  );
}

export default Header;