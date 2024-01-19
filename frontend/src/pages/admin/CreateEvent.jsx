// form and inputs is handle by Ant custom input field

import React, { useContext, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { backendUrl, naf_branch } from "../../utils/helper";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/event/create-event`,
        {
          ...values,
          event_date: values.event_date.$d,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      navigate("/admin/event-list");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <h1 className="text-left">ADD NEW NAF EVENT</h1>
      <section className="grid place-items-center h-screen">
        <div className="max-w-lg w-full shadow p-4">
          <Form
            disabled={loading}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <p className="text-left">Event title</p>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please provide event title",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="flex justify-between">
              <div>
                {" "}
                <p className="text-left">Event date</p>
                <Form.Item
                  name="event_date"
                  rules={[
                    {
                      required: true,
                      message: "Please select event date",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </div>
              <div>
                <p className="text-left">Branch</p>
                <Form.Item
                  name="branch"
                  rules={[
                    {
                      required: true,
                      message: "Please select the branch",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
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
                </Form.Item>
              </div>
            </div>

            <p className="text-left">Responsibility</p>
            <Form.Item
              name="responsibility"
              rules={[
                {
                  required: true,
                  message: "Please assign responsibility",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <p className="text-left">
              Event description{" "}
              <span className="text-gray-400">(optional)</span>
            </p>
            <Form.Item name="event_description">
              <TextArea rows={6} />
            </Form.Item>

            <Form.Item>
              <Button block loading={loading} type="primary" htmlType="submit">
                Submit event
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};
export default CreateEvent;
