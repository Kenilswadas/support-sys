import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
function SignInPage() {
  return (
    <div className="fixed inset-0 bg-cover bg-center bg-black bg-opacity-70 z-50 ">
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-96 rounded-xl backdrop-filter backdrop-blur-xl bg-opacity-40 bg-[#9BA4B5] p-8">
          <div className="bg-slate-100 "></div>
          <h1 className="text-3xl font-bold text-[#F1F6F9] mb-6">Sign In</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("* Required"),
              password: Yup.string()
                .min(8, "Must be at least 8 characters long")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  "Must contain uppercase, lowercase, digit, and special character"
                )
                .required("* Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    className={`w-full border bg-[#F1F6F9] rounded-md py-2 px-4 focus:outline-none ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component={"div"}
                    className="text-sm text-white"
                  />
                </div>
                <div>
                  <Field
                    className={`w-full bg-[#F1F6F9] border rounded-md py-2 px-4 focus:outline-none ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : ""
                    }`}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component={"div"}
                    className="text-sm text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#394867] hover:bg-[#212A3E] text-[#F1F6F9] font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
