import { ErrorMessage, Field } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";

function Formikselect({ label, name, data, onChange, selectedItem }) {
  const uniqueOptions = new Set(data);

  // Check if data is an array of objects
  const isObjectArray = Array.isArray(data) && typeof data[0] === "object";
  let location = useLocation();

  return (
    <div>
      <label className="block mb-2 text-lg font-semibold text-[#056674]">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        onChange={(e) => onChange(e.target.value)}
        className="block dark:bg-[#0f161b] text-[#056674] w-full px-4 py-2 mt-2 placeholder-gray-400 bg-white border border-[#77B0AA] rounded-md  focus:border-[#77B0AA]  focus:ring-[#66BFBF] focus:outline-none focus:ring focus:ring-opacity-40"
      >
        <option value="">{`please select option`}</option>
        {!isObjectArray
          ? [...uniqueOptions].map((option, index) => (
              <option
                key={index}
                value={option}
                // selected={selectedItem ? true : false}
              >
                {option}
              </option>
            ))
          : [...uniqueOptions].map((option, index) => {
              return (
                <option key={index} value={option.issue}>
                  {option.issue}
                </option>
              );
            })}
        {location.pathname === "/SupportTicket" && name === "issue" ? (
          <option>{"Other"}</option>
        ) : null}
      </Field>
      <ErrorMessage
        name={name}
        className="text-red-500 text-sm mt-1"
        component="div"
      />
    </div>
  );
}

export { Formikselect };
