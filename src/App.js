import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landingpage from "./Support-sys/pages/Landingpage.jsx";
import OnlineSupport from "./Support-sys/pages/OnlineSupport.jsx";
import SupportTicket from "./Support-sys/pages/SupportTicket.jsx";
import Dashboard from "./Admin-side/Dashboard.jsx";
import Knowledgebased from "./Support-sys/pages/Knowledgebased.jsx";
import Tickets from "./Admin-side/Tickets.jsx";
import Categories from "./Admin-side/Categories.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
import Customers from "./Admin-side/Customers.jsx";
export const UserContext = createContext(null);
export const LoadderContext = createContext(null);
function App() {
  const [userName, setUserName] = useState(null);
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

  const [view, setView] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);

  return (
    <LoadderContext.Provider value={{ setIsloading, isLoading }}>
      <UserContext.Provider value={setUserName}>
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
              <Route path="/Ticket" element={<Tickets />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/Customers" element={<Customers />} />
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
                    viewLogin={viewLogin}
                    setViewLogin={setViewLogin}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    </LoadderContext.Provider>
  );
}

export { App };
