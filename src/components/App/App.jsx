import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="page">
      <Header onSignInClick={() => setIsLoginOpen(true)} />
      <Main />
      <Footer />

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
