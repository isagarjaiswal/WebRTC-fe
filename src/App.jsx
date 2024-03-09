import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homePage";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
// import Navbar from "./component/Navbar/navbar";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
