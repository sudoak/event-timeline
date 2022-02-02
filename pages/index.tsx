import { useFormik } from "formik";
import type { NextPage } from "next";
import * as yup from "yup";
import Navbar from "../components/navbar";

const Index: NextPage = () => {
  const formik = useFormik({
    initialValues: {
      eventCode: "",
      password: "",
    },
    validationSchema: yup.object({
      eventCode: yup
        .string()
        .max(8, "Must be less than 8 characters")
        .required(),
      password: yup.string().max(8, "Must be at least 8 characters").required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Navbar></Navbar>
      <div className="hero min-h-screen bg-sky-100">
        <div className="flex-col justify-center hero-content lg:flex-row">
          <div className="text-center lg:text-left p-10">
            <h1 className="mb-5 text-3xl font-bold text-teal-500">
              Hello there
            </h1>
            <blockquote className="space-x-4 text-2xl font-semibold italic text-center text-slate-900">
            We are a platform that provides a bridge between a{" "}
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                <span className="relative text-white">Event</span>
              </span>
              {" "}Manager and yourself. You can view the full
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                <span className="relative text-white">Timelines</span>
              </span>{" "}
              and keep yourself updated with what is happening on your event
              field.
            </blockquote>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body mx-auto text-extrabold text-xl">
              <h2>Credentials</h2>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Event Code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Event Code"
                    name="eventCode"
                    id="eventCode"
                    value={formik.values.eventCode}
                    onChange={formik.handleChange}
                    className="input input-bordered"
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                  />
                  {formik.touched.eventCode && formik.errors.eventCode ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.eventCode}
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
                    className="input input-bordered"
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Check"
                    className="btn border-none bg-teal-500"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="p-10 footer text-base-content bg-teal-500">
        <div>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>
            Sudo Coders Ltd.
            <br />
            Providing reliable tech since 2022
          </p>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
// import type { NextPage } from "next";
// import Link from "next/link";
// import Image from "next/image";
// import { signIn, useSession, signOut } from "next-auth/react";
// import { MoonIcon, SunIcon } from "@heroicons/react/solid";
// import { ReactNode } from "react";
// import {
//   Box,
//   Flex,
//   Avatar,
//   Link as CLink,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   useDisclosure,
//   useColorModeValue,
//   Stack,
//   useColorMode,
//   Center,
// } from "@chakra-ui/react";

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <CLink
//     px={2}
//     py={1}
//     rounded={"md"}
//     _hover={{
//       textDecoration: "none",
//       bg: useColorModeValue("gray.200", "gray.700"),
//     }}
//     href={"#"}
//   >
//     {children}
//   </CLink>
// );

// const Home: NextPage = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const { data, status } = useSession();

//   return (
//     <div>
//       <Box bg={useColorModeValue("gray.100", "gray.500")} px={4}>
//         <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
//           <Box>
//             <Image
//               src="https://ik.imagekit.io/pjps5pyjhri/event_timeline_URVq62Y_k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643531375922"
//               alt="Logo"
//               width="220"
//               height="220"
//             />
//           </Box>

//           <Flex alignItems={"center"}>
//             <Stack direction={"row"} spacing={7}>
//               <Button onClick={toggleColorMode}>
//                 {colorMode === "light" ? (
//                   <MoonIcon className="h-5 w-5 text-green-500" />
//                 ) : (
//                   <SunIcon className="h-5 w-5 text-gold-500" />
//                 )}
//               </Button>
//               {status === "authenticated" ? (
//                 <Menu>
//                   <MenuButton
//                     as={Button}
//                     rounded={"full"}
//                     variant={"link"}
//                     cursor={"pointer"}
//                     minW={0}
//                   >
//                     <Avatar
//                       size={"sm"}
//                       src={`https://avatars.dicebear.com/api/initials/${data?.user?.name}.svg`}
//                     />
//                   </MenuButton>
//                   <MenuList alignItems={"center"}>
//                     <br />
//                     <Center>
//                       <Avatar
//                         size={"2xl"}
//                         src={
//                           `https://avatars.dicebear.com/api/initials/${data?.user?.name}.svg`
//                         }
//                       />
//                     </Center>
//                     <br />
//                     <Center>
//                       <p>{data?.user?.name}</p>
//                     </Center>
//                     <br />
//                     <MenuDivider />
//                     <MenuItem>Your Servers</MenuItem>
//                     <MenuItem>Account Settings</MenuItem>
//                     <MenuItem onClick={() => signOut()}>Logout</MenuItem>
//                   </MenuList>
//                 </Menu>
//               ) : (
//                 <Button
//                   display={{ base: "none", md: "inline-flex" }}
//                   fontSize={"sm"}
//                   fontWeight={600}
//                   color={"white"}
//                   bg={"blue.400"}
//                   href={"#"}
//                   _hover={{
//                     bg: "blue.300",
//                   }}
//                   onClick={() => signIn()}
//                 >
//                   Sign In
//                 </Button>
//               )}
//             </Stack>
//           </Flex>
//         </Flex>
//       </Box>
//     </div>
//   );
// };
// export default Home;
