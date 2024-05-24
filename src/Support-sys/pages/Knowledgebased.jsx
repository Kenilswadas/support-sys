import React, { useEffect, useState, useContext } from "react";
import VideoCard from "../components/VideoCard";
import Navbar from "../../helpers/Navbar";
import { LoginContext, UserContext } from "../../App";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { Formikselect } from "../components/Formikselect";
import { Formik } from "formik";
import { MdFilterAlt } from "react-icons/md";

function Knowledgebased() {
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [viewFilter, setViewFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
      setFilteredProducts(data);
    });

    return () => unsubscribe();
  }, []);

  const handleViewFilter = () => {
    setViewFilter(!viewFilter);
  };

  const handleClearFilter = () => {
    setViewFilter(false);
    setFilteredProducts(products);
  };

  const handleCategoryChange = (value) => {
    const filteredData = products.filter((data) => data.Category === value);
    setFilteredProducts(filteredData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <div className="p-4 flex flex-col md:flex-row w-full justify-between items-center">
        <h1 className="text-3xl text-[#056674] dark:text-[#F39422]">
          Video Solutions
        </h1>
        <div className="flex items-center mt-4 md:mt-0">
          {viewFilter && (
            <Formik
              initialValues={{ category: "" }}
              onSubmit={(values) => {
                handleCategoryChange(values.category);
              }}
            >
              {({ setFieldValue }) => (
                <div className="m-2">
                  <Formikselect
                    name="category"
                    data={[...new Set(products.map((e) => e.Category))]} // Remove duplicates
                    onChange={(selectedCategory) => {
                      setFieldValue("category", selectedCategory);
                      handleCategoryChange(selectedCategory);
                    }}
                  />
                </div>
              )}
            </Formik>
          )}
          <div
            className="flex items-center justify-center text-[#056674] cursor-pointer mx-2"
            onClick={handleViewFilter}
          >
            <span>Filter By Category</span>
            <MdFilterAlt size={28} />
          </div>
          {viewFilter && (
            <div className="flex items-center justify-center text-[#056674] cursor-pointer mx-2">
              <span>Clear Filters</span>
              <FaFilterCircleXmark size={25} onClick={handleClearFilter} />
            </div>
          )}
        </div>
      </div>
      <section className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) =>
          product.Allissues.map((issue, index) => {
            const videoId = issue.video.split("/").slice(-1)[0].split("?")[0];
            return issue.video ? (
              <VideoCard
                key={`${product.id}-${index}`}
                src={videoId}
                description={issue.description || "Video description"}
                category={product.Category}
                productName={product.ProductName}
              />
            ) : null;
          })
        )}
      </section>
    </div>
  );
}

export default Knowledgebased;
