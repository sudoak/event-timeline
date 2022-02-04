import { FormikProps, useFormik } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import * as yup from "yup";
import { timeLineInterface } from "../lib/interfaces/timelineInterface";

interface props {
  info: timeLineInterface;
}
const Inventory: React.FC<props> = ({ info }) => {
  const formik = useFormik({
    initialValues: {
      ...info,
    },
    onSubmit: (values) => {
      console.log("component-1", values);
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      status: yup.string().required(),
      desc: yup.string().required(),
    }),
  });

  console.log(info.pics);

  return (
    <div className="flex border-2 p-2 md:max-w-md justify-center">
      {/* <h1 className="text-center font-bold text-lg text-cyan-700 bg-gray-100">
        Time Details
      </h1> */}
      <div className="flex flex-col">
          {info.pics.length > 0
            ? info.pics.map((pic) => {
                <div>
                  <Image
                    src={pic.url}
                    height="50px"
                    width="50px"
                    alt="timeline"
                  />
                  <p>{pic}</p>
                </div>;
              })
            : null}
        </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col text-sm">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Event Name"
            name="eventName"
            id="eventName"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-xs text-red-500">{formik.errors.name}</p>
          ) : null}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="textarea"
            placeholder="Event Name"
            name="eventName"
            id="eventName"
            required
            value={formik.values.desc}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.touched.desc && formik.errors.desc ? (
            <p className="text-xs text-red-500">{formik.errors.desc}</p>
          ) : null}
        </div>
        <div className="form-control">
          <label className="label ">
            <span className="label-text">Status</span>
          </label>
          <select
            className="border-2 p-1"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "block" }}
          >
            <option value="" label="Status" />
            <option value="IN_FUTURE" label="IN_FUTURE" />
            <option value="IN_PROGRESS" label="IN_PROGRESS" />
            <option value="COMPLETED" label="COMPLETED" />
          </select>
          {formik.touched.status && formik.errors.status ? (
            <p className="text-xs text-red-500">{formik.errors.status}</p>
          ) : null}
        </div>
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
