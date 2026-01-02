import "./RegisteredSuccessModal.css";

function RegisterSuccessModal({ isOpen, onClose, onSignIn }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__content modal__content_success">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          x
        </button>

        <p className="modal__success-text">
          Registration successfully completed!
        </p>

        <button
          className="modal__link-button"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterSuccessModal;