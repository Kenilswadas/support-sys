import React, { useEffect, useState } from "react";
import VerticalNavbar from "./components/VerticalNavbar";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import Navbar from "./components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [ToggleView, setToggleView] = useState(false);
  const [allproducts, setAllproducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     if (user.email === "admin@gmail.com") {
    //       navigate("/adminDashboard");
    //     } else navigate("/UserDashboard");
    //   } else navigate("/UserDashboard");
    // });
  }, [navigate]);
  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snap) => {
      const alldata = snap.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      setAllproducts(alldata);
    });
  }, []);
  return (
    <div className={`max-sm:w-full max-md:w-full dark:bg-gray-900 h-full`}>
      <Navbar />
      <VerticalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full p-4 overflow-auto">
        <div
          className={`bg-[#E0ECE4] grid grid-cols-3 dark:bg-gray-900 dark:text-white w-full h-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          {allproducts.map((product, index) => {
            return product.ModelDetails.map((e) => {
              return (
                <div class="bg-white rounded-lg shadow-lg ring-4 ring-red-500 ring-opacity-40 max-w-sm m-2 ">
                  <div class="">
                    <img
                      class="w-full h-fit"
                      // src={product.ModelDetails[index].Model_Image}
                      alt="ProductImage"
                    />
                    {/* <div className="absolute top-1/2 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                  Completd
                </div> */}
                  </div>
                  <div class="p-4">
                    <h3 class="text-lg font-medium mb-2">
                      {product.ProductName}
                    </h3>
                    <h3 class="text-lg font-Calibri">
                      {"Model_No : "}
                      {/* {e.Model_No} */}
                    </h3>
                    <h3 class="text-lg font-Calibri">
                      {"Category : "}
                      {product.Category}
                    </h3>
                    <p class="text-gray-600 text-sm mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Duis vitae ante vel eros fermentum faucibus sit amet
                      euismod lorem.
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-lg">$19.99</span>
                      <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
