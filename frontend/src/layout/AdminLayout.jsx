import React, { useContext } from "react";
import { CalendarOutlined, UserAddOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import { AuthContext } from "../Context/AuthContext";

const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items = [
  getItem(
    "Events",
    "event-list",
    <CalendarOutlined style={{ fontSize: "30px" }} />
  ),
  getItem(
    "Create user",
    "create-user",
    <UserAddOutlined style={{ fontSize: "30px" }} />
  ),
  getItem(
    "Add event",
    "add-event",
    <CalendarOutlined style={{ fontSize: "30px" }} />
  ),
];
const AdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={user.role !== "super-admin" ? items.slice(0, 1) : items}
          onClick={(e) => console.log(navigate(`/admin/${e.key}`))}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex justify-end mr-10">
            {" "}
            <ProfileDropdown />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          NAF Schedule of Events ©{new Date().getFullYear()} by FLT LT A SANI
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
