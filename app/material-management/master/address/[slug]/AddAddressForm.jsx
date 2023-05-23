"use client";
import { Button, Card, Col, Form, Input, Modal, Row, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import MyAsyncSelect from "app/components/Select/MyAsyncSelect/MyAsyncSelect";
import { imsAxios } from "app/utils/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "/app/store";

// initital values for add address form
const initialValues = {
  label: "",
  name: "",
  pan: "",
  gst: "",
  cin: "",
  state: "",
  address: "",
};

// add address form rules
const formRules = {
  label: [
    {
      required: true,
      message: "Please enter a label for the address!",
    },
  ],
  name: [
    {
      required: true,
      message: "Please enter the company name!",
    },
  ],

  pan: [
    {
      required: true,
      message: "Please enter the pan number of the company!",
    },
  ],
  gst: [
    {
      required: true,
      message: "Please enter the gst number of the company!",
    },
  ],
  cin: [
    {
      required: true,
      message: "Please enter the cin number of the company!",
    },
  ],
  state: [
    {
      required: true,
      message: "Please select the state of the company!",
    },
  ],
  address: [
    {
      required: true,
      message: "Please enter the address of the company!",
    },
  ],
};

export default function AddAddressForm({ slug, loading }) {
  // inititlize add address form
  const [addAddressForm] = Form.useForm();
  const params = useParams();
  const dispatch = useDispatch();

  // submit handler
  const submitHandler = async (values) => {
    let link = "";
    if (slug === "billing") {
      link = "/billingAddress/saveBillingAddress";
    } else {
      link = "/shippingAddress/saveShippingAddress";
    }
    const finalValues = {
      ...values,
      company: values.name,
      gstin: values.gst,
    };
    dispatch(setLoading("submitting"));
    const data = await imsAxios.post(link, finalValues);
    dispatch(setLoading(false));
    if (data.code === 200) {
      addAddressForm.resetFields();
    }
  };

  // show submit confirm dialog
  const showSubmitConfirm = () => {
    const values = addAddressForm.getFieldsValue();
    Modal.confirm({
      title: "Do you Want to submit the form?",
      icon: <ExclamationCircleOutlined />,
      content: "This will submit the form and save the data.",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        submitHandler(values);
      },
    });
  };
  // show reset confirm dialog
  const showResetConfirm = () => {
    Modal.confirm({
      title: "Do you Want to reset the form?",
      icon: <ExclamationCircleOutlined />,
      content: "This will reset the form and clear all the fields.",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        addAddressForm.resetFields();
      },
    });
  };
  return (
    <Card
      size="small"
      title={`Add ${slug === "billing" ? "Billing" : "Shipping"} Address`}
      extra={
        <Space>
          <Button onClick={showResetConfirm}>Reset</Button>
          <Button
            loading={loading === "submitting"}
            type="primary"
            onClick={showSubmitConfirm}
          >
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        initialValues={initialValues}
        form={addAddressForm}
        layout="vertical"
        style={{ width: "100%" }}
      >
        <Row gutter={6}>
          <Col span={12}>
            <Form.Item label="Label" name="label" rules={formRules.label}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Company Name" name="name" rules={formRules.name}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Pan No." name="pan" rules={formRules.pan}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="GST No." name="gst" rules={formRules.gst}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="CIN No." name="cin" rules={formRules.cin}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="State" name="state" rules={formRules.state}>
              <MyAsyncSelect url="/backend/stateList" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Address" name="address" rules={formRules.address}>
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
