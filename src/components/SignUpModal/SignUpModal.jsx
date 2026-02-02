import "./SignUpModal.css";
import { useState } from "react";
import closeIcon from "../../assets/close22.svg";

function SignUpModal({ isOpen, onClose, onSwitch, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isUsernameValid = username.length >= 2;

  const isFormValid = isEmailValid && isPasswordValid && isUsernameValid;

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
              setSubmitError("");
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
            }}
          />
          {password && !isPasswordValid && (
            <span className="modal__error">
              Password must be at least 6 characters
            </span>
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
              setUsernameError("");
            }}
          />
          {usernameError && (
            <span className="modal__error">{usernameError}</span>
          )}
        </label>

        {submitError && (
          <span className="modal__error modal__error_center">
            {submitError}
          </span>
        )}

        <button
          className={`modal__submit ${
            isFormValid ? "modal__submit_active" : ""
          }`}
          disabled={!isFormValid}
          onClick={() => {
            if (email === "example@test.com") {
              setSubmitError("This email is not available");
              return;
            }
            onSuccess();
          }}
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
