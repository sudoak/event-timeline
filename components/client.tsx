import { useFormik } from "formik";
import { clientInterface } from "../lib/interfaces/clientInterface";
import * as yup from "yup";
interface props {
  client: clientInterface;
}
const Client: React.FC<props> = ({ client }) => {
  const formik = useFormik({
    initialValues: {
      ...client,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
    validationSchema: yup.object({}),
  });
  return (
    <div>
      <form>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            placeholder="Client Name"
            name="clientName"
            id="clientName"
            required
            value={formik.values.clientName}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.touched.clientName && formik.errors.clientName ? (
            <p className="text-xs text-red-500">{formik.errors.clientName}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Client;
