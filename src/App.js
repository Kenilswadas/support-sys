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
import UserTickets from "./User-side/UserTickets.jsx";
import ImmediateUserSupport from "./User-side/ImmediateUserSupport.jsx";
import UserVideoSolutions from "./User-side/UserVideoSolutions.jsx";
export const UserContext = createContext(null);
export const LoadderContext = createContext(null);
export const TicketStatusContext = createContext(null);
export const ThemeContext = createContext();

export const LoginContext = createContext(null);

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
    <LoginContext.Provider value={{ viewLogin, setViewLogin }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <TicketStatusContext.Provider value={{ setTicketStatus, TicketStatus }}>
          <LoadderContext.Provider value={{ setIsloading, isLoading }}>
            <UserContext.Provider value={{ userName, setUserName }}>
              <div className={theme === "light" ? "" : "dark"}>
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Landingpage
                          setIsloading={setIsloading}
                          isLoading={isLoading}
                        />
                      }
                    />
                    <Route
                      path="/AdminDashboard"
                      element={<AdminDashboard />}
                    />
                    <Route path="/Ticket" element={<Tickets />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Customers" element={<Customers />} />
                    <Route path="/UserDashboard" element={<UserDashboard />} />
                    <Route path="/UserProfile" element={<UserProfile />} />
                    <Route path="/UserTickets" element={<UserTickets />} />
                    <Route
                      path="/UserVideoSolutions"
                      element={<UserVideoSolutions />}
                    />
                    <Route
                      path="/ImmediateUserSupport"
                      element={<ImmediateUserSupport />}
                    />
                    <Route
                      path="/OnlineSupport"
                      element={
                        <OnlineSupport
                          view={view}
                          setView={setView}
                          setIsloading={setIsloading}
                          isLoading={isLoading}
                        />
                      }
                    />
                    <Route
                      path="/Knowledgebased"
                      element={<Knowledgebased />}
                    />
                    <Route
                      path="/SupportTicket"
                      element={<SupportTicket view={view} setView={setView} />}
                    />
                  </Routes>
                </BrowserRouter>
              </div>
            </UserContext.Provider>
          </LoadderContext.Provider>
        </TicketStatusContext.Provider>
      </ThemeContext.Provider>
    </LoginContext.Provider>
  );
}

export { App };
