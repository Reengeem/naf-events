// form and inputs is handle by Ant custom input field

import React, { useContext, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import {
  backendUrl,
  naf_branch,
  naf_rank,
  admin_role,
} from "../../utils/helper";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/auth/register`,

        values,

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
      <h1 className="text-left">ADD NEW USER</h1>
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
            <p className="text-left">NAF Number</p>
            <Form.Item
              name="naf_number"
              rules={[
                {
                  required: true,
                  message: "Please provide NAF Number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <p className="text-left">Name</p>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please provide User name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="flex justify-between">
              <div>
                <p className="text-left">Rank</p>
                <Form.Item
                  name="rank"
                  rules={[
                    {
                      required: true,
                      message: "Please select the rank",
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
                    options={naf_rank}
                  />
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
            <p className="text-left">Role</p>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please select the rank",
                },
              ]}
            >
              <Select
                showSearch
                style={{
                  width: 480,
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
                options={admin_role}
              />
            </Form.Item>
            <p className="text-left">Password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please provide password",
                },
              ]}
            >
              <Input />
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
export default CreateUser;
