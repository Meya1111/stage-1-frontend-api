import "./Footer.css";
import githubIcon from "../../assets/githubIcon.svg";
import inIcon from "../../assets/inIcon.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2026 Supersite, Powered by News API</p>

      <div className="footer__links">
        <Link to="/" className="footer__link">
          Home
        </Link>

        <a
          href="https://tripleten.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          TripleTen
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon-link"
        >
          <img src={githubIcon} alt="GitHub" className="footer__icon" />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon-link"
        >
          <img src={inIcon} alt="LinkedIn (in)" className="footer__icon" />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon-link"
        ></a>
      </div>
    </footer>
  );
}

export default Footer;
