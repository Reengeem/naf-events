import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="shadow-md bg-blue-950 p-4">
      <div className="flex justify-between  items-center mx-auto max-w-6xl">
        <NavLink to={"/"}>
          <h3 className="text-white">
            {" "}
            <img src="logo.png" alt="NAF Logo" srcset="" /> NAF SCHEDULE OF
            EVENTS
          </h3>
        </NavLink>

        <NavLink to={"/login"}>
          <Button>Log In</Button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
