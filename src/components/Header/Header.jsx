import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__overlay">
        <div className="header__content">
          <p className="header__logo">NewsExplorer</p>

          <nav className="header__nav">
            <button className="header__link header__link_active">Home</button>
            <button className="header__button">Sign in</button>
          </nav>
        </div>
        <div className="header__hero">
          <h1 className="header__title">What&apos;s going on in the world?</h1>

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
