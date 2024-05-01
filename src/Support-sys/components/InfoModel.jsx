import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormikInput } from "./FormikInput.jsx";
import { RxCross1 } from "react-icons/rx";
import Button from "./Button.jsx";
function InfoModel({ handleClose, title, handlegetHelp }) {
  return (
    <div className="fixed inset-0 bg-cover bg-center flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="flex items-center justify-center z-50 mt-auto sm:mt-auto sm:mb-auto mb-auto ">
        <div className="bg-white p-4 sm:p-8 rounded shadow-md max-w-md w-full ">
          <div className="flex items-end justify-end ">
            <button
              className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-[#fbffff] rounded-full "
              onClick={handleClose}
            >
              <RxCross1 />
            </button>
          </div>
          <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-[#FF4B5C]">
            {title}
          </h2>
          <div>
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile: null,
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("*required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("*required"),
                mobile: Yup.string()
                  .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
                  .required("*required"),
              })}
              onSubmit={(values) => {
                // var formdata = new FormData();
                // alert(formdata.values);
                // var alldata = {
                //   email: values.email,
                //   name: values.name,
                //   mobile: values.mobile,
                // };
                // var data = JSON.stringify(alldata);

                // localStorage.setItem("userInfo", data);

                handlegetHelp();
                handleClose();
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
                        name={"mobile"}
                        placeholder={"Mobile No."}
                        type={"number"}
                        label={"Enter Mobile No."}
                      />
                    </div>
                    <div>
                      <Button name={"Submit"} type={"submit"} />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoModel;
