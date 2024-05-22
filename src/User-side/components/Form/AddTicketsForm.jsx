import React, { useState, useContext, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { CgDetailsLess } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { LoadderContext } from "../../../App.js";
import { auth, db } from "../../../FirebaseConfig.jsx";
import Loader from "../../../helpers/Loader.jsx";
import { Formikselect } from "../../../Support-sys/components/Formikselect.jsx";
import { FormikInput } from "../../../Support-sys/components/FormikInput.jsx";
import Button from "../../../Support-sys/components/Button.jsx";
import { option } from "../../../Support-sys/components/Data.jsx";
import { RxCross1 } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";

function AddTickets({ AddTicketForm, setShowAddTicketForm }) {
  const { isLoading, setIsloading } = useContext(LoadderContext);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);
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
  // //handleLogout
  // const handleLogout = () => {
  //   signOut(auth)
  //     .then((res) => {
  //       // toast.success("Sign-out Successfully.");
  //       localStorage.clear();
  //       // navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error(error.message);
  //     });
  // };
  //handleClose
  const handleClose = () => setShowAddTicketForm(!AddTicketForm);
  //email sending
  const handlegetHelp = (values) => {
    setIsloading(true);
    let formData = {};
    formData = {
      ...values,
      userEmail: auth.currentUser?.email,
      userName: auth.currentUser?.displayName,
      userUid: auth.currentUser?.uid,
      ticketId: uuidv4(),
    };
    alert(JSON.stringify(formData, null, 2));
    addDoc(collection(db, "Tickets"), {
      Category: formData.category,
      Issue: formData.issue,
      Model_No: formData.modelno,
      Model_Image: formData.modelimage,
      OnlineSupport: formData.haveyougonethrough,
      OtherIssue: formData.other,
      ProductName: formData.product,
      Serial_No: formData.serialno,
      TicketId: formData.ticketId,
      UserEmail: formData.userEmail,
      UserName: formData.userName,
      UserUid: formData.userUid,
      Status: "Pending",
    })
      .then((res) => {
        toast.success("Ticket Is Genrated.");
        // emailjs.init("tS5TqSZ15pz07_1Rd");
        // emailjs
        //   .send("service_4rxbzye", "template_oamnw7a", {
        //     from_name: "VeerElectronics Team",
        //     m1: "Your Ticket is generated.",
        //     ticketid: formData.ticketid,
        //     team: "VeerElectronics Team",
        //     user_email: auth?.currentUser?.email,
        //     password: generateRandomPassword(),
        //     email: auth?.currentUser?.email, // Recipient's email
        //     reply_to: "veerelectronics122@gmail.com",
        //   })
        //   .then(
        //     () => {
        //       console.log("SUCCESS!");
        //     },
        //     (error) => {
        //       console.log("FAILED...", error.text);
        //     }
        //   );
        setIsloading(false);
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.message);
        setIsloading(false);
        handleClose();
      });
  };
  useEffect(() => {
    onSnapshot(collection(db, "UserDetails"), (snapshot) => {
      const allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // const filtereddata = allProducts.filter((data)=>data.Category === )
      setUsers(allUsers);
    });
  }, []);
  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(allProducts);
      // const filtereddata = allProducts.filter((data)=>data.Category === )
      setProducts(allProducts);
      setCategories([...new Set(allProducts.map((e) => e.Category))]);
    });
  }, []);

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
    <div className="fixed flex flex-col items-center overflow-auto py-10 px-4 sm:px-6 lg:px-8 bg-black bg-center bg-cover inset-0 bg-opacity-70 z-50">
      <ToastContainer />
      {isLoading && <Loader />}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-10 w-full max-w-4xl transition-transform transform hover:scale-105 duration-300 ">
        <div className="flex items-end justify-end">
          <button
            className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-[#fbffff] rounded-full"
            onClick={handleClose}
          >
            <RxCross1 />
          </button>
        </div>
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
            // issue: Yup.string().required("*required"),
          })}
          onSubmit={(values) => {
            handlegetHelp(values);
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
                    .filter((product) => product.ProductName === values.product)
                    .flatMap((product) =>
                      product.ModelDetails.filter(
                        (model) => model.Assigned_Serial_No === values.serialno
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
              {/* <Formikselect
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
              /> */}
              {/* {values.issue && values.issue !== "Other" && (
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
              )} */}
              {/* {values.haveyougonethrough === "yes" && values.issue && (
                <div className="space-y-4">
                  <p className="text-[#056674] flex items-center">
                    <CgDetailsLess size={20} className="mr-2" />
                    If you still haven't found a solution, please describe your
                    issue:
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
              )} */}
              {/* {values.haveyougonethrough === "no" && (
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
              )} */}
              {/* {(values.getsolution === "no" || values.issue === "Other") && ( */}
              <FormikInput
                name="other"
                label="Describe Your Issue"
                placeholder="Other issue"
                onChange={(event) => {
                  setFieldValue("other", event.currentTarget.value);
                }}
              />
              {/* )} */}
              {/* {(values.issue === "Other" ||
                values.haveyougonethrough === "yes" ||
                values.issue === "") && ( */}
              <div className="mt-6 flex justify-between">
                <Button name="Create Ticket" type="submit" />
              </div>
              {/* )} */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddTickets;
