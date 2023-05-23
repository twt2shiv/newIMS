import { useEffect } from "react";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";
import { Button, Card, Col, Modal, Row, Space, Input, Form } from "antd";
import { imsAxios } from "app/utils/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "/app/store";

// required keys for the form
const formRules = {
  caption: [
    {
      required: true,
      message: "Please provide a caption for the image!",
    },
  ],
  image: [
    {
      required: true,
      message: "Please select a image!",
    },
  ],
};
// form initial values
const initialValues = {
  caption: "",
  image: null,
};
function AddImageForm({ product, setRefreshImages }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.imsData);
  //   iniatilize upload image form
  const [addImageForm] = Form.useForm();

  //   show submit confirm
  const showSubmitConfirm = async () => {
    const values = await addImageForm.validateFields();
    Modal.confirm({
      title: "Are you sure you want to submit?",
      content: (
        <div>
          <p>Are you sure you want to submit this image?</p>
          <p>Press [ESC] to close this dialog</p>
        </div>
      ),
      okText: "Yes",
      onOk() {
        submitHandler(values);
      },
    });
  };
  //   show reset confirm dialog
  const showResetConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to reset?",
      content: (
        <div>
          <p>Are you sure you want to reset this form?</p>
          <p>Press [ESC] to close this dialog</p>
        </div>
      ),
      okText: "Yes",
      onOk() {
        resetHandler();
      },
    });
  };
  //   submit handler
  const submitHandler = async (values) => {
    console.log(product);
    const formData = new FormData();
    formData.append("caption", values.caption);
    formData.append("files", values.image.file);
    formData.append("product", product.productKey);
    dispatch(setLoading("submittingImage"));
    const data = await imsAxios.post("/products/upload_product_img", formData);
    dispatch(setLoading(false));
    if (data.code === 200) {
      resetHandler();
      setRefreshImages(true);
    }
  };
  //   reset handler
  const resetHandler = () => {
    addImageForm.resetFields();
  };
  const props = {
    // name: "file",
    maxCount: 1,
    listType: "picture",
    beforeUpload(file) {
      return false;
    },
  };
  // resetting the form when product changes
  useEffect(() => {
    resetHandler();
  }, [product]);
  return (
    <Card
      size="small"
      title="Add Images"
      extra={
        <Space>
          <Button onClick={showResetConfirm}>Reset</Button>
          <Button
            loading={loading === "submittingImage"}
            type="primary"
            onClick={showSubmitConfirm}
          >
            Submit
          </Button>
        </Space>
      }
    >
      <Form initialValues={initialValues} form={addImageForm} layout="vertical">
        <Row gutter={[0, 4]}>
          <Col span={24}>
            <Form.Item name="caption" label="Caption" rules={formRules.caption}>
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24} className="preview-block">
            <Form.Item name="image" label="Image" rules={formRules.image}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                  <Typography.Title level={5}>
                    Click or drag file to this area to upload
                  </Typography.Title>
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default AddImageForm;
