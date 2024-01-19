import React, { useContext, useState } from "react";
import { Button, Modal, Input, Select } from "antd";
import { backendUrl, naf_branch, event_status } from "../../utils/helper";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";
import { EventContext } from "../../Context/EventContext";

const UpdateModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedEvent,
  setSelectedEvent,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setSelectedEvent({});
    setIsModalOpen(false);
  };

  const { user } = useContext(AuthContext);
  const { events, setEvents } = useContext(EventContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/event/update-event/${selectedEvent._id}`,
        {
          ...selectedEvent,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(response);

      const updatedEvents = events.map((item, index) => {
        if (item._id === selectedEvent._id) {
          item = response.data;
        }
        return item;
      });

      setEvents(updatedEvents);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setSelectedEvent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Modal
        title="Update Event"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <section>
          <div className="max-w-lg w-full shadow p-4">
            <form>
              <p className="text-left">Event title</p>
              <Input
                name="title"
                onChange={handleInput}
                value={selectedEvent.title}
              />

              <div className="flex justify-between">
                <div>
                  {" "}
                  <p className="text-left">Event date</p>
                  {/* <DatePicker value={formattedDate} /> */}
                  <input
                    type="datetime"
                    name="event_date"
                    id="event_date"
                    value={new Date(selectedEvent.event_date)}
                    onChange={(e) => console.log(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-left">Branch</p>

                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
                    value={selectedEvent.branch}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={naf_branch}
                  />
                </div>
              </div>
              <p className="text-left">Status</p>

              <Select
                onChange={(value) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    status: value,
                  })
                }
                name="status"
                showSearch
                style={{
                  width: 200,
                }}
                value={selectedEvent.status}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={event_status}
              />

              <p className="text-left">Responsibility</p>
              <Input
                name="responsibility"
                onChange={handleInput}
                value={selectedEvent.responsibility}
              />

              <p className="text-left">Remarks</p>
              <Input
                name="event_remark"
                onChange={handleInput}
                value={selectedEvent.event_remark}
              />
              <p className="text-left">
                Event description{" "}
                <span className="text-gray-400">(optional)</span>
              </p>

              <TextArea
                rows={4}
                name="event_description"
                onChange={handleInput}
                value={selectedEvent.event_description}
              />

              <Button
                block
                loading={loading}
                onClick={onFinish}
                type="primary"
                htmlType="submit"
              >
                Submit event
              </Button>
            </form>
          </div>
        </section>
      </Modal>
    </>
  );
};
export default UpdateModal;
