import "./LoginModal.css";

function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__content">
      <button type="button" className="modal__close" onClick={onClose} aria-label="Close modal">
      </button>
        <h2 className="modal__title">Sign in</h2>

        <label className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            placeholder="Enter email"
          />
        </label>

        <label className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            placeholder="Enter password"
          />
        </label>

        <button className="modal__submit">Sign in</button>

        <p className="modal__switch">
          or <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
