import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import { backendUrl } from "../../utils/helper";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { EventContext } from "../../Context/EventContext";

const DeleteEvent = ({ selectedEvent, setSelectedEvent }) => {
  const { user } = useContext(AuthContext);
  const { events, setEvents } = useContext(EventContext);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Send a DELETE request to delete the event
      const response = await axios.delete(
        `${backendUrl}/event/delete-event/${selectedEvent._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(response);

      // Remove the deleted event from the events list
      const updatedEvents = events.filter(
        (item) => item._id !== selectedEvent._id
      );

      setEvents(updatedEvents);

      // Optionally, you can close the modal or perform any other actions here
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleDelete} type="primary" danger>
        Delete Event
      </Button>
    </>
  );
};

export { DeleteEvent, handleDelete }; // Export the handleDelete function
