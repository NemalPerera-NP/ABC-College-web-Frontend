import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/screens/loginPage";
import SignupPage from "./components/screens/signupPage";
import HomePage from "./components/screens/homePage";
import Studentdetail from "./components/screens/studentdetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Studentdetail />} />
      </Routes>
    </Router>
  );
}

export default App;
