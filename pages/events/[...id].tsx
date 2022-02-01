import { NextPage } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { useState } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Text,
  Box,
  useMediaQuery,
  Flex,
  Button,
  FormControl,
  InputGroup,
  InputRightElement,
  Icon,
  Input,
  FormLabel,
  Heading,
  Divider,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import { ParsedUrlQuery } from "querystring";
import { EventInterfaceDetail } from "../../lib/interfaces/eventInterface";
import { ErrorMessage, useFormik } from "formik";
import * as yup from "yup";
interface props {
  event: EventInterfaceDetail;
}
const EventIndex: React.FC<props> = ({ event }) => {
  const [eventState, setEventState] = useState(event);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      eventName: eventState.eventName,
      referenceName: eventState?.referenceName || "",
      userId: eventState.userId,
      status: eventState.status,
      password: eventState.password,
      startDate: new Date(eventState.startDate),
      endDate: new Date(eventState.endDate),
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("/api/event", values);
        setEventState(data);
        toast({
          position: "top-right",
          title: "Action",
          description: "Event Successfully updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          position: "top-right",
          title: "Action",
          description: "Something went wrong updating.",
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

  return (
    <div>
      <Navbar />
      <Box>
        <Tabs
          // isFitted
          variant="enclosed"
          colorScheme={"green"}
          isLazy
          orientation={"vertical"}
        >
          <TabList mb="1em" border="1px">
            <Tab
              _selected={{ color: "white", bg: "cyan.700" }}
              borderBottom={"1px"}
            >
              Event
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "cyan.800" }}
              borderBottom={"1px"}
            >
              Inventory
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "cyan.900" }}
              borderBottom={"1px"}
            >
              Decoration
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "cyan.900" }}
              borderBottom={"1px"}
            >
              Timeline
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel border="1px" borderColor="gray.100">
              <div className="flex flex-col mx-auto scroll-smooth md:h-screen sm:h-screen">
                <h1 className="text-center font-bold text-lg text-cyan-700 bg-gray-100">
                  Event Details
                </h1>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col md:w-1/3 mx-auto sm:w-full sm:h-full"
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
                      name="color"
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
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Password"
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      className="input input-bordered  shadow-inner shadow-zinc-700"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                      disabled={true}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p className="text-xs text-red-500">
                        {formik.errors.password}
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
              </div>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>2two!</p>
            </TabPanel>
            <TabPanel>
              <p>3two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default EventIndex;

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
  const { id }: ParsedUrlQuery = context.query;
  const URL = `${process.env.NEXTAUTH_URL}api/event/${id}`;
  const { data } = await axios.get(URL);
  console.log("->", data);

  return {
    props: {
      event: data,
    },
  };
}
