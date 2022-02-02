import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import { eventInterface } from "../../lib/interfaces/eventInterface";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { sessionInterface } from "../../lib/interfaces/sessionInterface";
interface props {
  events: eventInterface[];
}
const Event: React.FC<props> = ({ events }) => {
  const router = useRouter();
  const [eventState, setEventState] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const formik = useFormik({
    initialValues: {
      userId: session?.id,
      eventName: "",
      referenceName: "",
      status: "",
      startDate: "",
      endDate: "",
      amount: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("/api/event", values);
        // setEventState(data);
        toast({
          position: "top-right",
          title: "Action",
          description: "Event Successfully Created.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
        router.push("/events");
      } catch (err) {
        toast({
          position: "top-right",
          title: "Action",
          description: "Something went wrong.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
    validationSchema: yup.object({
      eventName: yup
        .string()
        .max(20, "Event Name should be less than 20 chars")
        .required("Event Name is required"),
      referenceName: yup
        .string()
        .max(20, "Event Name should be less than 20 chars")
        .required("Reference Name is required"),
      status: yup.string().required("Status is required"),
      startDate: yup.date().required("Start Date is required"),
      endDate: yup.date().required("End Date is required"),
    }),
  });

  console.log(formik.values);

  if (events.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="hero min-h-screen p-0 bg-[url('https://ik.imagekit.io/pjps5pyjhri/sunset-g11fcd3607_1920_XHzBm9Gpzp1.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1643659633489')]">
          <div className="hero-overlay bg-opacity-30"></div>
          <div className="text-center hero-content text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">
                We are a platform that provides a bridge between a Event Manager
                and yourself. You can view the full Timelines and keep yourself
                updated with what is happening on your event field.
              </p>
              <button
                onClick={onOpen}
                className="btn btn-primary bg-teal-500 border-none"
              >
                Create An Event
              </button>
            </div>
          </div>
        </div>
        <Modal
          closeOnOverlayClick={false}
          isCentered
          isOpen={isOpen}
          onClose={onClose}
          bg-opacity-40
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col  mx-auto sm:w-full sm:h-full"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Event Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Event Name"
                    name="eventName"
                    id="eventName"
                    required
                    value={formik.values.eventName}
                    onChange={formik.handleChange}
                    className="input input-bordered w-full"
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                  />
                  {formik.touched.eventName && formik.errors.eventName ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.eventName}
                    </p>
                  ) : null}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Reference Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Reference Name"
                    name="referenceName"
                    id="referenceName"
                    value={formik.values.referenceName}
                    onChange={formik.handleChange}
                    className="input input-bordered"
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                  />
                  {formik.touched.referenceName &&
                  formik.errors.referenceName ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.referenceName}
                    </p>
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
                    <option value="QUOTATION_GIVEN" label="QUOTATION_GIVEN" />
                    <option value="IN_PROGRESS" label="IN_PROGRESS" />
                    <option value="IN_FUTURE" label="IN_FUTURE" />
                    <option value="COMPLETED" label="COMPLETED" />
                  </select>
                  {formik.touched.status && formik.errors.status ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.status}
                    </p>
                  ) : null}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Amount</span>
                  </label>
                  <input
                    type="number"
                    placeholder="amount"
                    name="amount"
                    id="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    className="input input-bordered  shadow-inner shadow-zinc-700"
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                  />
                  {formik.touched.amount && formik.errors.amount ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.amount}
                    </p>
                  ) : null}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Start Date :{" "}
                      {new Date(formik.values.startDate).toString()}
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    id="startDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.startDate}
                    </p>
                  ) : null}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      End Date : {new Date(formik.values.endDate).toString()}
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    id="endDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.endDate}
                    </p>
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
            </ModalBody>

            <ModalFooter>
              {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" mr={3}>
                Submit
              </Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="text-3xl text-cyan-500 font-bold text-center">Event</div>
      <button
        onClick={onOpen}
        className="btn btn-primary bg-teal-500 border-none"
      >
        Create An Event
      </button>
      <div className="overflow-x-auto text-center">
        <table className="table w-full table-compact">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Name</th>
              <th>Reference Name</th>
              <th>Start date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Password</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => (
              <tr key={event.id} className="p-2 m-2">
                <th>{i + 1}</th>
                <td>{event.eventName}</td>
                <td>{event.referenceName}</td>
                <td>{new Date(event.startDate).toLocaleDateString()}</td>
                <td>{new Date(event.endDate).toLocaleDateString()}</td>
                <td>{event.status}</td>
                <td>{event.amount}</td>
                <td>{event.password}</td>
                <tr>
                  <button
                    className="btn bg-cyan-500  mx-auto p-2 m-2"
                    onClick={() => router.push(`/events/${event.id}`)}
                  >
                    More
                  </button>
                </tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        bg-opacity-40
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col  mx-auto sm:w-full sm:h-full"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Event Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Event Name"
                  name="eventName"
                  id="eventName"
                  required
                  value={formik.values.eventName}
                  onChange={formik.handleChange}
                  className="input input-bordered w-full"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.eventName && formik.errors.eventName ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.eventName}
                  </p>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Reference Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Reference Name"
                  name="referenceName"
                  id="referenceName"
                  value={formik.values.referenceName}
                  onChange={formik.handleChange}
                  className="input input-bordered"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.referenceName && formik.errors.referenceName ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.referenceName}
                  </p>
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
                  <option value="QUOTATION_GIVEN" label="QUOTATION_GIVEN" />
                  <option value="IN_PROGRESS" label="IN_PROGRESS" />
                  <option value="IN_FUTURE" label="IN_FUTURE" />
                  <option value="COMPLETED" label="COMPLETED" />
                </select>
                {formik.touched.status && formik.errors.status ? (
                  <p className="text-xs text-red-500">{formik.errors.status}</p>
                ) : null}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  type="number"
                  placeholder="amount"
                  name="amount"
                  id="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  className="input input-bordered  shadow-inner shadow-zinc-700"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.amount && formik.errors.amount ? (
                  <p className="text-xs text-red-500">{formik.errors.amount}</p>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Start Date : {new Date(formik.values.startDate).toString()}
                  </span>
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  id="startDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.startDate && formik.errors.startDate ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.startDate}
                  </p>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    End Date : {new Date(formik.values.endDate).toString()}
                  </span>
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  id="endDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.endDate && formik.errors.endDate ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.endDate}
                  </p>
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
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Event;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  console.log(session);

  const URL = `${process.env.NEXTAUTH_URL}api/user/${session?.id}`;
  const { data } = await axios.get(URL);
  return {
    props: {
      events: data?.events || [],
      session: session,
    },
  };
}
