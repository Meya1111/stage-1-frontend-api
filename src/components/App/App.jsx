import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import RegisteredSuccessModal from "../RegisteredSuccessModal/RegisteredSuccessModal";
import { getArticles } from "../../utils/newsApi";
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SavedArticles from "../SavedArticles/SavedArticles";
import { useLocation } from "react-router-dom";


function App() {

  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";
  const [keyword, setKeyword] = React.useState("");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isSearched, setIsSearched] = React.useState(false);
  const [savedArticles, setSavedArticles] = useState([]);

  function handleSearch(keyword) {
    setIsLoading(true);
    setIsSearched(true);

    getArticles(keyword)
      .then((data) => {
        console.log("REAL API DATA:", data);
        setArticles(data.articles || []);
      })
      .catch((err) => {
        console.error(err);
        setArticles([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveArticle(article) {
    setSavedArticles((prev) => {
      const exists = prev.some((item) => item.url === article.url);
      if (exists) return prev;
      return [...prev, article];
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
    <div className="page page_saved">
      <Header
        onSignInClick={openLogin}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
            isSavedPage={isSavedPage}
            keyword={keyword}
            setKeyword={setKeyword}
            handleSubmit={handleSearch}
            articles={articles}
            isLoading={isLoading}
            savedArticles={savedArticles}
          />
          }
        />

        <Route
          path="/saved-news"
          element={
            <SavedArticles currentUserName={currentUser?.name || "User"}  savedArticles={savedArticles}/>
          }
        />
      </Routes>
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
