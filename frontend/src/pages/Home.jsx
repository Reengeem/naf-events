import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { backendUrl } from "../utils/helper";
import EventCard from "../components/EventCard";
import axios from "axios";
import { EventContext } from "../Context/EventContext";

const Home = () => {
  // const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { events, setEvents } = useContext(EventContext);

  const getAllEvents = async () => {
    try {
      const response = await axios.get(`${backendUrl}/event`);

      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <section className="max-w-6xl mx-auto">
      {/* <h1>NAF SCHEDULE OF EVENTS</h1> */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
        {events.map((event) => (
          <EventCard key={event._id} {...event} />
        ))}
      </div>
    </section>
  );
};

export default Home;
