import React, { useState, useContext, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";

import { RxCross1 } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";
import { LoadderContext } from "../../../App";
import { auth, db } from "../../../FirebaseConfig";
import Loader from "../../../helpers/Loader";
import { Formikselect } from "../../../Support-sys/components/Formikselect";
import { FormikInput } from "../../../Support-sys/components/FormikInput";
import Button from "../../../Support-sys/components/Button";

function RaiseIssue({
  RaiseIssueModel,
  setOpenRaiseIssueModel,
  selectedProduct,
}) {
  const { isLoading, setIsloading } = useContext(LoadderContext);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);

  //handleClose
  const handleClose = () => setOpenRaiseIssueModel(!RaiseIssueModel);
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
        emailjs.init("tS5TqSZ15pz07_1Rd");
        emailjs
          .send("service_4rxbzye", "template_oamnw7a", {
            from_name: "VeerElectronics Team",
            m1: "Your New Ticket is generated.",
            ticketid: formData.ticketId,
            team: "VeerElectronics Team",
            user_email: auth?.currentUser?.email,
            password: users[0].Password,
            email: auth?.currentUser?.email, // Recipient's email
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
    const unsubscribeUsers = onSnapshot(
      collection(db, "UserDetails"),
      (snapshot) => {
        const allUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const currentUser = allUsers.filter(
          (data) => data.Email === auth?.currentUser?.email
        );
        setUsers(currentUser);
      }
    );

    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    const unsubscribeProducts = onSnapshot(
      collection(db, "Products"),
      (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Assuming users state has been updated before this effect runs
        if (users.length > 0) {
          const userCategories = users.flatMap((user) =>
            user.ProductDetails.map((detail) => detail.Category)
          );
          const filteredData = allProducts.filter((product) =>
            userCategories.includes(product.Category)
          );
          setProducts(filteredData);
          setCategories([...new Set(filteredData.map((e) => e.Category))]);
        }
      }
    );

    return () => unsubscribeProducts();
  }, [users]); // Add users as a dependency
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
  const filteredProductNames = (values) => {
    const categoryFilteredProducts = products.filter(
      (product) => product.Category === values.category
    );

    const filteredProductNames = categoryFilteredProducts.filter((product) =>
      users.some((user) =>
        user.ProductDetails.some(
          (detail) => detail.ProductName === product.ProductName
        )
      )
    );

    return filteredProductNames.map((product) => product.ProductName);
  };
  const filteredProductSerialNo = (values) => {
    const categoryFilteredProducts = products.filter(
      (product) => product.Category === values.category
    );

    const filteredSerialNumbers = categoryFilteredProducts.flatMap((product) =>
      product.ModelDetails.filter((issue) =>
        users.some((user) =>
          user.ProductDetails.some(
            (detail) => detail.Serial_No === issue.Assigned_Serial_No
          )
        )
      ).map((issue) => issue.Assigned_Serial_No)
    );

    return filteredSerialNumbers;
  };
  const filteredProductModelNo = (values) => {
    const categoryFilteredProducts = products.filter(
      (product) => product.Category === values.category
    );
    const productwiseFilteredProducts = categoryFilteredProducts.filter(
      (product) => product.ProductName === values.product
    );

    if (values.serialno) {
      const filteredModelNo = productwiseFilteredProducts.flatMap((product) =>
        product.ModelDetails.filter((model) =>
          users.some((user) =>
            user.ProductDetails.some(
              (detail) => detail.Model_No === model.Model_No
            )
          )
        ).map((e) => e.Model_No)
      );
      return filteredModelNo;
    }
  };

  return (
    <div className="fixed flex flex-col items-center overflow-auto py-10 px-4 sm:px-6 lg:px-8 bg-black bg-center bg-cover inset-0 bg-opacity-70 z-50">
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
          Issue
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
                  placeholder={"Category"}
                  selectedItem={selectedProduct.map((e) => e.Category)}
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
                  data={filteredProductNames(values)}
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
                  data={filteredProductSerialNo(values)}
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
                  data={filteredProductModelNo(values)}
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
              <FormikInput
                name="other"
                label="Describe Your Issue"
                placeholder="Other issue"
                onChange={(event) => {
                  setFieldValue("other", event.currentTarget.value);
                }}
              />
              <div className="mt-6 flex justify-between">
                <Button name="Create Ticket" type="submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RaiseIssue;
