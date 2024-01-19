import { useState, useContext } from "react";
import { Button } from "antd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EventList from "./pages/EventList";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Admin from "./pages/admin/Admin";
import AdminLayout from "./layout/AdminLayout";
import CreateEvent from "./pages/admin/CreateEvent";
import CreateUser from "./pages/admin/CreateUser";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/EventList" />
      </Route>

      <Route
        path="/admin"
        element={!user ? <Navigate to={"/login"} /> : <AdminLayout />}
      >
        <Route path="/admin/event-list" element={<EventList />} />
        <Route
          path="/admin/add-event"
          element={
            user?.role !== "super-admin" ? (
              <Navigate to={"/admin/event-list"} />
            ) : (
              <CreateEvent />
            )
          }
        />
        <Route
          path="/admin/create-user"
          element={
            user?.role !== "super-admin" ? (
              <Navigate to={"/admin/event-list"} />
            ) : (
              <CreateUser />
            )
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
