import React, { useContext, useEffect, useState } from "react";
import VerticalNavbar from "./components/VerticalNavbar";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../helpers/Navbar";
import { LoginContext, UserContext } from "../App";

function UserDashboard() {
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserContext);
  const [ToggleView, setToggleView] = useState(false);
  const [allproducts, setAllproducts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/UserDashboard");
      } else navigate("/");
    });
  }, [navigate]);

  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snap) => {
      const alldata = snap.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      setAllproducts(alldata);
    });
    onSnapshot(collection(db, "UserDetails"), (snap) => {
      const alldata = snap.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      const filterdata = alldata.filter(
        (some) => some.Uid === auth?.currentUser?.uid
      );
      setCurrentUser(filterdata);
    });
  }, []);

  return (
    <div className="max-sm:w-full max-md:w-full dark:bg-[#0f161b]">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <VerticalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] dark:bg-[#040D12] w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          <h1 className="text-3xl text-[#056674] dark:text-[#F39422] mb-4">
            Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentUser.map((user) =>
              user.ProductDetails.map((product, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ring-4 ring-red-500 ring-opacity-40 dark:ring-0"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={product.Model_Image}
                    alt="ProductImage"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">
                      {product.ProductName}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Model No: {product.Model_No}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Category: {product.Category}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm my-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Duis vitae ante vel eros fermentum faucibus sit amet
                      euismod lorem.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
                        $19.99
                      </span>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
