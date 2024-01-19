import React, { useState, useMemo } from "react";
import { backendUrl } from "../utils/helper";
import EventTable from "./EventsTable";
import axios from "axios";
import { Input, Space, Select } from "antd";
import Filter from "../components/Filter";

const { Search } = Input;
const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [random, setRandom] = useState(0);

  const getAllEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/event`);
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const memorizedEvents = useMemo(() => {
    return {
      memorizedEvents: events,
    };
  }, [random]);

  React.useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <section className="max-w-6xl mx-auto">
      {/* <h1>NAF SCHEDULE OF EVENTS</h1>{" "} */}
      <div className="max-w-3xl mx-auto flex flex-wrap justify-between py-10 ">
        <Filter
          setEvents={setEvents}
          events={events}
          memorizedEvents={memorizedEvents}
        />
        {events.length === 0 ? (
          <div className="text-center py-24 text-3xl">Search not found</div>
        ) : (
          <>{loading ? <h1>Loading</h1> : <EventTable events={events} />}</>
        )}
      </div>
    </section>
  );
};

export default EventList;
