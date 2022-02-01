import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import { eventInterface } from "../../lib/interfaces/eventInterface";

interface props {
  events: eventInterface[];
}
const Event: React.FC<props> = ({ events }) => {
  const router = useRouter();
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
              <button className="btn btn-primary bg-teal-500 border-none">
                Create An Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="text-3xl text-cyan-500 font-bold text-center">Event</div>

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

  const URL = `${process.env.NEXTAUTH_URL}api/user/${session?.id}`;
  const { data } = await axios.get(URL);
  return {
    props: {
      events: data?.events || [],
    },
  };
}
