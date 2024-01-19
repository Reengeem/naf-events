import React from "react";
import { Card } from "antd";
import CustomModal from "./Modal";
const EventCard = ({ title, branch, responsibility, event_date, status }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div>
      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        cardContent={{ title, branch, responsibility, event_date, status }}
      />
      <Card
        onClick={() => setIsModalOpen(true)}
        hoverable
        bordered={false}
        title={title}
      >
        <p>Event Date: {event_date}</p>
        <p>Responsibility: {responsibility}</p>
        <p>Branch: {branch}</p>
        <p>Status: {status}</p>
      </Card>
    </div>
  );
};

export default EventCard;
