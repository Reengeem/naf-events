import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 items-center">
      <p className="text-black font-medium uppercase"> {user.naf_number}</p>
      <Button
        onClick={() => {
          setUser(null);
          navigate("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default ProfileDropdown;
