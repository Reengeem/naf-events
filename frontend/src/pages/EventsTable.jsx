import React, { useContext } from "react";
import { Button, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateModal from "./admin/updateModal";
import EventProvider, { EventContext } from "../Context/EventContext";

const EventsTable = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState({});
  const { events } = useContext(EventContext);

  const columns = [
    {
      title: "Date",
      dataIndex: "event_date",
      key: "event_date",
      render: (event_date) => <p>{new Date(event_date).toDateString()}</p>,
    },
    {
      title: "Events",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span style={{ textTransform: "uppercase" }}>{text}</span>
      ),
    },
    {
      title: "Responsibility",
      dataIndex: "responsibility",
      key: "responsibility",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => <Tag color={"red"}>{status.toUpperCase()}</Tag>,
    },
    {
      title: "update",
      key: "update",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedEvent(record);
              setIsModalOpen(true);
            }}
            type="primary"
            icon={<EditOutlined />}
          ></Button>
        </Space>
      ),
    },

    {
      title: "Delete",
      key: "Delete",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <DeleteOutlined
              type="delete"
              style={{ fontSize: "16px", color: "red" }}
              theme="outlined"
            />
          </a>
          {record.name}
        </Space>
      ),
    },
  ];
  // Convert all titles to uppercase
  const uppercaseColumns = columns.map((column) => ({
    ...column,
    title: column.title.toUpperCase(),
  }));
  return (
    <>
      <UpdateModal
        isModalOpen={isModalOpen}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setIsModalOpen={setIsModalOpen}
      />
      <Table columns={uppercaseColumns} dataSource={events} />;
    </>
  );
};
export default EventsTable;
