import React, { useState, useContext, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Form, Formik } from "formik";
import { FormikInput } from "../components/FormikInput.jsx";
import Button from "../components/Button.jsx";
import * as Yup from "yup";
import { Formikselect } from "../components/Formikselect.jsx";
import { option } from "../components/Data.jsx";
import { NavLink } from "react-router-dom";
import LoginModel from "../components/LoginModel.jsx";
import { LoginContext, UserContext } from "../../App.js";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../FirebaseConfig.jsx";
import { CgDetailsLess } from "react-icons/cg";
import { ToastContainer } from "react-toastify";
import { LoadderContext } from "../../App.js";
import Loader from "../../helpers/Loader.jsx";
import InfoModel from "../components/InfoModel.jsx";
import Navbar from "../../helpers/Navbar.jsx";

function SupportTicket({ view, setView }) {
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserContext);
  const { isLoading } = useContext(LoadderContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);

  const handleClose = () => setView(!view);

  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(allProducts);
      setCategories([...new Set(allProducts.map((e) => e.Category))]);
    });
  }, []);

  const handleCloseLogin = () => setViewLogin(!viewLogin);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        setUserName={setUserName}
      />
      <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        {isLoading && <Loader />}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-10 w-full max-w-4xl transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-6 text-center text-red-600">
            Support - Ticket
          </h2>
          <Formik
            initialValues={{
              product: "",
              category: "",
              modelno: "",
              serialno: "",
              issue: "",
              haveyougonethrough: "",
              other: "",
            }}
            validationSchema={Yup.object({
              product: Yup.string().required("*required"),
              issue: Yup.string().required("*required"),
            })}
            onSubmit={(values) => {
              setView(!view);
              setValues(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Formikselect
                    label="Category"
                    name="category"
                    value={values.category}
                    data={categories}
                    onChange={(selectedCategory) => {
                      setFieldValue("category", selectedCategory);
                      setFieldValue("product", "");
                      setFieldValue("serialno", "");
                    }}
                  />
                  <Formikselect
                    label="Select Product"
                    name="product"
                    data={products
                      .filter((data) => data.Category === values.category)
                      .map((e) => e.ProductName)}
                    onChange={(selectedProduct) => {
                      setFieldValue("product", selectedProduct);
                      setFieldValue("issue", "");
                      setFieldValue("serialno", "");
                    }}
                  />
                  <Formikselect
                    label="Serial No"
                    name="serialno"
                    data={products
                      .filter((data) => data.ProductName === values.product)
                      .flatMap((product) => product.Serial_No)}
                    value={values.serialno}
                    onChange={(selectedSerialNo) => {
                      setFieldValue("serialno", selectedSerialNo);
                      setFieldValue("issue", "");
                    }}
                  />
                  <Formikselect
                    label="Model No"
                    name="modelno"
                    placeholder="Enter Model No"
                    value={values.modelno}
                    data={products
                      .filter(
                        (product) => product.ProductName === values.product
                      )
                      .flatMap((product) =>
                        product.ModelDetails.filter(
                          (model) =>
                            model.Assigned_Serial_No === values.serialno
                        )
                      )
                      .map((model) => model.Model_No)}
                    onChange={(selectedModelNo) => {
                      setFieldValue("modelno", selectedModelNo);
                      setFieldValue("issue", "");
                    }}
                  />
                </div>
                <Formikselect
                  label="Select Your Issue"
                  name="issue"
                  data={products
                    .filter((product) => product.ProductName === values.product)
                    .flatMap((product) =>
                      product.Allissues.filter(
                        (issue) => issue.Assigned_Model_No === values.modelno
                      )
                    )
                    .map((issue) => issue.issue)}
                  onChange={(selectedIssue) => {
                    setFieldValue("issue", selectedIssue);
                    setFieldValue("haveyougonethrough", "");
                  }}
                />
                {values.issue && values.issue !== "Other" && (
                  <div className="flex items-center justify-between">
                    <p className="text-[#77B0AA] text-xl font-medium">
                      Have you gone through the Online Support?
                    </p>
                    <Formikselect
                      name="haveyougonethrough"
                      data={option.map((e) => e.name)}
                      onChange={(selectedOption) => {
                        setFieldValue("haveyougonethrough", selectedOption);
                      }}
                    />
                  </div>
                )}
                {values.haveyougonethrough === "yes" && values.issue && (
                  <div className="space-y-4">
                    <p className="text-[#056674] flex items-center">
                      <CgDetailsLess size={20} className="mr-2" />
                      If you still haven't found a solution, please describe
                      your issue:
                    </p>
                    <FormikInput
                      name="other"
                      label="Describe Your Issue"
                      placeholder="Other issue"
                      onChange={(event) => {
                        setFieldValue("other", event.currentTarget.value);
                      }}
                    />
                  </div>
                )}
                {(values.haveyougonethrough === "no" ||
                  values.issue === "Other") && (
                  <div className="space-y-4">
                    <p className="text-[#77B0AA] text-xl font-medium">
                      Please go to the Online Support:
                    </p>
                    <NavLink
                      to="/OnlineSupport"
                      className="text-xl text-green-900 underline underline-offset-2"
                    >
                      Online Support
                    </NavLink>
                  </div>
                )}
                {(values.getsolution === "no" || values.issue === "Other") && (
                  <FormikInput
                    name="other"
                    label="Describe Your Issue"
                    placeholder="Other issue"
                  />
                )}
                {(values.issue === "Other" ||
                  values.haveyougonethrough === "yes" ||
                  values.issue === "") && (
                  <div className="mt-6 flex justify-center">
                    <Button name="Get Help" type="submit" />
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {viewLogin && (
        <LoginModel handleCloseLogin={handleCloseLogin} title="Login" />
      )}
      {view && (
        <InfoModel
          handleClose={handleClose}
          title="User Details"
          info={values}
        />
      )}
    </div>
  );
}

export default SupportTicket;
