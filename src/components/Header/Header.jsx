import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <p className="header__logo">NewsExplorer</p>

        <nav className="header__nav">
          <button className="header__link header__link_active">
            Home
          </button>
          <button className="header__button">
            Sign in
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;