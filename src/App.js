import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/screens/loginPage";
import SignupPage from "./components/screens/signupPage";
import HomePage from "./components/screens/homePage";
import Studentdetail from "./components/screens/studentdetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/l" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/studentdetails" element={<Studentdetail />} />
      </Routes>
    </Router>
  );
}

export default App;
