import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import SignInpage from "./pages/SignInpage.jsx";
import Landingpage from "./Support-sys/pages/Landingpage.jsx";
import OnlineSupport from "./Support-sys/pages/OnlineSupport.jsx";
import SupportTicket from "./Support-sys/pages/SupportTicket.jsx";
import Dashboard from "./Admin-side/Dashboard.jsx";
import Knowledgebased from "./Support-sys/pages/Knowledgebased.jsx";
import Tickets from "./Admin-side/Tickets.jsx";
import Categories from "./Admin-side/Categories.jsx";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
import Customers from "./Admin-side/Customers.jsx";

function App() {
  const [userName, setUserName] = useState();
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(auth?.currentUser?.displayName);
      } else {
        setUserName(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.currentUser, userName]);
  const [Ticket, SetTicket] = useState([
    {
      "Sr No.": "1",
      "Ticket Id": "47s474",
      Name: "Kenil",
      "Email Id": "kenilsoni2710@gmail.com",
      Category: "Automatic Digital Epstein Tester-VET",
      SubCategory: "3 Phase Precision Power Analyzer - VPAs",
      "Model No": "Akfn7814144",
      "Serial No": "78174w71s",
      Issue:
        "No Electricity getting in motter -- Power not getting - power supply isse ",
      Status: "Pending",
    },
    {
      "Sr No.": "2",
      "Ticket Id": "47s474",
      Name: "Kenil",
      "Email Id": "kenilsoni2710@gmail.com",
      Category: "Automatic Digital Epstein Tester-VET",
      SubCategory: "3 Phase Precision Power Analyzer - VPAs",
      "Model No": "Akfn7814144",
      "Serial No": "78174w71s",
      Issue:
        "No Electricity getting in motter -- Power not getting - power supply isse ",
      Status: "Pending",
    },
    {
      "Sr No.": "3",
      "Ticket Id": "47s474",
      Name: "Kenil",
      "Email Id": "kenilsoni2710@gmail.com",
      Category: "Automatic Digital Epstein Tester-VET",
      SubCategory: "3 Phase Precision Power Analyzer - VPAs",
      "Model No": "Akfn7814144",
      "Serial No": "78174w71s",
      Issue:
        "No Electricity getting in motter -- Power not getting - power supply isse ",
      Status: "Pending",
    },
  ]);
  const [view, setView] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Landingpage
                viewLogin={viewLogin}
                setViewLogin={setViewLogin}
                userName={userName}
                setUserName={setUserName}
                setIsloading={setIsloading}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/AdminDashboard" element={<Dashboard />} />
          <Route path="/Ticket" element={<Tickets Ticket={Ticket} />} />
          <Route path="/Categories" element={<Categories Ticket={Ticket} />} />
          <Route path="/Customers" element={<Customers Ticket={Ticket} />} />
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
            element={
              <SupportTicket
                Ticket={Ticket}
                SetTicket={SetTicket}
                viewLogin={viewLogin}
                setViewLogin={setViewLogin}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
