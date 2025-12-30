function LoginModal({ onClose }) {
    return (
      <div className="modal">
        <div className="modal__content">
          <h2>Sign in</h2>
  
          <p>Login not set up yet</p>
  
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  
  export default LoginModal;