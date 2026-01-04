import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import RegisteredSuccessModal from "../RegisteredSuccessModal/RegisteredSuccessModal";
import Preloader from "../Preloader/Preloader";
import SavedArticles from "../../pages/SavedArticles";
import { Routes, Route } from "react-router-dom"

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  function handleSearch(keyword) {
    setIsLoading(true);

    newsApi
      .getArticles(keyword)
      .then((res) => {
        setArticles(res.articles);
      })
      .catch(() => {
        console.error("Search failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleLogin = (email) => {
    setCurrentUser({
      name: email.split("@")[0],
    });
    setIsLoggedIn(true);
    closeAllModals();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

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
      <Header
        onSignInClick={openLogin}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <Main
        isLoggedIn={isLoggedIn}
        onSearch={handleSearch}
        isLoading={isLoading}
        articles={articles}
      />
      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeAllModals}
        onSwitch={openSignUp}
        onLogin={handleLogin}
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
