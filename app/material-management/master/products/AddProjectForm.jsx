"use client";
import { Card, Form, Row, Col, Input, Space, Button, Modal } from "antd";
import MySelect from "/app/components/Select/MySelect/MySelect";
import { useSelector, useDispatch } from "react-redux";
import { imsAxios } from "app/utils/axiosInterceptor";
import { setLoading } from "/app/store";

// form required fields
const formRules = {
  name: [
    {
      required: true,
      message: "Please input the name of the product!",
    },
  ],
  sku: [
    {
      required: true,
      message: "Please input a unique SKU for the product!",
    },
  ],
  productTypesku: [
    {
      required: true,
      message:
        "Please select whether the product is finished or semi-finished!",
    },
  ],
  uom: [
    {
      required: true,
      message: "Please select an unit of measurement!",
    },
  ],
};
// product type
const productTypeOptions = [
  {
    value: "fg",
    text: "Finished Goods",
  },
  {
    value: "sfg",
    text: "Semi-Finished Goods",
  },
];
// form initial values
const initialValues = {
  name: "",
  sku: "",
  productType: "fg",
  uom: "",
};
export default function AddProjectForm({ uomOptions, getRows }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.imsData);
  // intitalizing antd form
  const [addProductForm] = Form.useForm();

  // form submit handler
  const submitHandler = async (values) => {
    const { productType } = values;
    let finalValues = {
      p_name: values.name,
      p_sku: values.sku,
      units_id: values.uom,
    };
    let link = "";
    if (productType === "fg") {
      link = "/products/insertProduct";
    } else {
      link = "/products/insertSemi";
    }
    dispatch(setLoading("submitting"));
    const data = await imsAxios.post(link, finalValues);
    dispatch(setLoading(false));
    if (data.code === 200) {
      getRows();
      resetForm();
    }
  };
  // reset handler
  const resetForm = () => {
    addProductForm.resetFields();
  };
  // showing form submit confirm
  const showSubmitConfirm = async () => {
    // get form valies after validation
    const values = await addProductForm.validateFields();
    Modal.confirm({
      title: "Do you Want to submit the form?",
      content: (
        <div>
          <p>Are you sure you want to reset this form?</p>
          <p>Press [ESC] to close this dialog</p>
        </div>
      ),
      onOk() {
        submitHandler(values);
      },
      okText: "Yes",
      cancelText: "No",
    });
  };

  // showing reset confirm
  const showResetConfirm = () => {
    Modal.confirm({
      title: "Do you Want to reset the form?",
      onOk() {
        resetForm();
      },
      okText: "Yes",
      cancelText: "No",
    });
  };
  return (
    <Row gutter={[0, 4]}>
      <Col span={24}>
        <Card
          size="small"
          title="Add Finished Goods"
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
            form={addProductForm}
            layout="vertical"
            initialValues={initialValues}
            style={{ width: "100%" }}
          >
            <Row gutter={6}>
              <Col span={24}>
                <Form.Item
                  label="Product Name"
                  name="name"
                  rules={formRules.name}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Product SKU" name="sku" rules={formRules.sku}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Product Type"
                  name="productType"
                  rules={formRules.productType}
                >
                  <MySelect options={productTypeOptions} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Unit of measurement"
                  name="uom"
                  rules={formRules.uom}
                >
                  <MySelect options={uomOptions} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
