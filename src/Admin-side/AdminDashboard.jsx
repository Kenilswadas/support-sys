import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext, TicketStatusContext, UserContext } from "../App.js";
import VerticalNavbar from "./components/VerticalNavbar.jsx";
import Navbar from "../helpers/Navbar.jsx";

function AdminDashboard() {
  const navigate = useNavigate();
  const { setTicketStatus } = useContext(TicketStatusContext);
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          navigate("/adminDashboard");
        } else navigate("/");
      } else navigate("/");
    });
  }, [navigate]);

  const [ToggleView, setToggleView] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTickets, setActiveTickets] = useState([]);
  const [pendingTickets, setPendingTickets] = useState([]);
  const [completedTickets, setCompletedTickets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "UserDetails"), (snap) => {
      const allData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUsers(allData);
    });

    onSnapshot(collection(db, "Tickets"), (snap) => {
      const allData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPendingTickets(allData.filter((data) => data.Status === "Pending"));
      setActiveTickets(allData.filter((data) => data.Status === "Active"));
      setCompletedTickets(
        allData.filter((data) => data.Status === "Completed")
      );
    });
  }, []);

  const totalUsers = allUsers.length;

  return (
    <div
      className={`max-sm:w-full max-md:w-full dark:bg-[#0f161b] min-h-screen`}
    >
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <VerticalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className={`flex flex-col lg:flex-row p-4 h-screen overflow-auto`}>
        <div
          className={`bg-[#E0ECE4] dark:bg-[#040D12] w-full lg:w-5/6 p-4  transition-all duration-300 ${
            ToggleView ? "lg:ml-24" : "lg:ml-64"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NavLink to={"/Ticket"} onClick={() => setTicketStatus("Active")}>
              <div className="bg-white dark:bg-[#183D3D] shadow-lg dark:shadow-[#152D35] rounded-lg h-28 m-2 p-4 hover:shadow-xl transform hover:scale-105 transition duration-200">
                <h1 className="text-2xl text-[#056674] dark:text-[#F39422]">
                  Active Tickets
                </h1>
                <div className="text-4xl font-bold text-[#056674] dark:text-[#F39422] mt-4 flex items-center justify-center">
                  {activeTickets.length}
                </div>
              </div>
            </NavLink>
            <NavLink to={"/Ticket"} onClick={() => setTicketStatus("Pending")}>
              <div className="bg-white dark:bg-[#183D3D] shadow-lg dark:shadow-[#152D35] rounded-lg h-28 m-2 p-4 hover:shadow-xl transform hover:scale-105 transition duration-200">
                <h1 className="text-2xl text-[#056674] dark:text-[#F39422]">
                  Pending Tickets
                </h1>
                <div className="text-4xl font-bold text-[#056674] dark:text-[#F39422] mt-4 flex items-center justify-center">
                  {pendingTickets.length}
                </div>
              </div>
            </NavLink>
            <NavLink
              to={"/Ticket"}
              onClick={() => setTicketStatus("Completed")}
            >
              <div className="bg-white dark:bg-[#183D3D] shadow-lg dark:shadow-[#152D35] rounded-lg h-28 m-2 p-4 hover:shadow-xl transform hover:scale-105 transition duration-200">
                <h1 className="text-2xl text-[#056674] dark:text-[#F39422]">
                  Completed Tickets
                </h1>
                <div className="text-4xl font-bold text-[#056674] dark:text-[#F39422] mt-4 flex items-center justify-center">
                  {completedTickets.length}
                </div>
              </div>
            </NavLink>
            <NavLink to={"/Customers"}>
              <div className="bg-white dark:bg-[#183D3D] shadow-lg dark:shadow-[#152D35] rounded-lg h-28 m-2 p-4 hover:shadow-xl transform hover:scale-105 transition duration-200">
                <h1 className="text-2xl text-[#056674] dark:text-[#F39422]">
                  Customers
                </h1>
                <div className="text-4xl font-bold text-[#056674] dark:text-[#F39422] mt-4 flex items-center justify-center">
                  {totalUsers}
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
