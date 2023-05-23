"use client";
import { Card, Col, Form, Input, Modal, Row, Space, Button } from "antd";
import MySelect from "app/components/Select/MySelect/MySelect";
import React from "react";

// requred keys for the form
const formRules = {
  name: [
    {
      required: true,
      message: "Please input the name of the service!",
    },
  ],
  code: [
    {
      required: true,
      message: "Please input a unique part code for the service!",
    },
  ],
  uom: [
    {
      required: true,
      message: "Please select an unit of measurement!",
    },
  ],
};

export default function AddServicesForm({ uomOptions }) {
  const [AddServicesForm] = Form.useForm();

  // handling form submission
  const submitHandler = (values) => {
    console.log("values are...", values);
  };
  // handling reset fr=orm
  const resetHandler = () => {
    // confirm dialog to reset form
    Modal.confirm({
      title: "Do you want to reset the form?",
      content: "All the fields will be cleared",
      onOk: () => AddServicesForm.resetFields(),
      okText: "Yes",
      cancelText: "No",
    });
  };
  // show submit confirm dialog using async await
  const validateHandler = async () => {
    const values = await AddServicesForm.validateFields();
    Modal.confirm({
      title: "Do you want to add this service component?",
      content: "This action cannot be undone",
      okText: "Yes",
      cancelText: "No",
      onOk: () => submitHandler(values),
    });
  };
  return (
    <Row gutter={[0, 4]}>
      <Col span={24}>
        <Card
          size="small"
          title="Add new service component"
          extra={
            <Space>
              <Button onClick={resetHandler}>Reset</Button>
              <Button onClick={validateHandler} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <Form form={AddServicesForm} layout="vertical">
            <Row gutter={4}>
              <Col span={24}>
                <Form.Item label="Name" name="name" rules={formRules.name}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Part Code" name="code" rules={formRules.code}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Unit of measurement"
                  name="uom"
                  rules={formRules.uom}
                >
                  <MySelect options={uomOptions} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={2} style={{ resize: "none" }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
