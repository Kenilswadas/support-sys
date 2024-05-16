import { Form, Formik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { FormikInput } from "./FormikInput.jsx";
import { RxCross1 } from "react-icons/rx";
import Button from "./Button.jsx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../FirebaseConfig.jsx";
import { LoadderContext } from "../../App.js";
import { toast } from "react-toastify";
import Loader from "../../helpers/Loader.jsx";
function InfoModel({ handleClose, title, handlegetHelp, info }) {
  const { setIsloading, isLoading } = useContext(LoadderContext);
  return (
    <div className="fixed inset-0 bg-cover bg-center flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="flex items-center justify-center z-50 mt-auto sm:mt-auto sm:mb-auto mb-auto ">
        {isLoading ? <Loader /> : null}
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
              onSubmit={async (values) => {
                setIsloading(true);
                // var formdata = new FormData();
                // alert(formdata.values);
                var alldata = {
                  email: values.email,
                  name: values.name,
                  mobile: values.mobile,
                  product: info.product,
                  category: info.category,
                  modelno: info.modelno,
                  serialno: info.serialno,
                  issue: info.issue,
                };
                var data = JSON.stringify(alldata);
                alert(data);
                // localStorage.setItem("userInfo", data);
                await addDoc(collection(db, "OnlineSupportData"), alldata)
                  .then((res) => {
                    setIsloading(false);
                    handlegetHelp();
                    handleClose();
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error(err.message);
                    setIsloading(false);
                    handlegetHelp();
                    handleClose();
                  });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form className="flex flex-col items-center justify-center w-96">
                  <div className="mt-2 sm:mt-4 w-full p-2 ">
                    <div className="w-full">
                      <FormikInput
                        name={"name"}
                        placeholder={"Name"}
                        type={"name"}
                        label={"Enter Your Name"}
                        onChange={(event) => {
                          setFieldValue("name", event.currentTarget.value);
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <FormikInput
                        name={"email"}
                        placeholder={"Email"}
                        type={"email"}
                        label={"Enter Your Email"}
                        onChange={(event) => {
                          setFieldValue("email", event.currentTarget.value);
                        }}
                      />
                    </div>
                    <div>
                      <FormikInput
                        name={"mobile"}
                        placeholder={"Mobile No."}
                        type={"number"}
                        label={"Enter Mobile No."}
                        onChange={(event) => {
                          setFieldValue("mobile", event.currentTarget.value);
                        }}
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
