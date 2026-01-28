import "./LoginModal.css";
import { useState } from "react";
import closeIcon from "../../assets/close22.svg";

function LoginModal({ isOpen, onClose, onSwitch, onLogin }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const isFormValid = isEmailValid && password.length >= 1;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__content modal__content_auth">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="close" className="modal__close-icon" />
        </button>

        <h2 className="modal__title">Sign in</h2>

        <label className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setLoginError("");
            }}
          />
          {email && !isEmailValid && (
            <span className="modal__error">Invalid email address</span>
          )}
        </label>

        <label className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setLoginError("");
            }}
          />
        </label>

        {loginError && (
          <span className="modal__error modal__error_center">{loginError}</span>
        )}

        <button
          className={`modal__submit ${
            isFormValid ? "modal__submit_active" : ""
          }`}
          disabled={!isFormValid}
          onClick={() => {
            if (!email || !password) {
              setLoginError("Email and password required");
              return;
            }

            onLogin(email);
            onClose();
          }}
        >
          Sign in
        </button>

        <p className="modal__switch">
          or <span onClick={onSwitch}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
