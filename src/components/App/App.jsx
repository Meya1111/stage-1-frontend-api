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
import SavedArticles from "../../components/SavedArticles/SavedArticles";
import { useLocation } from "react-router-dom";
import {
  getSavedArticles,
  removeSavedArticleByUrl,
  addSavedArticle,
} from "../../utils/savedArticles";


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
    if (!currentUser?.name) return;

    const next = addSavedArticle(currentUser.name, article);
    setSavedArticles(next);
  }

  function handleDeleteArticle(url) {
    if (!currentUser?.name) return;

    const next = removeSavedArticleByUrl(currentUser.name, url);
    setSavedArticles(next);
  }

  const handleLogin = (email) => {
    const username = email.split("@")[0];

    setCurrentUser({ name: username });
    setSavedArticles(getSavedArticles(username));
    setIsLoggedIn(true);
    closeAllModals();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
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
              isLoggedIn={isLoggedIn}
              onSignInClick={openLogin}
              onSaveArticle={handleSaveArticle}
              savedArticles={savedArticles}
              currentUser={currentUser}
            />
          }
        />

        <Route
          path="/saved-news"
          element={
            <SavedArticles
              currentUserName={currentUser?.name || "User"}
              savedArticles={savedArticles}
              onDelete={handleDeleteArticle}
            />
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
