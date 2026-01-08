import "../Hero/Hero.css";

function Hero({ keyword, setKeyword, handleSubmit }) {
  return (
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
  );
}

export default Hero;
