import React, { useState, useContext, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Form, Formik } from "formik";
import { FormikInput } from "../components/FormikInput.jsx";
import Button from "../components/Button.jsx";
import * as Yup from "yup";
import { Formikselect } from "../components/Formikselect.jsx";
import Navbar from "../components/Navbar.jsx";
import { option } from "../components/Data.jsx";
import { NavLink } from "react-router-dom";
import LoginModel from "../components/LoginModel.jsx";
import { UserContext } from "../../App.js";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig.jsx";
import { CgDetailsLess } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { LoadderContext } from "../../App.js";
import Loader from "../../helpers/Loader.jsx";
function SupportTicket({ viewLogin, setViewLogin }) {
  const { isLoading, setIsloading } = useContext(LoadderContext);
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snap) => {
      const allProducts = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(allProducts);
      setProducts(allProducts);
      setCategorys(allProducts.map((e) => e.Category));
      console.log(categorys);
    });
  }, []);
  const handleCloseLogin = () => {
    setViewLogin(!viewLogin);
  };
  const setUserName = useContext(UserContext);
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        setUserName={setUserName}
      />
      <div className="bg-white flex flex-col overflow-auto items-center justify-center  w-full">
        <ToastContainer />
        {console.log(isLoading)}
        {isLoading === true ? <Loader /> : null}
        <div className="shadow-2xl p-4 sm:p-8 rounded flex flex-col items-center justify-center   w-2/4 mx-autosrc/Support-sys/pages/Leandingpage.jsx src/Support-sys/pages/components ">
          <h2 className="text-lg sm:text-4xl font-semibold mb-2 sm:mb-4 text-[#FF0000]">
            {"Support - Ticket"}
          </h2>
          <div className="w-full ">
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
                // category: Yup.string().required("*required"),
                // modelno: Yup.string().required("*required"),
                issue: Yup.string().required("*required"),
              })}
              onSubmit={(values) => {
                setIsloading(true);
                const formData = {
                  ...values,
                  userEmail: auth?.currentUser?.email,
                  userName: auth?.currentUser?.displayName,
                  userUid: auth?.currentUser?.uid,
                  TicketId: uuidv4(),
                };
                addDoc(collection(db, "Tickets"), {
                  Category: formData.category,
                  Issue: formData.issue,
                  Model_No: formData.modelno,
                  OnlineSupport: formData.haveyougonethrough,
                  OtherIssue: formData.other,
                  ProductName: formData.product,
                  Serial_No: formData.serialno,
                  TicketId: formData.TicketId,
                  UserEmail: formData.userEmail,
                  UserName: formData.userName,
                  UserUid: formData.userUid,
                  Status: "Pending",
                })
                  .then((res) => {
                    toast.success("Ticket Genrated.");
                    setIsloading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error(err.message);
                    setIsloading(false);
                  });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form className="flex flex-col items-center justify-center w-full">
                  <div className="mt-2 sm:mt-4 w-full p-2 ">
                    <div className="grid grid-cols-2">
                      <div className="m-2">
                        <Formikselect
                          label={"Select Product"}
                          name={"product"}
                          data={products.map((e) => e.ProductName)}
                          onChange={(selectedProduct) => {
                            setFieldValue("product", selectedProduct);
                            const selectedProductData = products.find(
                              (data) => data.ProductName === selectedProduct
                            );
                            setFieldValue(
                              "category",
                              selectedProductData
                                ? selectedProductData.Category
                                : ""
                            );
                            setFieldValue(
                              "serialno",
                              selectedProductData
                                ? selectedProductData.Serial_No
                                : ""
                            );
                            setFieldValue(
                              "modelno",
                              selectedProductData
                                ? selectedProductData.Model_No
                                : ""
                            );
                            setFieldValue("issue", "");
                            setFieldValue("other", "");
                          }}
                        />
                      </div>
                      <div className="m-2">
                        <FormikInput
                          readOnly={true}
                          label={"Category"}
                          name={"category"}
                          value={values.category}
                        />
                      </div>
                      <div className="m-2">
                        <FormikInput
                          readOnly={true}
                          label={"Model No"}
                          name={"modelno"}
                          value={values.modelno}
                        />
                      </div>
                      <div className="m-2">
                        <FormikInput
                          readOnly={true}
                          label={"Serial No"}
                          name={"serialno"}
                          value={values.serialno}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1">
                      <div className="m-2">
                        <Formikselect
                          label={"Select Your Issue"}
                          name={"issue"}
                          data={products
                            .filter(
                              (data) => data.ProductName === values.product
                            )
                            .map((e) => e.Allissues)
                            .flat()}
                          onChange={(selectedProduct) => {
                            setFieldValue("issue", selectedProduct);
                            setFieldValue("haveyougonethrough", "");
                          }}
                        />
                      </div>
                    </div>
                    {values.issue === "" ||
                      (values.issue && values.issue !== "Other" && (
                        <div className="flex items-center justify-end w-full">
                          <div className="m-2 flex items-center justify-between w-full">
                            <p className=" text-[#77B0AA] text-xl font-medium mr-4">
                              Have you gone through the Online Support ? -{" "}
                            </p>
                            <Formikselect
                              name={"haveyougonethrough"}
                              data={option.map((e) => e.name)}
                              onChange={(selectedProduct) => {
                                setFieldValue(
                                  "haveyougonethrough",
                                  selectedProduct
                                );
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    {values.haveyougonethrough === "yes" &&
                      values.issue !== "" && (
                        <div className="flex items-center justify-end w-full">
                          <div className="flex items-center justify-end w-full">
                            <div className="m-2 flex flex-col items-center justify-between w-full">
                              <p className="text-[#056674] w-full flex">
                                <span className="pr-2">
                                  <CgDetailsLess size={20} />
                                </span>
                                <span>
                                  If You Still Not Get The Solution Then Please
                                </span>
                              </p>
                              <FormikInput
                                name={"other"}
                                label={"Describe Your Issue --"}
                                placeholder={"other issue"}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    {(values.haveyougonethrough === "no" ||
                      (values.haveyougonethrough && values.issue) ===
                        "Other") && (
                      <div className="flex items-center justify-end w-full">
                        <div className="m-2 flex items-center justify-between w-full">
                          <p className=" text-[#77B0AA] text-xl font-medium mr-10">
                            Please go to the Online Support -{" "}
                          </p>
                          <NavLink
                            to={"/OnlineSupport"}
                            className={
                              "text-xl text-green-900 underline underline-offset-2"
                            }
                          >
                            Online-Support
                          </NavLink>
                        </div>
                      </div>
                    )}
                    {(values.getsolution === "no" ||
                      values.issue === "Other") && (
                      <div className="flex items-center justify-end w-full">
                        <div className="m-2 flex items-center justify-between w-full">
                          <FormikInput
                            name={"other"}
                            label={"Describe Your Issue --"}
                            placeholder={"other issue"}
                          />
                        </div>
                      </div>
                    )}
                    {(values.issue === "Other" ||
                      values.haveyougonethrough === "yes" ||
                      values.issue === "") && (
                      <div className="m-2">
                        <Button name={"Get Help"} type={"submit"} />
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {viewLogin ? (
        <LoginModel handleCloseLogin={handleCloseLogin} title={"Login"} />
      ) : null}
    </div>
  );
}

export default SupportTicket;
