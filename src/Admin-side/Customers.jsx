import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import VericalNavbar from "./components/VerticalNavbar";
import CustomerDetailTable from "./components/Tables/CustomerDetailTable";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import ProductDetailTable from "./components/Tables/ProductDetailTable";

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
  const handleDeleteuser = (id) => {
    alert(id);
    deleteDoc(doc(db, "UserDetails", id));
  };
  return (
    <div className="max-sm:w-full max-md:w-full  dark:bg-[#0f161b]">
      <Navbar />
      <VericalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4]  dark:bg-[#040D12]  w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          <CustomerDetailTable
            data={allusers}
            handleDeleteCustomer={handleDeleteuser}
          />
        </div>
      </div>
    </div>
  );
}

export default Customers;
