import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import SignInpage from "./pages/SignInpage.jsx";
import Landingpage from "./Support-sys/pages/Landingpage.jsx";
import OnlineSupport from "./Support-sys/pages/OnlineSupport.jsx";
import SupportTicket from "./Support-sys/pages/SupportTicket.jsx";
import TicketDashboard from "./Admin-side/TicketDashboard.jsx";
import Knowledgebased from "./Support-sys/pages/Knowledgebased.jsx";
function App() {
  const [Ticket, SetTicket] = useState([]);
  const [view, setView] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Landingpage viewLogin={viewLogin} setViewLogin={setViewLogin} />
            }
          />
          <Route path="/Admin" element={<TicketDashboard Ticket={Ticket} />} />
          <Route
            path="/OnlineSupport"
            element={
              <OnlineSupport
                view={view}
                setView={setView}
                viewLogin={viewLogin}
                setViewLogin={setViewLogin}
              />
            }
          />
          <Route path="/Knowledgebased" element={<Knowledgebased />} />
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
