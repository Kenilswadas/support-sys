import React, { useState, useContext, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Form, Formik } from "formik";
import { FormikInput } from "../components/FormikInput.jsx";
import Button from "../components/Button.jsx";
import * as Yup from "yup";
import { Formikselect } from "../components/Formikselect.jsx";
import { option } from "../components/Data.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModel from "../components/LoginModel.jsx";
import { LoginContext, UserContext } from "../../App.js";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig.jsx";
import { CgDetailsLess } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../helpers/Loader.jsx";
import InfoModel from "../components/InfoModel.jsx";
import Navbar from "../../helpers/Navbar.jsx";
import emailjs from "@emailjs/browser";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { LoadderContext } from "../../App.js";

function SupportTicket({ view, setView }) {
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserContext);
  const { isLoading, setIsloading } = useContext(LoadderContext);
  const [showAns, setShowAns] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);
  const navigate = useNavigate();
  //generate password
  var finalPass = "";
  function generateRandomPassword() {
    const uppercase = "IJKL";
    const lowercase = "al";
    const digits = "0123456789";
    const special = "@$!%*?&";
    const allChars = uppercase + lowercase + digits + special;

    function getRandomCharFromSet(set) {
      return set[Math.floor(Math.random() * set.length)];
    }

    // Ensure at least one character from each set is included
    let password = [
      getRandomCharFromSet(uppercase),
      getRandomCharFromSet(lowercase),
      getRandomCharFromSet(digits),
      getRandomCharFromSet(special),
    ];

    // Fill the rest of the password length with random characters from all sets
    for (let i = password.length; i < 8; i++) {
      password.push(getRandomCharFromSet(allChars));
    }

    // Shuffle the password array to ensure random order
    password = password.sort(() => Math.random() - 0.5).join("");
    finalPass = password;
    return password;
  }
  //handleLogout
  const handleLogout = () => {
    signOut(auth)
      .then((res) => {
        // toast.success("Sign-out Successfully.");
        localStorage.clear();
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  //handleClose
  const handleClose = () => setView(!view);
  //email sending
  const handlegetHelp = (value, ticketid) => {
    createUserWithEmailAndPassword(auth, value.email, generateRandomPassword())
      .then((res) => {
        updateProfile(auth?.currentUser, {
          displayName: value.name,
        });
        // localStorage.setItem("userName", value.name);
        setIsloading(false);
        addDoc(collection(db, "UserDetails"), {
          Name: value.name,
          Mobile: value.mobile || "",
          Email: value.email,
          Password: finalPass,
          ProductDetails: [
            {
              Category: values.category,
              ProductName: values.product,
              Serial_No: values.serialno,
              Model_No: values.modelno,
              Model_Image: values.modelimage,
            },
          ],
          Uid: auth?.currentUser?.uid || "",
        })
          .then((res) => {
            toast.success("Ticket Is Genrated.");
            handleLogout();
            handleClose();
            setIsloading(false);
          })
          .catch((err) => {
            console.log(err);
            handleClose();
            setIsloading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Opps ! Error Occurs... .");
        handleClose();
        setIsloading(false);
      });
    emailjs.init("tS5TqSZ15pz07_1Rd");
    emailjs
      .send("service_4rxbzye", "template_oamnw7a", {
        from_name: "VeerElectronics Team",
        m1: "Your Ticket is generated.",
        ticketid: ticketid,
        team: "VeerElectronics Team",
        user_email: value.email,
        password: finalPass,
        email: value.email, // Recipient's email
        reply_to: "veerelectronics122@gmail.com",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
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
  const getModelImage = (productName, serialNo, modelNo) => {
    const model = products
      .filter((product) => product.ProductName === productName)
      .flatMap((product) =>
        product.ModelDetails.filter(
          (model) =>
            model.Assigned_Serial_No === serialNo && model.Model_No === modelNo
        )
      )[0]; // Assuming there is only one match

    return model ? model.Model_Image : "";
  };

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
              serialno: "",
              modelno: "",
              modelimage: "",
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
                      setFieldValue("modelimage", "");
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
                      setFieldValue("modelimage", "");
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
                      setFieldValue("modelimage", "");
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
                      const productName = values.product;
                      const serialNo = values.serialno;
                      const imageUrl = getModelImage(
                        productName,
                        serialNo,
                        selectedModelNo
                      );
                      setFieldValue("modelimage", imageUrl);
                      setFieldValue("issue", "");
                    }}
                  />
                  <FormikInput
                    hidden={"hidden"}
                    name={`modelimage`}
                    type={"text"}
                    readOnly={true}
                    value={values.modelimage}
                  />
                </div>
                {values.modelimage ? (
                  <div className="border-2">
                    <label className="block w-full text-lg font-semibold text-[#056674] ">
                      {"Model_Image : "}
                    </label>
                    <img
                      src={values.modelimage}
                      alt="Model_Image"
                      className="h-20 "
                    />
                  </div>
                ) : null}
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
                {values.haveyougonethrough === "no" && (
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
                    onChange={(event) => {
                      setFieldValue("other", event.currentTarget.value);
                    }}
                  />
                )}
                {(values.issue === "Other" ||
                  values.haveyougonethrough === "yes" ||
                  values.issue === "") && (
                  <div className="mt-6 flex justify-between">
                    <Button name="Create Ticket" type="submit" />
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {viewLogin && (
        <LoginModel
          handleCloseLogin={handleCloseLogin}
          title={"Login"}
          setUserName={setUserName}
          isLoading={isLoading}
          setIsloading={setIsloading}
        />
      )}
      {view && (
        <InfoModel
          handleClose={handleClose}
          title="User Details"
          info={values}
          handlegetHelp={handlegetHelp}
        />
      )}
      {showAns && (
        <div className="flex flex-col items-center justify-start w-full h-screen">
          <h1 className="text-[#FF4B5C] font-semibold text-5xl w-full text-center mb-2">
            Your Tickets
          </h1>
        </div>
      )}
    </div>
  );
}

export default SupportTicket;
