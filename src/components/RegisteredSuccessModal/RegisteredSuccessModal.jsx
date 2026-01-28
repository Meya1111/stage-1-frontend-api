import "./RegisteredSuccessModal.css";
import closeIcon from "../../assets/close22.svg";

function RegisterSuccessModal({ isOpen, onClose, onSignIn }) {
  if (!isOpen) return null;

  const handleSignInClick = () => {
    onSignIn();
    onClose();
  };

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
          <img src={closeIcon} alt="close" className="modal__close-icon" />
        </button>

        <p className="modal__success-text">
          Registration successfully completed!
        </p>

        <button className="modal__link-button" onClick={handleSignInClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterSuccessModal;
