import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/item/:id" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
