import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import RegisteredSuccessModal from "../RegisteredSuccessModal/RegisteredSuccessModal";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const openSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const openSuccessModal = () => {
    setIsSignUpOpen(false);
    setIsSuccessOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
    setIsSuccessOpen(false);
  };

  return (
    <div className="page">
      <Header onSignInClick={() => setIsLoginOpen(true)} />
      <Main />
      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeAllModals}
        onSwitch={openSignUp}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={closeAllModals}
        onSwitch={openLogin}
        onSuccess={openSuccessModal}
      />

      <RegisteredSuccessModal
        isOpen={isSuccessOpen}
        onClose={closeAllModals}
        onSignIn={openLogin}
      />
    </div>
  );
}

export default App;
