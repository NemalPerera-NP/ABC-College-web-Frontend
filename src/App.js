import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/screens/loginPage";
import SignupPage from "./components/screens/signupPage";
import HomePage from "./components/screens/homePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
