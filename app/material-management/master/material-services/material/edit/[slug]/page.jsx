"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Divider, Form, Modal, Row } from "antd";
import { imsAxios } from "app/utils/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "/app/store";
// my components
import Header from "./Header";
import BasicDetails from "./BasicDetails";
import TaxDetails from "./TaxDetails";
import AdvanceDetails from "./AdvanceDetails";
import ProductionAndCostingDetails from "./ProductionAndCostingDetails";

export default function EditMaterialComponent() {
  const [partCode, setPartCode] = useState("");
  const [editMaterialForm] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  let resetData = {};
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.imsData);
  // get dynamic params from url in nextjs
  const getDetails = async () => {
    dispatch(setLoading("fetching"));
    const data = await imsAxios.post("/component/fetchUpdateComponent", {
      componentKey: params.slug,
    });
    dispatch(setLoading(false));
    let materialData = data.data[0];
    let finalObj = {
      code: materialData.partcode,
      name: materialData.name,
      uom: materialData.uomname,
      mrp: materialData.mrp,
      group: materialData.groupid,
      isEnabled: materialData.enable_status,
      jobWorkRate: materialData.jobwork_rate,
      qcStatus: materialData.qc_status,
      description: materialData.description,
      taxType: materialData.tax_type === "" ? "L" : materialData.tax_type,
      taxRate: materialData.tax_rate ?? "5",
      brand: materialData.brand,
      ean: materialData.ean,
      weight: materialData.weight,
      volumetricWeight: materialData.veight,
      height: materialData.height,
      width: materialData.width,
      minStock: materialData.minqty,
      maxStock: materialData.maxqty,
      minOrder: materialData.minorderqty,
      leadTime: materialData.leadtime,
      enableAlert: materialData.alert_status,
      purchaseCost: materialData.pocost,
      otherCost: materialData.othercost,
    };
    editMaterialForm.setFieldsValue(finalObj);
    resetData = finalObj;
    setPartCode(materialData.partcode);
  };
  // show submit confirm dialog
  const showSubmitConfirm = async () => {
    const values = await editMaterialForm.validateFields();
    Modal.confirm({
      title: "Submit Confirm",
      content: (
        <div>
          <p>Are you sure you want update this component?</p>
          <p>Press [ESC] to close this dialog</p>
        </div>
      ),
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
  // show cancel form updation confirm dialog
  const showCancelConfirm = () => {
    Modal.confirm({
      title: "Cancel Confirm",
      content: (
        <div>
          <p>Are you sure you want to cancel this form?</p>
          <p>Press [ESC] to close this dialog</p>
        </div>
      ),
      okText: "Yes",
      cancelText: "No",
      onOk() {
        goBack();
      },
    });
  };
  // submit handler
  const submitHandler = async (values) => {
    // TODO add submit handler here
    const finalObj = {
      componentKey: params.slug,
      componentname: values.name,
      uom: values.uom,
      mrn: values.mrp,
      group: values.group,
      enable_status: values.isEnabled,
      jobwork_rate: values.jobWorkRate,
      qc_status: values.qcStatus,
      description: values.description,
      taxtype: values.taxType,
      taxrate: values.taxRate,
      brand: values.brand,
      ean: values.ean,
      weightgms: values.weight,
      vweightgms: values.volumetricWeight,
      height: values.height,
      width: values.width,
      minqty: values.minStock,
      maxqty: values.maxStock,
      minorder: values.minOrder,
      leadtime: values.leadTime,
      alert: values.enableAlert,
      pocost: values.purchaseCost,
      othercost: values.otherCost,
      category: "--",
    };
    dispatch(setLoading("submitting"));
    const data = await imsAxios.post("/component/updateComponent", finalObj);
    if (data.code === 200) {
      goBack();
    }
    dispatch(setLoading(false));
  };
  // reset handler
  const resetHandler = () => {
    editMaterialForm.setFieldsValue(resetData);
  };
  // going back to the previous page
  const goBack = () => {
    router.back();
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Row align="top" style={{ height: "95%" }}>
      <Form form={editMaterialForm} style={{ width: "100%" }} layout="vertical">
        <Header
          loading={loading === "submitting"}
          partCode={partCode}
          showCancelConfirm={showCancelConfirm}
          showSubmitConfirm={showSubmitConfirm}
          showResetConfirm={showResetConfirm}
        />
        <Divider />
        <BasicDetails loading={loading} />
        <Divider />
        <TaxDetails loading={loading} />
        <Divider />
        <AdvanceDetails loading={loading} />
        <Divider />
        <ProductionAndCostingDetails loading={loading} />
      </Form>
    </Row>
  );
}
