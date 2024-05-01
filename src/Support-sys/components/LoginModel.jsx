import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { FormikInput } from "./FormikInput.jsx";
import { RxCross1 } from "react-icons/rx";
import Button from "./Button.jsx";
function LoginModel({ handleCloseLogin, title }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="fixed inset-0 bg-cover bg-center flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="flex items-center justify-center z-50 mt-auto sm:mt-auto sm:mb-auto mb-auto ">
        <div className="bg-white p-4 sm:p-8 rounded shadow-md max-w-lg w-full ">
          <div className="flex items-end justify-end ">
            <button
              className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-[#fbffff] rounded-full "
              onClick={handleCloseLogin}
            >
              <RxCross1 />
            </button>
          </div>
          <div className="flex items-center justify-around m-2 border-b-2 border-[#E0ECE4]">
            <h2
              className={`text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-[#056674] p-4 hover:border-b-2 hover:border-[#FF4B5C] ${
                showLogin
                  ? `border-b-4  border-[#056674] text-[#FF4B5C]`
                  : `opacity-50`
              }`}
              onClick={() => {
                setShowLogin(true);
              }}
            >
              {"Login"}
            </h2>
            <h2
              className={`text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-[#056674] p-4 hover:border-b-2 hover:border-[#FF4B5C] ${
                !showLogin
                  ? `border-b-4  border-[#056674] text-[#FF4B5C]`
                  : `opacity-50`
              }`}
              onClick={() => {
                setShowLogin(false);
              }}
            >
              {"Sign Up"}
            </h2>
          </div>
          <div className=" rounded-lg p-4">
            {showLogin ? (
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
                      "password must contains Upper case letter , one special charater ,degits"
                    )
                    .required("*required"),
                })}
                onSubmit={(values) => {
                  var val = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    mobile: values.mobile,
                  };
                  localStorage.setItem("SigninData", JSON.stringify(val));
                  handleCloseLogin();
                }}
              >
                {(values) => (
                  <Form className="flex flex-col items-center justify-center w-96">
                    <div className="mt-2 sm:mt-4 w-full p-2 ">
                      <div className="w-full">
                        <FormikInput
                          name={"email"}
                          placeholder={"Email"}
                          type={"email"}
                          label={"Enter Your Email"}
                        />
                      </div>
                      <div>
                        <FormikInput
                          name={"password"}
                          placeholder={"Password"}
                          type={"password"}
                          label={"Enter Your Password"}
                        />
                      </div>
                      <div>
                        <Button name={"Submit"} type={"submit"} />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
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
                      "password must contains Upper case letter , one special charater ,degits"
                    )
                    .required("*required"),
                  mobile: Yup.string()
                    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
                    .required("*required"),
                })}
                onSubmit={(values) => {
                  alert(JSON.stringify(values, 2, null));
                  var val = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    mobile: values.mobile,
                  };
                  localStorage.setItem("SignupData", JSON.stringify(val));
                  handleCloseLogin();
                }}
              >
                {(values) => (
                  <Form className="flex flex-col items-center justify-center w-96">
                    <div className="mt-2 sm:mt-4 w-full p-2 ">
                      <div className="w-full">
                        <FormikInput
                          name={"name"}
                          placeholder={"Name"}
                          type={"name"}
                          label={"Enter Your Name"}
                        />
                      </div>
                      <div>
                        <FormikInput
                          name={"mobile"}
                          placeholder={"Mobile No."}
                          type={"number"}
                          label={"Enter Mobile No."}
                        />
                      </div>
                      <div className="w-full">
                        <FormikInput
                          name={"email"}
                          placeholder={"Email"}
                          type={"email"}
                          label={"Enter Your Email"}
                        />
                      </div>
                      <div>
                        <FormikInput
                          name={"password"}
                          placeholder={"Password"}
                          type={"password"}
                          label={"Enter Your Password"}
                        />
                      </div>

                      <div>
                        <Button name={"Submit"} type={"submit"} />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModel;
