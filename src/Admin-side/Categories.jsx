import React, { useState, useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import VericalNavbar from "./components/VericalNavbar";
import SquareBtn from "../Support-sys/components/SquareBtn";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import AddCategoryForm from "../Admin-side/components/Form/AddCategoryForm.jsx";
import CustomerDetailTable from "./components/Tables/CustomerDetailTable.jsx";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig.jsx";
import ProductDetailTable from "./components/Tables/ProductDetailTable.jsx";
function Categories() {
  const [ToggleView, setToggleView] = useState(false);
  const [CategoryForm, setShowCategoryForm] = useState(false);
  const [allusers, setAllusers] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snap) => {
      const alldata = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllusers(alldata);
    });
  }, []);
  const handleDeleteProduct = (id) => {
    alert(id);
    deleteDoc(doc(db, "Products", id));
  };
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar />
      <VericalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64 `
          }`}
        >
          <SquareBtn
            name={"Add Category"}
            faicon={<HiOutlineViewGridAdd size={22} />}
            type={"button"}
            clickFunction={() => setShowCategoryForm(!CategoryForm)}
          />

          {CategoryForm ? (
            <AddCategoryForm
              CategoryForm={CategoryForm}
              setShowCategoryForm={setShowCategoryForm}
            />
          ) : null}
          <div className="flex p-4 overflow-auto ">
            <div
              className={`bg-[#E0ECE4] w-full flex items-center justify-center p-4 `}
            >
              <ProductDetailTable
                data={allusers}
                handleDelete={handleDeleteProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
