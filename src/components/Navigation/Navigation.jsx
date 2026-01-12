import { NavLink } from "react-router-dom";
import "../Header/Header.css";

function Navigation({ onSignInClick }) {
  return (
    <nav>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `header__link ${isActive ? "header__link_active" : ""}`
        }
      >
        Home
      </NavLink>
      |{" "}
      <NavLink
        to="/saved-news"
        className={({ isActive }) =>
          `header__link ${isActive ? "header__link_active" : ""}`
        }
      >
        Saved articles
      </NavLink>
      <button onClick={onSignInClick}>Sign In</button>
    </nav>
  );
}

export default Navigation;
