import { Form, Formik } from "formik";
import React, { useState } from "react";
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
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig.jsx";
import { toast } from "react-toastify";
import Loader from "../../helpers/Loader.jsx";

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

  return (
    <div className="fixed inset-0 bg-cover bg-center flex items-center justify-center bg-black bg-opacity-70 z-50 font-Calibri">
      {isLoading && <Loader />}
      <div className="flex items-center justify-center mt-auto sm:mt-auto sm:mb-auto mb-auto w-2/4">
        <div className="bg-white  p-4 sm:p-8 rounded shadow-lg shadow-slate-500 w-full">
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
                            ProductDetails: [],
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

                          <div>
                            <Button name={"Submit"} type={"submit"} />
                          </div>
                        </div>
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
