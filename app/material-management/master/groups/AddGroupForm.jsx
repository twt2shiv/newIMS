"use client";
import { Card, Form, Row, Col, Space, Button, Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { imsAxios } from "app/utils/axiosInterceptor";
import { useDispatch } from "react-redux";
import { setLoading } from "/app/store";

// inititial values for add group form
const initialValues = {
  name: "",
};
// add location form rules
const formRules = {
  name: [
    {
      required: true,
      message: "Please input the name of the group!",
    },
  ],
};
export default function AddGroupForm({ loading, getRows }) {
  // initialize add group form
  const [addGroupForm] = Form.useForm();
  const dispatch = useDispatch();

  // submit handler
  const submitHandler = async (values) => {
    dispatch(setLoading("submitting"));
    const data = await imsAxios.post("/groups/insert", {
      group_name: values.name,
    });
    dispatch(setLoading(false));
    if (data.code === 200) {
      getRows();
      addGroupForm.resetFields();
    }
  };

  // show submit confirm dialog
  const showSubmitConfirm = async () => {
    const values = await addGroupForm.validateFields();
    Modal.confirm({
      title: "Do you Want to Submit the Form?",
      icon: <ExclamationCircleOutlined />,
      content: "This will add the group",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        submitHandler(values);
      },
    });
  };

  // show reset form dialog
  const showResetConfirm = () => {
    Modal.confirm({
      title: "Do you Want to Reset the Form?",
      icon: <ExclamationCircleOutlined />,
      content: "This will reset the form",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        addGroupForm.resetFields();
      },
    });
  };
  return (
    <Card
      size="small"
      title="Add New Group"
      extra={
        <Space>
          <Button onClick={showResetConfirm}>Reset</Button>
          <Button
            loading={loading === "submitting"}
            onClick={showSubmitConfirm}
            type="primary"
          >
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        form={addGroupForm}
        initialValues={initialValues}
        layout="vertical"
        style={{ width: "100%" }}
      >
        <Row>
          <Col span={24}>
            <Form.Item name="name" rules={formRules.name} label="Group Name">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
