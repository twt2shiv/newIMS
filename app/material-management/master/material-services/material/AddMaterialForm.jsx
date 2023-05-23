"use client";
import React, { useEffect, useState } from "react";
import { Card, Col, Form, Input, Row, Space, Button, Modal } from "antd";
import { v4 } from "uuid";
import { simpleInputHandler, validateTableRows } from "/app/utils/tableRows.js";
import { setLoading } from "/app/store";
// my components
import MySelect from "app/components/Select/MySelect/MySelect";
import FormTable from "/app/components/FormTable/FormTable";
import TableActions from "/app/components/TableActions/TableActions";
import { imsAxios } from "app/utils/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";

// requred keys for the form
const formRules = {
  name: [
    {
      required: true,
      message: "Please input the name of the material!",
    },
  ],
  code: [
    {
      required: true,
      message: "Please input a unique part code for the material!",
    },
  ],
  uom: [
    {
      required: true,
      message: "Please select an unit of measurement!",
    },
  ],
  group: [
    {
      required: true,
      message: "Please select a group for the material!",
    },
  ],
  type: [
    {
      required: true,
      message: "Please select a material type!",
    },
  ],
};
// required keys for form table
let hsnTableRequired = ["hsns", "taxs"];
// reset data form and form table
const resetFormData = {
  formData: {
    code: "",
    name: "",
    uom: "",
    group: "",
    type: "C",
    description: "",
  },
  rows: [{ hsn: "", tax: "", id: v4(), error: false }],
};
// hsn and tax percentage row
const materialRow = { hsns: "", taxs: "", id: v4(), error: false };

export default function AddMaterialForm({
  uomOptions,
  groupOptions,
  typeOptions,
  getRows,
}) {
  const [rows, setRows] = useState([materialRow]);
  const [addMaterialForm] = Form.useForm();
  const { loading } = useSelector((state) => state.imsData);
  const dispatch = useDispatch();

  // add and remove rows from hsn and tax tables
  const addRow = () => {
    let arr = rows;
    arr = [...arr, materialRow];
    setRows(arr);
  };
  const removeRow = (id) => {
    let arr = rows;
    arr = arr.filter((row) => row.id !== id);
    setRows(arr);
  };
  // validating the input and showing submit confirm
  const validateHandler = async () => {
    const values = await addMaterialForm.validateFields();
    let arr = rows;

    arr = validateTableRows(arr, hsnTableRequired);
    // appending form values in req body object
    let valuesObj = {
      part: values.code,
      uom: values.uom,
      component: values.name,
      comp_type: values.type,
      c_category: values.group,
      notes: values.description,
    };
    setRows(arr.rows);

    delete arr["rows"];
    let finalObj = {
      ...valuesObj,
      ...arr,
    };
    Modal.confirm({
      title: "Submit Confirm",
      content: (
        <div>
          <p>Are you sure you want create this component?</p>
          <p>Press [ESC] to close this dialog</p>
        </div>
      ),
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: loading === "submitting",
      },
      onOk() {
        submitHandler(finalObj);
      },
    });
  };
  // make the submit request here
  const submitHandler = async (values) => {
    dispatch(setLoading("submitting"));
    const data = await imsAxios.post("/component/addComponent", values);
    if (data.code === 200) {
      getRows();
      resetHandler();
    }
    dispatch(setLoading(false));
    console.log("the form has been submitted with valuies", values);
  };
  // show reset confirm
  const showResetConfirm = () => {
    Modal.confirm({
      title: "Reset Confirm",
      content: (
        <div>
          <p>Are you sure you want to reset this form?</p>
          <p>Press [ESC] to close this dialog</p>
        </div>
      ),
      okText: "Yes",
      cancelText: "No",
      onOk() {
        resetHandler();
      },
    });
  };
  // resetting the form
  const resetHandler = () => {
    addMaterialForm.setFieldsValue(resetFormData.formData);
    setRows(resetFormData.rows);
  };
  // getting hsn and tax table inputs
  const inputHandler = async (name, value, id) => {
    let arr = rows;
    arr = simpleInputHandler(arr, name, value, id);
    setRows(arr);
  };
  //hsn and tax table columns
  const columns = [
    {
      headerName: <TableActions action="addRow" onClick={addRow} />,
      renderCell: ({ row }) =>
        rows.length > 1 && (
          <TableActions onClick={() => removeRow(row.id)} action="removeRow" />
        ),
      type: "action",
      width: 50,
    },
    {
      headerName: "HSN / SAC Code",
      renderCell: ({ row }) => (
        <Input
          value={row.hsn}
          onChange={(e) => inputHandler("hsns", e.target.value, row.id)}
        />
      ),
    },
    {
      headerName: "Tax Rate",
      renderCell: ({ row }) => (
        <Input
          value={row.tax}
          onChange={(e) => inputHandler("taxs", e.target.value, row.id)}
          suffix="%"
        />
      ),
    },
  ];
  useEffect(() => {
    addMaterialForm.setFieldsValue(resetFormData.formData);
  }, []);
  return (
    <Row gutter={[0, 4]}>
      <Col span={24}>
        <Card
          size="small"
          title="Add new material component"
          extra={
            <Space>
              <Button onClick={showResetConfirm}>Reset</Button>
              <Button
                loading={loading === "submitting"}
                onClick={validateHandler}
                type="primary"
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Form form={addMaterialForm} layout="vertical">
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
              <Col span={12}>
                <Form.Item label="Group" name="group" rules={formRules.group}>
                  <MySelect options={groupOptions} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Type" name="type" rules={formRules.type}>
                  <MySelect options={typeOptions} />
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
      <Col span={24}>
        <Card size="small">
          <FormTable columns={columns} data={rows} />
        </Card>
      </Col>
    </Row>
  );
}
