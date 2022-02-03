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
  MenuDivider,
} from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import { ParsedUrlQuery } from "querystring";
import { EventInterfaceDetail } from "../../lib/interfaces/eventInterface";
import { ErrorMessage, useFormik } from "formik";
import * as yup from "yup";
import Inventory from "../../components/inventory";
import Image from "next/image";
import Timeline from "../../components/timeline";
interface props {
  event: EventInterfaceDetail;
}
const EventIndex: React.FC<props> = ({ event }) => {
  const [eventState, setEventState] = useState(event);
  const [inventoryState, setInventoryState] = useState(event?.inventory);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      id: eventState.id,
      eventName: eventState.eventName,
      referenceName: eventState?.referenceName || "",
      userId: eventState.userId,
      status: eventState.status,
      password: eventState.password,
      startDate: new Date(eventState.startDate),
      endDate: new Date(eventState.endDate),
      amount: eventState.amount,
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.patch("/api/event", values);
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

  const formikInventory = useFormik({
    initialValues: {
      eventId: eventState.id,
      pendal: {
        size4: event?.inventory?.pendal?.size4 || 0,
        size2: event?.inventory?.pendal?.size2 || 0,
      },
      table: {
        buffetCloth: event?.inventory?.table?.buffetCloth || 0,
        round: event?.inventory?.table?.round || 0,
      },
      plates: event?.inventory?.plates || 0,
      buckets: event?.inventory?.buckets || 0,
      washBasin: event?.inventory?.washBasin || 0,
      chairs: event?.inventory?.chairs || 0,
      spoons: event?.inventory?.spoons || 0,
      basin: event?.inventory?.basin || 0,
    },
    onSubmit: async (values) => {
      let msg;

      try {
        const { data } = await axios.post("/api/inventory", values);
        console.log(data);
        msg = "Successfully Created/Updated";
      } catch (error) {
        msg = "Something Went Wrong";
      }
      toast({
        position: "top-right",
        title: "Action",
        description: msg,
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    },
    validationSchema: yup.object({
      pendal: yup.object().shape({
        size4: yup.number().required(),
        size2: yup.number().required(),
      }),
      table: yup.object().shape({
        buffetCloth: yup.number().required(),
        round: yup.number().required(),
      }),
      plates: yup.number().required(),
      buckets: yup.number().required(),
      washBasin: yup.number().required(),
      chairs: yup.number().required(),
      spoons: yup.number().required(),
      basin: yup.number().required(),
    }),
  });

  const formikDecoration = useFormik({
    initialValues: {
      eventId: event.id,
      decorationId: null,
    },
    onSubmit: async (values) => {},
    validationSchema: yup.object(),
  });
  console.log(event);
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
                  key="Event"
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
                      type="text"
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
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex md:flex-col sm:flex-col space-x-2 mx-auto scroll-smooth md:h-screen sm:h-screen">
                <h1 className="hidden md:block text-center font-bold text-lg text-cyan-700 bg-gray-100 ">
                  Inventory Details
                </h1>
                <form
                  key="Inventory"
                  onSubmit={formikInventory.handleSubmit}
                  className="flex flex-wrap md:space-x-5 sm:flex:col md:w-full mx-auto sm:w-full sm:h-full"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Pendal 40x40</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Pendal"
                      name="pendal.size4"
                      id="pendal.size4"
                      required
                      value={formikInventory.values.pendal.size4}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.touched.pendal?.size4 &&
                    formikInventory.values.pendal.size4 ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Pendal 20x40</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Pendal"
                      name="pendal.size2"
                      id="pendal.size2"
                      required
                      value={formikInventory.values.pendal?.size2}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.values.pendal?.size2 &&
                    formikInventory.values.pendal?.size2 ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Table Buffet-Cloth</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Buffet Cloth"
                      name="table.buffetCloth"
                      id="table.buffetCloth"
                      required
                      value={formikInventory.values?.table.buffetCloth}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.values.table.buffetCloth &&
                    formikInventory.values.table.buffetCloth ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Table Round</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Round "
                      name="table.round"
                      id="table.round"
                      required
                      value={formikInventory.values?.table.round}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.values.table.round &&
                    formikInventory.values.table.round ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Plates</span>
                    </label>
                    <input
                      type="number"
                      placeholder="plates "
                      name="plates"
                      id="plates"
                      required
                      value={formikInventory.values?.plates}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.values.plates &&
                    formikInventory.values.plates ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Buckets</span>
                    </label>
                    <input
                      type="number"
                      placeholder="buckets "
                      name="buckets"
                      id="buckets"
                      required
                      value={formikInventory.values?.buckets}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.values.buckets &&
                    formikInventory.values.buckets ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">WashBasin</span>
                    </label>
                    <input
                      type="number"
                      placeholder="washBasin "
                      name="washBasin"
                      id="washBasin"
                      required
                      value={formikInventory.values?.washBasin}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.values.washBasin &&
                    formikInventory.values.washBasin ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Chairs</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Chairs "
                      name="chairs"
                      id="chairs"
                      required
                      value={formikInventory.values?.chairs}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.values.chairs &&
                    formikInventory.values.chairs ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Spoons</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Spoons "
                      name="spoons"
                      id="spoons"
                      required
                      value={formikInventory.values?.spoons}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.values.spoons &&
                    formikInventory.values.spoons ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Basin</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Basin "
                      name="basin"
                      id="basin"
                      required
                      value={formikInventory.values?.basin}
                      onChange={formikInventory.handleChange}
                      className="input input-bordered w-full"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formikInventory.values.basin &&
                    formikInventory.values.basin ? (
                      <p className="text-xs text-red-500"></p>
                    ) : null}
                  </div>
                  <div className="form-control mt-6 w-full ">
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
              <div className="flex md:flex-col sm:flex-col space-x-2 mx-auto scroll-smooth md:h-screen sm:h-screen">
                <h1 className="hidden md:block text-center font-bold text-lg text-cyan-700 bg-gray-100 ">
                  Decoration
                </h1>
                {/* <form
                  key="Inventory"
                  onSubmit={formikInventory.handleSubmit}
                  className="flex flex-wrap md:space-x-5 sm:flex:col md:w-full mx-auto sm:w-full sm:h-full"
                ></form> */}
                <div className="max-w-md md:w-full py-4 px-8 bg-white shadow-lg rounded-lg my-20">
                  <div className="flex justify-center md:justify-end -mt-16">
                    <img
                      src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png"
                      className="transition duration-500 ease-in-out h-20 transform md:hover:scale-300 hover:scale-200 object-cover rounded-b-md"
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-800 text-3xl font-semibold">
                      Design Tools
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quae dolores deserunt ea doloremque natus error, rerum
                      quas odio quaerat nam ex commodi hic, suscipit in a
                      veritatis pariatur minus consequuntur!
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <a href="#" className="text-xl font-medium text-indigo-500">
                      John Doe
                    </a>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              {/* <div className="flex md:flex-col sm:flex-col space-x-2 mx-auto scroll-smooth md:h-screen sm:h-screen">
                <h1 className="hidden md:block text-center font-bold text-lg text-cyan-700 bg-gray-100 ">
                  Timeline
                </h1>
                {/*<form
                  key="Inventory"
                  onSubmit={formikInventory.handleSubmit}
                  className="flex flex-wrap md:space-x-5 sm:flex:col md:w-full mx-auto sm:w-full sm:h-full"
                ></form>
              </div> */}
              <div className="flex flex-col space-y-1 md:space-y-3">
                <div className="card lg:card-side card-bordered border-pink-300 p-2">
                  <figure>
                    <Image
                      alt="loading"
                      height="250"
                      width="400"
                      src="https://ik.imagekit.io/pjps5pyjhri/event-timeline/undraw_Floating_re_xtcj_y_hS-a5jV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643908591656"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Horizontal
                      <div className="badge mx-2">NEW</div>
                    </h2>

                    <p>
                      Rerum reiciendis beatae tenetur excepturi aut pariatur est
                      eos. Sit sit necessitatibus veritatis sed molestiae
                      voluptates incidunt iure sapiente.
                    </p>
                    <div className="card-actions">
                      <button className="btn btn-primary">Get Started</button>
                      <button className="btn btn-ghost">More info</button>
                    </div>
                  </div>
                </div>
                <div className="card lg:card-side card-bordered">
                  <figure>
                    <img src="https://picsum.photos/id/1005/400/250" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Horizontal
                      <div className="badge mx-2">NEW</div>
                    </h2>
                    <p>
                      Rerum reiciendis beatae tenetur excepturi aut pariatur est
                      eos. Sit sit necessitatibus veritatis sed molestiae
                      voluptates incidunt iure sapiente.
                    </p>
                    <div className="card-actions">
                      <button className="btn btn-primary">Get Started</button>
                      <button className="btn btn-ghost">More info</button>
                    </div>
                  </div>
                </div>
              </div>
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
