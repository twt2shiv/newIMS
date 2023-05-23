"use client";
import { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import ConfirmModal from "./ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "/app/store";
import { imsAxios } from "app/utils/axiosInterceptor";

const formRules = {
  name: [
    {
      required: true,
      message: "Please input UOM name!",
    },
  ],
  description: [
    {
      required: true,
      message: "Please input UOM description!",
    },
  ],
};

export default function UOMForm() {
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [uomAddForm] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.imsData);

  const submitHandler = async () => {
    const { name, description } = showSubmitConfirm;
    dispatch(setLoading("fetch"));
    imsAxios.post("/uom/insert", {
      uom: name,
      description: description,
    });
    dispatch(setLoading(false));
    setShowSubmitConfirm(false);
    resetHandler();
  };

  const resetHandler = () => {
    uomAddForm.resetFields();
    setResetConfirm(false);
  };
  const validateHandler = (values) => {
    setShowSubmitConfirm(values);
  };
  return (
    <Card size="small" title="Add New Unit of measurement">
      <ConfirmModal
        show={showSubmitConfirm}
        hide={() => setShowSubmitConfirm(false)}
        title="Submit Confirm"
        loading={loading === "fetch"}
        message="Are you sure you want to create this UOM?"
        submitHandler={submitHandler}
      />
      <ConfirmModal
        show={resetConfirm}
        hide={() => setResetConfirm(false)}
        title="Reset Confirm"
        message="Are you sure you want to reset this form?"
        submitHandler={resetHandler}
      />
      <Form
        form={uomAddForm}
        onFinish={validateHandler}
        style={{ width: "100%" }}
        layout="vertical"
      >
        <Row>
          <Col span={24}>
            <Form.Item rules={formRules.name} label="Unit Name" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              rules={formRules.description}
              label="Description"
              name="description"
            >
              <Input.TextArea rows={4} style={{ resize: "none" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row justify="end">
              <Space>
                <Button onClick={() => setResetConfirm(true)}>Reset</Button>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Space>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
