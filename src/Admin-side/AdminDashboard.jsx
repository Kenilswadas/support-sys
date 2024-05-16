import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { TicketStatusContext } from "../App.js";
import { ThemeContext } from "../App.js";
import VerticalNavbar from "./components/VerticalNavbar.jsx";
function AdminDashboard({ Ticket }) {
  const navigate = useNavigate();
  const { setTicketStatus } = useContext(TicketStatusContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          navigate("/adminDashboard");
        } else navigate("/");
      } else navigate("/");
    });
  }, [navigate]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [ToggleView, setToggleView] = useState(false);
  const [allusers, setAllusers] = useState([]);
  // const [allTickets, setAllTickets] = useState([]);
  const [activeTickets, setActiveTickets] = useState([]);
  const [pendingTickets, setPendingTickets] = useState([]);
  const [completedTickets, setCompletedTickets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "UserDetails"), (snap) => {
      const alldata = snap.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      setAllusers(alldata);
    });
    onSnapshot(collection(db, "Tickets"), (snap) => {
      const alldata = snap.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      // setAllTickets(alldata);
      const allpendingickets = alldata.filter(
        (data) => data.Status === "Pending"
      );
      setPendingTickets(allpendingickets);
      const allactivetickets = alldata.filter(
        (data) => data.Status === "Active"
      );
      setActiveTickets(allactivetickets);
      const allcompletedtickets = alldata.filter(
        (data) => data.Status === "Completed"
      );
      setCompletedTickets(allcompletedtickets);
    });
  }, []);
  const TotalUsers = allusers.length;
  return (
    <div className={`max-sm:w-full max-md:w-full  dark:bg-gray-900`}>
      <Navbar />

      <VerticalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] dark:bg-gray-900 dark:text-white w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          <div className="grid grid-cols-3">
            <NavLink to={"/Ticket"} onClick={() => setTicketStatus("Active")}>
              <div className="bg-white shadow-xl hover:translate-y-1 hover:duration-150 dark:text-white dark:bg-gray-900 dark:shadow-lg dark:shadow-slate-500 rounded-lg h-28 m-2 p-4">
                <h1 className="w-full text-2xl text-[#056674] dark:text-white">
                  Active Tickets
                </h1>
                <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                  {activeTickets.length}
                </div>
              </div>
            </NavLink>
            <NavLink to={"/Ticket"} onClick={() => setTicketStatus("Pending")}>
              <div className="bg-white shadow-xl hover:translate-y-1 hover:duration-150 dark:bg-gray-900 dark:text-white dark:shadow-lg dark:shadow-slate-500  rounded-lg h-28 m-2 p-4">
                <h1 className="w-full text-2xl text-[#056674] dark:text-white">
                  Pending Tickets
                </h1>
                <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                  {pendingTickets.length}
                </div>
              </div>
            </NavLink>
            <NavLink
              to={"/Ticket"}
              onClick={() => setTicketStatus("Completed")}
            >
              <div className="bg-white shadow-xl hover:translate-y-1 hover:duration-150 dark:bg-gray-900 dark:text-white dark:shadow-lg dark:shadow-slate-500  rounded-lg h-28 m-2 p-4">
                <h1 className="w-full text-2xl text-[#056674] dark:text-white">
                  Completed Tickets
                </h1>
                <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                  {completedTickets.length}
                </div>
              </div>
            </NavLink>
            <NavLink to={"/Customers"}>
              <div className="bg-white shadow-xl hover:translate-y-1 hover:duration-150 dark:bg-gray-900 dark:text-white dark:shadow-lg dark:shadow-slate-500   rounded-lg h-28 m-2 p-4">
                <h1 className="w-full text-2xl text-[#056674] dark:text-white">
                  Customers
                </h1>
                <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                  {TotalUsers}
                </div>
              </div>
            </NavLink>
            <button onClick={toggleTheme}>
              Toggle to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
