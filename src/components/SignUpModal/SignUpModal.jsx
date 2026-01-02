import "./SignUpModal.css";
import { useState } from "react";

function SignUpModal({ isOpen, onClose, onSwitch }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isFormValid =
    email && password.length >= 6 && username && isEmailValid(email);

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          x
        </button>

        <h2 className="modal__title">Sign up</h2>

        <label className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(
                isEmailValid(e.target.value) ? "" : "Invalid email address"
              );
            }}
          />
          {emailError && <span className="modal__error">{emailError}</span>}
        </label>

        <label className="modal__label">
          Password
          <input
            type="text"
            className="modal__input"
            placeholder="Enter your password"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError(e.target.value ? "" : "Username is required");
            }}
          />
          {usernameError && (
            <span className="modal__error">{usernameError}</span>
          )}
        </label>

        <label className="modal__label">
          Username
          <input
            type="text"
            className="modal__input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError(e.target.value ? "" : "Username is required");
            }}
          />
          {usernameError && (
            <span className="modal__error">{usernameError}</span>
          )}
        </label>
        <button
          className={`modal__submit ${
            isFormValid ? "modal__submit_active" : ""
          }`}
          disabled={!isFormValid}
        >
          Sign up
        </button>

        <p className="modal__switch">
          or{" "}
          <span onClick={onSwitch} className="modal__link">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUpModal;
