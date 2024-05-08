import React, { useEffect, useState } from "react";
import VericalNavbar from "./components/VericalNavbar";
import Navbar from "../Admin-side/components/Navbar.jsx";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
function Dashboard({ Ticket }) {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        if (user.email === "admin@gmail.com") {
          navigate("/adminDashboard");
        } else navigate("/");
      } else navigate("/");
    });
  }, [navigate]);
  const [ToggleView, setToggleView] = useState(false);
  const [allusers, setAllusers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    onSnapshot(collection(db, "UserDetails"), (snap) => {
      const alldata = snap.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      setAllusers(alldata);
    });
  }, []);
  const sumOfIndices = allusers.length;

  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar />
      <VericalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          <div className="grid grid-cols-3">
            <div className="bg-white rounded-lg h-28 m-2 p-4">
              <h1 className="w-full text-2xl text-[#056674]">Active Tickets</h1>
              <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                11
              </div>
            </div>
            <div className="bg-white rounded-lg h-28 m-2 p-4">
              <h1 className="w-full text-2xl text-[#056674]">
                Pending Tickets
              </h1>
              <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                2
              </div>
            </div>
            <div className="bg-white rounded-lg h-28 m-2 p-4">
              <h1 className="w-full text-2xl text-[#056674]">
                Completed Tickets
              </h1>
              <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                20
              </div>
            </div>
            <NavLink to={"/Customers"}>
              <div className="bg-white rounded-lg h-28 m-2 p-4">
                <h1 className="w-full text-2xl text-[#056674]">Customers</h1>
                <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                  {sumOfIndices}
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
