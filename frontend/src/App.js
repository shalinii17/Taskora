import Header from "./Components/Header";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import DashboardPage from "./Pages/DashboardPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
);

  return (
    <BrowserRouter>
      <Header
  isLoggedIn={isLoggedIn}
  onLogout={() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }}
/>



      <Routes>
        <Route path="/" element={<LandingPage />} />    {/* / maps to LandingPage */}
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />  {/* /login maps to login Page*/}
        <Route path="/signup" element={<SignupPage />} />  {/* /signup maps to signup Page*/}
        <Route path="/dashboard" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}> 
            <DashboardPage /> 
          </ProtectedRoute>} />  {/* /dashboard maps to dashboard Page*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;


