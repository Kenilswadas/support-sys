import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { FormikInput } from "./FormikInput.jsx";
import { RxCross1 } from "react-icons/rx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig.jsx";
import { toast } from "react-toastify";
import Loader from "../../helpers/Loader.jsx";
import { Formikselect } from "./Formikselect.jsx";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

function LoginModel({
  handleCloseLogin,
  title,
  setUserName,
  isLoading,
  setIsloading,
}) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState();
  const provider = new GoogleAuthProvider();
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSignInWithGoogle = (values) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Sign In Successfully");
        handleCloseLogin();
        navigate(
          values.email === "admin@gmail.com"
            ? "/adminDashboard"
            : "/UserDashboard"
        );
        setUserName(null);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
        handleCloseLogin();
      });
  };
  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snap) => {
      const allProducts = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(allProducts);
      setCategorys([...new Set(allProducts.map((e) => e.Category))]);
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
    <div className="fixed inset-0 bg-cover bg-center flex overflow-auto items-center justify-center bg-black bg-opacity-70 z-50 font-Calibri">
      {isLoading && <Loader />}
      <div className="flex items-center justify-center mt-auto sm:mt-auto sm:mb-auto mb-auto w-2/4">
        <div className="bg-white  p-4 sm:p-8 rounded shadow-lg shadow-slate-500 w-full ">
          <div className="flex items-end justify-end ">
            <button
              className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-[#fbffff] rounded-full "
              onClick={handleCloseLogin}
            >
              <RxCross1 />
            </button>
          </div>
          <div className="flex items-center justify-around m-2 border-b-2 border-[#056674]">
            <h2
              className={`text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-[#056674] p-4 hover:border-b-2 hover:border-[#FF4B5C] cursor-pointer ${
                showLogin
                  ? `border-b-4  border-[#056674] text-[#FF4B5C]`
                  : `opacity-50`
              }`}
              onClick={() => setShowLogin(true)}
            >
              {"Login"}
            </h2>
            <h2
              className={`text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-[#056674] p-4 hover:border-b-2 hover:border-[#FF4B5C] cursor-pointer ${
                !showLogin
                  ? `border-b-4  border-[#056674] text-[#FF4B5C]`
                  : `opacity-50`
              }`}
              onClick={() => setShowLogin(false)}
            >
              {"Sign Up"}
            </h2>
          </div>
          <div className="rounded-lg p-4">
            {showLogin ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab ? selectedTab.label : "empty"}
                  initial={{ x: 10, opacity: 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={Yup.object({
                      email: Yup.string()
                        .email("Invalid email address")
                        .required("*required"),
                      password: Yup.string()
                        .matches(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          "password must contains Upper case letter, one special character, digits"
                        )
                        .required("*required"),
                    })}
                    onSubmit={(values) => {
                      setIsloading(true);
                      signInWithEmailAndPassword(
                        auth,
                        values.email,
                        values.password
                      )
                        .then((res) => {
                          toast.success("Sign In Successfully");
                          handleCloseLogin();
                          navigate(
                            values.email === "admin@gmail.com"
                              ? "/adminDashboard"
                              : "/UserDashboard"
                          );
                        })
                        .catch((err) => {
                          console.error(err);
                          toast.error(err.message);
                        })
                        .finally(() => setIsloading(false));
                    }}
                  >
                    {({ values, setFieldValue, errors, touched }) => (
                      <Form className="flex flex-col items-center justify-center ">
                        <div className="mt-2 sm:mt-4 w-full p-2 ">
                          <div className="w-full">
                            <FormikInput
                              name={"email"}
                              placeholder={"Email"}
                              type={"email"}
                              label={"Enter Your Email"}
                              value={values.email}
                              onChange={(event) => {
                                setFieldValue(
                                  "email",
                                  event.currentTarget.value
                                );
                              }}
                            />
                          </div>
                          <div>
                            <FormikInput
                              name={"password"}
                              placeholder={"Password"}
                              type={"text"}
                              label={"Enter Your Password"}
                              value={values.password}
                              onChange={(event) => {
                                setFieldValue(
                                  "password",
                                  event.currentTarget.value
                                );
                              }}
                            />
                          </div>
                          <div>
                            <Button name={"Submit"} type={"submit"} />
                          </div>
                          <div className="border-t-2 mt-2">
                            <div className="p-2">
                              <p className="flex  items-center justify-start  text-lg font-semibold text-[#056674] ">
                                Login with Google --{" "}
                                <FcGoogle
                                  className="ml-4"
                                  size={28}
                                  onClick={() => {
                                    handleSignInWithGoogle(values);
                                  }}
                                />
                              </p>
                            </div>
                            <div className=" mt-2 p-2">
                              <p className="flex  items-center justify-start  text-lg font-semibold text-[#056674] ">
                                New To Site ? --{" "}
                                <span
                                  onClick={() => {
                                    setShowLogin(false);
                                  }}
                                  className="text-2xl ml-2 underline underline-offset-2 cursor-pointer"
                                >
                                  Sign Up
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </motion.div>
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ x: -10, opacity: 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Formik
                    initialValues={{
                      name: "",
                      mobile: null,
                      email: "",
                      password: "",
                      productdetails: [
                        {
                          Category: "",
                          ProductName: "",
                          Serial_No: "",
                          Model_No: "",
                          Model_Image: "",
                        },
                      ],
                    }}
                    validationSchema={Yup.object({
                      name: Yup.string().required("*required"),
                      email: Yup.string()
                        .email("Invalid email address")
                        .required("*required"),
                      password: Yup.string()
                        .matches(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          "password must contains Upper case letter, one special character, digits"
                        )
                        .required("*required"),
                      mobile: Yup.string()
                        .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
                        .required("*required"),
                      // productdetails: Yup.array()
                      //   .of(
                      //     Yup.object().shape({
                      //       Category: Yup.string()
                      //         .required("Category is required")
                      //         .min(1, "Category cannot be empty"),
                      //       ProductName: Yup.string()
                      //         .required("Product Name is required")
                      //         .min(1, "Product Name cannot be empty"),
                      //       Serial_No: Yup.string()
                      //         .required("Serial Number is required")
                      //         .min(1, "Serial Number cannot be empty"),
                      //       Model_No: Yup.string()
                      //         .required("Model Number is required")
                      //         .min(1, "Model Number cannot be empty"),
                      //       Model_Image: Yup.string()
                      //         .required("Model Image is required")
                      //         .url("Model Image must be a valid URL")
                      //         .min(1, "Model Image cannot be empty"),
                      //     })
                      //   )
                      //   .min(1, "At least one product is required")
                      //   .required("Product details are required"),
                    })}
                    onSubmit={(values) => {
                      setIsloading(true);
                      createUserWithEmailAndPassword(
                        auth,
                        values.email,
                        values.password
                      )
                        .then((res) => {
                          toast.success("Sign Up Successfully .");
                          updateProfile(auth?.currentUser, {
                            displayName: values.name,
                          });
                          localStorage.setItem("userName", values.name);
                          setIsloading(false);
                          handleCloseLogin();
                          navigate("/UserDashboard");
                          addDoc(collection(db, "UserDetails"), {
                            Name: values.name,
                            Mobile: values.mobile,
                            Email: values.email,
                            Password: values.password,
                            ProductDetails: values.productdetails,
                            Uid: auth?.currentUser?.uid,
                          })
                            .then((res) => {
                              toast.success("User Added Successfully");
                            })
                            .catch((err) => {
                              console.error(err);
                            });
                        })
                        .catch((err) => {
                          console.error(err);
                          toast.error(err.message);
                          setIsloading(false);
                        });
                    }}
                  >
                    {({ values, setFieldValue, errors, touched }) => (
                      <Form className="">
                        <div className="mt-2 sm:mt-4 w-full p-2 grid grid-cols-2">
                          <div className="m-2">
                            <FormikInput
                              name={"name"}
                              placeholder={"Name"}
                              type={"name"}
                              label={"Enter Your Name"}
                              value={values.name}
                              onChange={(event) => {
                                setFieldValue(
                                  "name",
                                  event.currentTarget.value
                                );
                              }}
                            />
                          </div>
                          <div className="m-2">
                            <FormikInput
                              name={"mobile"}
                              placeholder={"Mobile No."}
                              type={"number"}
                              label={"Enter Mobile No."}
                              value={values.mobile}
                              onChange={(event) => {
                                setFieldValue(
                                  "mobile",
                                  event.currentTarget.value
                                );
                              }}
                            />
                          </div>
                          <div className="m-2">
                            <FormikInput
                              name={"email"}
                              placeholder={"Email"}
                              type={"email"}
                              label={"Enter Your Email"}
                              value={values.email}
                              onChange={(event) => {
                                setFieldValue(
                                  "email",
                                  event.currentTarget.value
                                );
                              }}
                            />
                          </div>
                          <div className="m-2">
                            <FormikInput
                              name={"password"}
                              placeholder={"Password"}
                              type={"password"}
                              label={"Enter Your Password"}
                              value={values.password}
                              onChange={(event) => {
                                setFieldValue(
                                  "password",
                                  event.currentTarget.value
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="w-full">
                            <FieldArray name="productdetails">
                              {({ push, remove }) => (
                                <div className="mt-4 p-4 border rounded bg-[#E0ECE4] ">
                                  <label className="block text-lg font-semibold text-[#056674] mb-0 border-b-2 border-[#056674]">
                                    Add Your Products
                                  </label>
                                  {values.productdetails.map((model, index) => (
                                    <div
                                      key={index}
                                      className="border-b pb-4 mb-0"
                                    >
                                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-2">
                                        <Formikselect
                                          type="text"
                                          label="Category"
                                          name={`productdetails[${index}].Category`}
                                          data={categorys}
                                          onChange={(selectedCategory) => {
                                            setFieldValue(
                                              `productdetails[${index}].Category`,
                                              selectedCategory
                                            );
                                            setFieldValue(
                                              `productdetails[${index}].ProductName`,
                                              ""
                                            );
                                            setFieldValue(
                                              `productdetails[${index}].Serial_No`,
                                              ""
                                            );
                                          }}
                                        />
                                        <Formikselect
                                          type="text"
                                          label="Product Name"
                                          name={`productdetails[${index}].ProductName`}
                                          data={products
                                            .filter(
                                              (data) =>
                                                data.Category ===
                                                values.productdetails[index]
                                                  .Category
                                            )
                                            .map((e) => e.ProductName)}
                                          onChange={(selectedProduct) => {
                                            setFieldValue(
                                              `productdetails[${index}].ProductName`,
                                              selectedProduct
                                            );
                                            setFieldValue(
                                              `productdetails[${index}].Serial_No`,
                                              ""
                                            );
                                          }}
                                        />
                                        <Formikselect
                                          type="text"
                                          label="Serial No"
                                          name={`productdetails[${index}].Serial_No`}
                                          data={products
                                            .filter(
                                              (data) =>
                                                data.ProductName ===
                                                values.productdetails[index]
                                                  .ProductName
                                            )
                                            .flatMap(
                                              (product) => product.Serial_No
                                            )}
                                          onChange={(selectedSerialNo) => {
                                            setFieldValue(
                                              `productdetails[${index}].Serial_No`,
                                              selectedSerialNo
                                            );
                                          }}
                                        />
                                        <Formikselect
                                          label="Model No"
                                          name={`productdetails[${index}].Model_No`}
                                          data={products
                                            .filter(
                                              (product) =>
                                                product.ProductName ===
                                                values.productdetails[index]
                                                  .ProductName
                                            )
                                            .flatMap((product) =>
                                              product.ModelDetails.filter(
                                                (model) =>
                                                  model.Assigned_Serial_No ===
                                                  values.productdetails[index]
                                                    .Serial_No
                                              )
                                            )
                                            .map((model) => {
                                              return model.Model_No;
                                            })}
                                          onChange={(selectedModelNo) => {
                                            setFieldValue(
                                              `productdetails[${index}].Model_No`,
                                              selectedModelNo
                                            );
                                            const productName =
                                              values.productdetails[index]
                                                .ProductName;
                                            const serialNo =
                                              values.productdetails[index]
                                                .Serial_No;
                                            const imageUrl = getModelImage(
                                              productName,
                                              serialNo,
                                              selectedModelNo
                                            );
                                            setFieldValue(
                                              `productdetails[${index}].Model_Image`,
                                              imageUrl
                                            );
                                          }}
                                        />
                                        <FormikInput
                                          hidden={"hidden"}
                                          name={`productdetails[${index}].Model_Image`}
                                          type={"text"}
                                          readOnly={true}
                                          value={
                                            values.productdetails[index]
                                              .Model_Image
                                          }
                                        />
                                        {values.productdetails[index]
                                          .Model_Image ? (
                                          <img
                                            src={
                                              values.productdetails[index]
                                                .Model_Image
                                            }
                                            alt="Model_Image"
                                          />
                                        ) : null}
                                        {index !== 0 ? (
                                          <button
                                            className="mt-0 text-red-600 flex items-center"
                                            type="button"
                                            onClick={() => remove(index)}
                                          >
                                            <MdDelete
                                              size={28}
                                              className="mr-1"
                                            />
                                            Remove
                                          </button>
                                        ) : null}
                                      </div>
                                    </div>
                                  ))}
                                  {values.productdetails.map((e) =>
                                    e.Model_No === "" ? (
                                      <p className="text-red-500 text-xl">
                                        {"At least one Product required."}
                                      </p>
                                    ) : null
                                  )}
                                  <div className="flex items-center text-[#056674]">
                                    <button
                                      className="p-2 rounded-full bg-[#056674] bg-opacity-15 focus:ring-[#f95555] focus:outline-none focus:ring focus:ring-opacity-40 mr-2"
                                      type="button"
                                      onClick={() =>
                                        push({
                                          Category: "",
                                          ProductName: "",
                                          Serial_No: "",
                                          Model_No: "",
                                          Model_Image: "",
                                        })
                                      }
                                    >
                                      <FaPlus size={24} />
                                    </button>
                                    <span>Add Model</span>
                                  </div>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                          <Button name={"Submit"} type={"submit"} />
                        </div>
                        <div></div>
                        <div className="border-t-2 mt-2 flex flex-col justify-start">
                          <div className=" mt-2 p-2">
                            <p className="flex  items-center justify-start  text-lg font-semibold text-[#056674] ">
                              Already Have An Account ? --{" "}
                              <span
                                onClick={() => {
                                  setShowLogin(true);
                                }}
                                className="text-2xl ml-2 underline underline-offset-2 cursor-pointer"
                              >
                                Sign In
                              </span>
                            </p>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModel;
