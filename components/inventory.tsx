import { FormikProps, useFormik } from "formik";
import { NextPage } from "next";
import * as yup from "yup";
import { inventoryInterface } from "../lib/interfaces/inventoryInterface";

interface props {
  formik: FormikProps<typeof useFormik>;
}
const Inventory: React.FC<props> = ({ formik }) => {

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
} = formik;

  return (
    <div className="flex flex-col mx-auto scroll-smooth md:h-screen sm:h-screen">
      <h1 className="text-center font-bold text-lg text-cyan-700 bg-gray-100">
        Inventory Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:w-1/3 mx-auto sm:w-full sm:h-full"
      >
        <div className="form-control mt-6">
          <input
            type="submit"
            value="Submit"
            className="btn border-none bg-teal-500"
          />
        </div>
      </form>
    </div>
  );
};

export default Inventory;
