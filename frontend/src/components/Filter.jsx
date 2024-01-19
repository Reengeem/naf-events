import React, { useContext } from "react";
import { Input, Select } from "antd";
import axios from "axios";
import { backendUrl } from "../utils/helper";
import { EventContext } from "../Context/EventContext";

const { Search } = Input;
const { Option } = Select;

const Filter = () => {
  // filter by search ====================================================================
  const { setEvents } = useContext(EventContext);
  const filterBySearch = async (value) => {
    try {
      const response = await axios.get(
        `${backendUrl}/event/query-event?quater=${value}`
      );

      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }

    // setEvents(filteredEvents);
  };

  const filterByQuarter = async (value) => {
    try {
      const response = await axios.get(
        `${backendUrl}/event/query-event?quater=${value}`
      );

      console.log(response);
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }

    // setEvents(filteredEvents);
  };

  return (
    <div>
      <Search
        placeholder="Search for Events"
        style={{ width: 250 }}
        onSearch={(value) => filterBySearch(value)}
        enterButton
      />

      {/* for filter ====================================================================*/}
      <Select
        className="pl-2"
        defaultValue="Filter by Quarter"
        style={{ width: 120 }}
        onChange={(value) => filterByQuarter(value)}
      >
        <Option value="first-quater">FIRST QUARTER</Option>
        <Option value="second-quater">SECOND QUARTER</Option>
        <Option value="third-quarter">THIRD QUARTER</Option>
        <Option value="fourth-quater">FOURTH QUARTER</Option>
      </Select>
    </div>
  );
};

export default Filter;
