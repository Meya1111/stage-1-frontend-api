import "./Header.css";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import closeIcon from "../../assets/close22.svg";

function Header({
  onSignInClick,
  isLoggedIn,
  currentUser,
  onLogout,
}) {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedPage ? "header_saved" : ""}`}>
      <div className="header__content">
        <div className="header__options">
          <p className="header__logo">NewsExplorer</p>

          <button
            className={`header__close ${
              isSavedPage ? "header__close_black" : ""
            }`}
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {!isMobileMenuOpen ? "=" : ""}
          </button>
        </div>

        <nav className="header__nav">
          <Link
            to="/"
            className={`header__link ${
              !isSavedPage ? "header__link_active" : ""
            }`}
          >
            Home
          </Link>

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
        <div className="header__overlay">
          <div className="header__mobile">
            <div className="header__content">
              <div className="header__options">
                <p className="header__logo"></p>

                <button
                  className="header__close"
                  type="button"
                  aria-label="Close menu"
                  onClick={() => {
                    console.log("Clicked: " + isMobileMenuOpen);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={closeIcon} alt="close menu" />
                </button>
              </div>
            </div>

            <nav className="header__mobile-nav">
              <div className="header__mobile-nav-options-nav">
                <button
                  className="header__mobile-nav-btn"
                  onClick={() => {
                    navigate("/");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Home
                </button>

                {isLoggedIn && (
                  <button
                    className="header__mobile-nav-btn"
                    onClick={() => {
                      navigate("/saved-news");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Saved articles
                  </button>
                )}
              </div>

              <div className="header__mobile-nav-options">
                {isLoggedIn ? (
                  <button
                    className="header__mobile-nav-last"
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
                    className="header__mobile-nav-last"
                    onClick={() => {
                      onSignInClick();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign in
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
