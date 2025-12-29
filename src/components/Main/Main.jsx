import "./Main.css";

function Main() {
  return (
    <main className="main">
      <section className="hero">
        <h1 className="hero__title">
          What's going on in the world?
        </h1>

        <p className="hero__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>

        <form className="search-form">
          <input
            className="search-form__input"
            placeholder="Enter topic"
          />
          <button
            type="submit"
            className="search-form__button"
          >
            Search
          </button>
        </form>
      </section>
    </main>
  );
}

export default Main;