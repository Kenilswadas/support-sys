import React, { useContext } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig.jsx";
import { LoadderContext } from "../../App.js";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { RxCross1 } from "react-icons/rx";
import Button from "./Button.jsx";
import { FormikInput } from "./FormikInput.jsx";
import Loader from "../../helpers/Loader.jsx";

function InfoModel({ handleClose, title, handlegetHelp, info }) {
  const { setIsloading, isLoading } = useContext(LoadderContext);
  const location = useLocation();

  const handleSubmit = async (values) => {
    setIsloading(true);
    try {
      let formData = {};
      if (location.pathname === "/SupportTicket") {
        console.log(location.pathname);
        formData = {
          ...info,
          userEmail: auth.currentUser?.email || values.email,
          userName: auth.currentUser?.displayName || values.name,
          userUid: auth.currentUser?.uid || "",
          ticketId: uuidv4(),
        };
        await addDoc(collection(db, "Tickets"), {
          Category: formData.category,
          Issue: formData.issue,
          Model_No: formData.modelno,
          OnlineSupport: formData.haveyougonethrough,
          OtherIssue: formData.other,
          ProductName: formData.product,
          Serial_No: formData.serialno,
          TicketId: formData.ticketId,
          UserEmail: formData.userEmail,
          UserName: formData.userName,
          UserUid: formData.userUid,
          Status: "Pending",
        });
      } else if (location.pathname === "/Onlinesupport") {
        console.log(location.pathname);
        const onlineSupportData = {
          email: values.email,
          name: values.name,
          mobile: values.mobile,
          product: info.product,
          category: info.category,
          modelno: info.modelno,
          serialno: info.serialno,
          issue: info.issue,
        };
        await addDoc(collection(db, "OnlineSupportData"), onlineSupportData);
      }
      toast.success("Submission successful.");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    } finally {
      setIsloading(false);
      handlegetHelp();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white rounded shadow-lg max-w-md w-full">
        <div className="p-4 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-2xl font-semibold text-[#FF4B5C]">
              {title}
            </h2>
            <button
              className="p-2 text-lg text-[#fbffff] bg-[#66BFBF] hover:bg-[#135D66] rounded-full"
              onClick={handleClose}
            >
              <RxCross1 />
            </button>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              mobile: "",
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
            onSubmit={(value) => {
              console.log(value);
              handleSubmit(value);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="mt-4">
                <div className="space-y-6">
                  <FormikInput
                    name="name"
                    placeholder="Name"
                    type="text"
                    label="Enter Your Name"
                    value={values.name}
                    onChange={(event) => {
                      setFieldValue("name", event.currentTarget.value);
                    }}
                  />
                  <FormikInput
                    name="email"
                    placeholder="Email"
                    type="email"
                    label="Enter Your Email"
                    value={values.email}
                    onChange={(event) => {
                      setFieldValue("email", event.currentTarget.value);
                    }}
                  />
                  <FormikInput
                    name="mobile"
                    placeholder="Mobile No."
                    type="text"
                    label="Enter Mobile No."
                    value={values.mobile}
                    onChange={(event) => {
                      setFieldValue("mobile", event.currentTarget.value);
                    }}
                  />
                  <Button name="Submit" type="submit" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default InfoModel;
