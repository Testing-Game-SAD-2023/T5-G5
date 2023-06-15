import "./pages/App.css";
import React from 'react'
import  { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Multi";
import Barra from "./pages/Barra";
import Modalita from "./pages/Modalita";
import Prova from "./LoginREC/Login";
import Single from "./pages/Single";
import Sign  from "./LoginREC/Registrazione";
import Prima from "./Attesa/Attesa";
import PasswordResetForm from "./LoginREC/ResetPass";
import PasswordResetReq from "./LoginREC/PasswordResetLink";
import OtherApp from "./Editor/Editor";

import Joinare from "./join";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/join" element={<Joinare />} />
        
          <Route path="/about" element={<Barra />} />
          <Route path="/mod" element={<Modalita />} />
          <Route path="/Signup" element={<Sign />} />
          <Route path="/Multi" element={<Home />} />
          <Route path="/Single" element={<Single />} />
          <Route path="/" element={<Prova />} />
          <Route path="/casa" element={<Prima />} />
          <Route path="/elem" element={<PasswordResetForm />} />
          <Route path="/via" element={<PasswordResetReq />} />
          <Route path="/password-reset/reset" element={<PasswordResetForm />} />
          
          <Route path="/about2" element={<OtherApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
