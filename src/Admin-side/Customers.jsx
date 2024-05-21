import React, { useContext, useEffect, useState } from "react";
import VericalNavbar from "./components/VerticalNavbar";
import CustomerDetailTable from "./components/Tables/CustomerDetailTable";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import Navbar from "../helpers/Navbar";
import { LoginContext, UserContext } from "../App";
import SquareBtn from "../Support-sys/components/SquareBtn";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import AddUserForm from "./components/Form/AddUserForm";
import UpdateUserForm from "./components/Form/UpdateUserForm";

function Customers() {
  const { userName, setUserName } = useContext(UserContext);
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const [allusers, setAllusers] = useState([]);
  const [ToggleView, setToggleView] = useState(false);
  const [ShowAddUserForm, setShowAddUserForm] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
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
  const handleUpdateCustomer = (id) => {
    const selectedUser = allusers.find((some) => some.id === id);
    setSelectedUser(selectedUser);
  };
  return (
    <div className="max-sm:w-full max-md:w-full  dark:bg-[#0f161b]">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <VericalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4]  dark:bg-[#040D12]  w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          <div>
            <SquareBtn
              name={"Add Customer"}
              faicon={<HiOutlineViewGridAdd size={22} />}
              type={"button"}
              clickFunction={() => setShowAddUserForm(!ShowAddUserForm)}
            />
          </div>
          <CustomerDetailTable
            data={allusers}
            handleDeleteCustomer={handleDeleteCustomer}
            handleUpdateCustomer={handleUpdateCustomer}
            openupdate={openupdate}
            setOpenupdate={setOpenupdate}
          />
          {ShowAddUserForm ? (
            <AddUserForm
              ShowAddUserForm={ShowAddUserForm}
              setShowAddUserForm={setShowAddUserForm}
            />
          ) : null}
          {openupdate ? (
            <UpdateUserForm
              setOpenupdate={setOpenupdate}
              openupdate={openupdate}
              selectedUser={selectedUser}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Customers;
