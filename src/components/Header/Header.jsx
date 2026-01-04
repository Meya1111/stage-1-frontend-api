import "./Header.css";

function Header({ onSignInClick, isLoggedIn, currentUser, onLogout }) {
  return (
    <header className="header">
      <div className="header__overlay">
        <div className="header__content">
          <p className="header__logo">NewsExplorer</p>

          <nav className="header__nav">
            <button className="header__link header__link_active">Home</button>
            {isLoggedIn ? (
              <>
                <button className="header__link">Saved articles</button>

                <button className="header__user">
                  {currentUser?.name}
                  <span
                    className="header__logout"
                    onClick={onLogout}
                    aria-label="Log out"
                  />
                </button>
              </>
            ) : (
              <button className="header__button" onClick={onSignInClick}>
                Sign in
              </button>
            )}
          </nav>
        </div>
        <div className="header__hero">
          <h1 className="header__title">
            What's going on in <br />
            the world?
          </h1>

          <p className="header__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>

          <form className="search-form">
            <input
              className="search-form__input"
              type="text"
              placeholder="Enter topic"
            />
            <button className="search-form__button" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
