import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import SignInpage from "./pages/SignInpage.jsx";
import Leandingpage from "./Support-sys/pages/Leandingpage.jsx";
import OnlineSupport from "./Support-sys/pages/OnlineSupport.jsx";
import SupportTicket from "./Support-sys/pages/SupportTicket.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Leandingpage />} />
          <Route path="/OnlineSupport" element={<OnlineSupport />} />
          <Route path="/SupportTicket" element={<SupportTicket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
