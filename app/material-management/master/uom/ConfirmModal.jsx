import { Modal } from "antd";
import React from "react";

export default function CreateSubmitConfirm({
  show,
  hide,
  submitHandler,
  loading,
  message,
  title,
}) {
  return (
    <Modal
      title={title}
      open={show}
      onOk={submitHandler}
      confirmLoading={loading}
      onCancel={hide}
      okText="Yes"
      cancelText="No"
    >
      <p>{message}</p>
    </Modal>
  );
}
