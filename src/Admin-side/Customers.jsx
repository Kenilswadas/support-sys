import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import VericalNavbar from "./components/VericalNavbar";
import CustomerDetailTable from "./components/Tables/CustomerDetailTable";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig";

function Customers() {
  const [allusers, setAllusers] = useState([]);
  const [ToggleView, setToggleView] = useState(false);
  useEffect(() => {
    onSnapshot(collection(db, "UserDetails"), (snap) => {
      const alldata = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllusers(alldata);
    });
  }, []);
  const handleDeleteCustomer = (id) => {
    deleteDoc(doc(db, "UserDetails", id));
  };
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
          <CustomerDetailTable
            data={allusers}
            handleDeleteCustomer={handleDeleteCustomer}
          />
        </div>
      </div>
    </div>
  );
}

export default Customers;
