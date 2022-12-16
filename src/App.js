import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/Login";
import Home from "./pages/Home/Home";
import BookPreview from "./pages/BookPreview/BookPreview";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bookDetails/:id" element={<BookPreview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
