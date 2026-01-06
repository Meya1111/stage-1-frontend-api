import "./NotFound.css";
import notFoundImage from "../../assets/not-found.svg";

function NotFound() {
  return (
    <section className="not-found">
      <img
        src={notFoundImage}
        alt="Nothing found"
        className="not-found__image"
      />
      <h2 className="not-found__title">Nothing found</h2>
      <p className="not-found__text">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
}

export default NotFound;