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
      </div>
    </header>
  );
}

export default Header;
