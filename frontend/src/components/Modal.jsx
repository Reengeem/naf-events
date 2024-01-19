import React, { useState } from "react";
import { Button, Modal } from "antd";
const CustomModal = ({
  isModalOpen,
  setIsModalOpen,
  cardContent: { title, branch, responsibility, event_date, status },
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="NAF EVENT"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{title}</p>
      </Modal>
    </>
  );
};
export default CustomModal;
