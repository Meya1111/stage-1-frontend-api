import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const openSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
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
      />
    </div>
  );
}

export default App;
