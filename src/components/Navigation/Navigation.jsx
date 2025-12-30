import { Link } from "react-router-dom";

function Navigation({ onSignInClick }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/saved-news">Saved articles</Link>

      <button onClick={onSignInClick}>
        Sign In
      </button>
    </nav>
  );
}

export default Navigation;