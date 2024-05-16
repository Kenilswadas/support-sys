import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landingpage from "./Support-sys/pages/Landingpage.jsx";
import OnlineSupport from "./Support-sys/pages/OnlineSupport.jsx";
import SupportTicket from "./Support-sys/pages/SupportTicket.jsx";
import Knowledgebased from "./Support-sys/pages/Knowledgebased.jsx";
import Tickets from "./Admin-side/Tickets.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
import Customers from "./Admin-side/Customers.jsx";
import Products from "./Admin-side/Products.jsx";
import AdminDashboard from "./Admin-side/AdminDashboard.jsx";
import UserDashboard from "./User-side/UserDashboard.jsx";
import UserProfile from "./User-side/UserProfile.jsx";
export const UserContext = createContext(null);
export const LoadderContext = createContext(null);
export const TicketStatusContext = createContext(null);
export const ThemeContext = createContext();

function App() {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [TicketStatus, setTicketStatus] = useState(null);
  const [theme, setTheme] = useState("light"); // Default theme is 'light'

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
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <TicketStatusContext.Provider value={{ setTicketStatus, TicketStatus }}>
        <LoadderContext.Provider value={{ setIsloading, isLoading }}>
          <UserContext.Provider value={setUserName}>
            <div className={theme === "light" ? "" : "dark"}>
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
                  <Route path="/AdminDashboard" element={<AdminDashboard />} />
                  <Route path="/UserDashboard" element={<UserDashboard />} />
                  <Route path="/UserProfile" element={<UserProfile />} />
                  <Route path="/Ticket" element={<Tickets />} />
                  <Route path="/Products" element={<Products />} />
                  <Route path="/Customers" element={<Customers />} />
                  <Route
                    path="/OnlineSupport"
                    element={
                      <OnlineSupport
                        viewLogin={viewLogin}
                        setViewLogin={setViewLogin}
                        userName={userName}
                        setUserName={setUserName}
                        view={view}
                        setView={setView}
                        setIsloading={setIsloading}
                        isLoading={isLoading}
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
      </TicketStatusContext.Provider>
    </ThemeContext.Provider>
  );
}

export { App };
