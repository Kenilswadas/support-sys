import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import SignInpage from "./pages/SignInpage.jsx";
import Leandingpage from "./Support-sys/pages/Leandingpage.jsx";
import OnlineSupport from "./Support-sys/pages/OnlineSupport.jsx";
import SupportTicket from "./Support-sys/pages/SupportTicket.jsx";
import TicketDashboard from "./Admin-side/TicketDashboard.jsx";
function App() {
  const [Ticket, SetTicket] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Leandingpage />} />
          <Route path="/Admin" element={<TicketDashboard Ticket={Ticket} />} />
          <Route path="/OnlineSupport" element={<OnlineSupport />} />
          <Route
            path="/SupportTicket"
            element={<SupportTicket Ticket={Ticket} SetTicket={SetTicket} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
