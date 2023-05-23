import { Card, Form, Input, Row, Col, Modal, Space, Button } from "antd";
import MySelect from "app/components/Select/MySelect/MySelect";
import MyAsyncSelect from "app/components/Select/MyAsyncSelect/MyAsyncSelect";
import { booleanSelectOptions } from "public/utils/selectOptions";
import { imsAxios } from "app/utils/axiosInterceptor";
import { setLoading } from "/app/store";
import { useDispatch } from "react-redux";

// initital add jobwork form values
const initialValues = {
  name: "",
  parentLocation: "",
  locationType: "1",
  userName: "",
  isJobworkLocation: "N",
  address: "",
};
// add location form rules
const formRules = {
  name: [
    {
      required: true,
      message: "Please input the name of the location!",
    },
  ],
  parentLocation: [
    {
      required: true,
      message: "Please select a parent location!",
    },
  ],
  locationType: [
    {
      required: true,
      message:
        "Please select a whether a location is storage or non storage location!",
    },
  ],
  userName: [
    {
      required: true,
      message: "Please input the user name!",
    },
  ],
  isJobworkLocation: [
    {
      required: true,
      message: "Please select whether the location is a job work location!",
    },
  ],
  address: [
    {
      required: true,
      message: "Please input the address!",
    },
  ],
};
// location type options
const locationTypeOptions = [
  { value: "1", text: "Storage" },
  { value: "2", text: "Non-Storage" },
];

export default function AddLocationForm({ getLocations, loading }) {
  // initialize add location form
  const [addLocationForm] = Form.useForm();
  const dispatch = useDispatch();
  //   show submit confirm dialog
  const showSubmitConfirm = async () => {
    dispatch(setLoading("fetching"));
    const values = await addLocationForm.validateFields();
    dispatch(setLoading(false));
    Modal.confirm({
      title: "Do you want to add this location?",
      content: "This action cannot be undone",
      okText: "Yes",
      cancelText: "No",
      onOk: () => submitHandler(values),
    });
  };

  //   showing reset confirm dialog
  const showResetConfirm = () => {
    Modal.confirm({
      title: "Do you want to reset the form?",
      content: "All the fields will be cleared",
      onOk: () => addLocationForm.resetFields(),
      okText: "Yes",
      cancelText: "No",
    });
  };
  //   submit handler
  const submitHandler = async (values) => {
    console.log("values are...", values);
    let finalValues = {
      location_name: values?.name,
      location_under: values?.parentLocation,
      location_type: values?.locationType,
      location_address: values?.address,
      mapping_user: values?.userName,
      vendor_loc: values?.isJobworkLocation,
    };
    const data = await imsAxios.post("/location/insertLocation", finalValues);
    if (data.code === 200) {
      getLocations();
    }
  };
  return (
    <Card
      size="small"
      title="Add Location"
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
        initialValues={initialValues}
        layout="vertical"
        form={addLocationForm}
      >
        <Row gutter={6}>
          <Col span={24}>
            <Form.Item label="Location Name" name="name" rules={formRules.name}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Parent Location"
              name="parentLocation"
              rules={formRules.parentLocation}
            >
              <MyAsyncSelect
                // onChange={(value) => setSearchInput(value)}
                // value={searchInput}
                url="/location/fetchLocation"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Location Type"
              name="locationType"
              rules={formRules.locationType}
            >
              <MySelect options={locationTypeOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="User Name"
              name="userName"
              rules={formRules.userName}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Is Jobwork Location?"
              name="isJobworkLocation"
              rules={formRules.isJobworkLocation}
            >
              <MySelect options={booleanSelectOptions} />
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
