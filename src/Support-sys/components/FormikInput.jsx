import { ErrorMessage, Field } from "formik";
import React from "react";

function FormikInput({
  label,
  name,
  type,
  placeholder,
  readOnly,
  value,
  length,
  icon,
  onChange,
  hidden,
}) {
  return (
    <div className={`w-full ${hidden} `}>
      <label className="block  text-lg font-semibold text-[#056674] ">
        {label}
      </label>
      <Field
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        maxLength={length}
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#77B0AA] rounded-md  focus:border-[#77B0AA]  focus:ring-[#66BFBF] focus:outline-none focus:ring focus:ring-opacity-40 font-serif"
      />
      <ErrorMessage
        name={name}
        className="text-red-500 text-xs mt-1"
        component="div"
      />
    </div>
  );
}

export { FormikInput };
