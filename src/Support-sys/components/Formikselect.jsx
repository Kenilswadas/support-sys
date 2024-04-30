import { ErrorMessage, Field } from "formik";
import React from "react";

function Formikselect({ label, name, data }) {
  return (
    <div>
      <label className="block mb-2 text-lg font-semibold text-[#056674]">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#77B0AA] rounded-md  focus:border-[#77B0AA]  focus:ring-[#056674] focus:outline-none focus:ring focus:ring-opacity-40"
      >
        <option value="">{`please select option`}</option>
        {data.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
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
