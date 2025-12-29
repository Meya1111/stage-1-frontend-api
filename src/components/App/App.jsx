import { Routes, Route } from "react-router-dom";

import Main from "../Main/Main.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/saved-news" element={<Main />} />
    </Routes>
  );
}

export default App;