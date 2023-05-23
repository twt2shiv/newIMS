"use client";
import { useEffect, useState } from "react";
import { imsAxios } from "app/utils/axiosInterceptor";
import { useParams, useRouter } from "next/navigation";
import { Divider, Form, Modal } from "antd";
import { setLoading } from "/app/store";

// my components
import Header from "./Header";
import BasicDetails from "./BasicDetails";
import TaxDetails from "./TaxDetails";
import AdvanceDetails from "./AdvanceDetails";
import ProductionAndCostingDetails from "./ProductionAndCostingDetails";
import { useDispatch, useSelector } from "react-redux";

// inititalizing form values
let inititalValues = {
  name: "",
  uom: "",
  category: "--",
  mrp: "",
  productType: "",
  costPrice: "",
  isEnabled: "Y",
  description: "",
  taxType: "EXE",
  taxRate: "0",
  hsn: "",
  brand: "",
  ean: "",
  weight: "",
  volumetricWeight: "",
  height: "",
  width: "",
  minStockFG: "",
  minStockRM: "",
  mfgBatchSize: "",
  stockLocation: "",
  labourCost: "",
  secPackingCost: "",
  jwcost: "",
  otherCost: "",
};

export default function EditFinishProduct() {
  const [name, setName] = useState("");
  const [productType, setProductType] = useState(null);
  const { loading } = useSelector((state) => state.imsData);
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // initialize edit product form
  const [editProduct] = Form.useForm();

  // getting product details
  const getDetails = async () => {
    dispatch(setLoading("fetching"));
    const data = await imsAxios.post("/products/getProductForUpdate", {
      product_key: params.slug,
    });
    dispatch(setLoading(false));
    setName(data.data[0].productname);
    let values = data.data[0];
    let finalObj = {
      name: values.productname,
      uom: values.uomid,
      category: values.productcategory,
      mrp: values.mrp,
      productType: values.producttype_name,
      costPrice: values.costprice ?? "",
      isEnabled: values.enablestatus_name,
      description: values.description,
      taxType: values.tax_type_name,
      taxRate: values.gstrate_name,
      hsn: values.hsncode,
      brand: values.brand,
      ean: values.ean,
      weight: values.weight,
      volumetricWeight: values.vweight,
      height: values.height,
      width: values.width,
      minStockFG: values.minstock,
      minStockRM: values.minrmstock,
      mfgBatchSize: values.batchstock,
      stockLocation: values.loc,
      labourCost: values.laboutcost,
      secPackingCost: values.packingcost,
      jwcost: values.jobworkcost,
      otherCost: values.othercost,
    };
    setProductType(values.producttype_name);
    inititalValues = finalObj;
    editProduct.setFieldsValue(finalObj);
  };
  // submit handler
  const submitHandler = async () => {
    const values = await editProduct.validateFields();
    let finalObj = {};
    let link =
      productType === "semi"
        ? "/products/updateSemiProduct"
        : "/products/updateProduct";
    if (productType === "default") {
      finalObj = {
        hsn: values.hsn,
        jobworkcost: values.jwcost,
        labourcost: values.labourCost,
        packingcost: values.secPackingCost,
        othercost: values.otherCost,
        minstock: values.minStockFG,
        batchstock: values.mfgBatchSize,
        category: values.category,
        mrp: values.mrp,
        brand: values.brand,
        ean: values.ean,
        weight: values.weight,
        vweight: values.volumetricWeight,
        height: values.height,
        width: values.width,
        minstockrm: values.minStockRM,
        producttype: values.productType,
        isenabled: values.isEnabled,
        gsttype: values.taxType,
        gstrate: values.taxRate,
        location: values.stockLocation,
        description: values.description,
        uom: values.uom,
        product_name: values.name,
        producttKey: params.slug,
      };
    } else {
      finalObj = {
        p_name: values.name,
        producttKey: params.slug,
        description: values.description,
        uom: values.uom,
        category: values.category,
        mrp: values.mrp,
        producttype: values.productType,
        isenabled: values.isEnabled,
        gsttype: values.taxType,
        gstrate: values.taxRate,
        sac: "--", //Info: sac is not in the form
      };
    }
    dispatch(setLoading("submitting"));
    const data = await imsAxios.post(link, finalObj);
    dispatch(setLoading(false));
    if (data.code === 200) {
      goBack();
    }
  };
  // submit form confirm dialog
  const showSubmitConfirm = () => {
    Modal.confirm({
      title: "Submit Confirm",
      content: (
        <div>
          <p>Are you sure you want to submit this form?</p>
          <p>Press [ESC] to close this dialog</p>
        </div>
      ),
      okText: "Yes",
      cancelText: "No",
      onOk() {
        submitHandler();
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
  // showing reset form confirm dialog
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
        editProduct.setFieldsValue(inititalValues);
      },
    });
  };
  // going back to the previous page
  const goBack = () => {
    router.back();
  };
  useEffect(() => {
    getDetails();
    document.title = "Master | Edit Product";
  }, []);
  return (
    <div style={{ height: "90%" }}>
      <Form form={editProduct} style={{ width: "100%" }} layout="vertical">
        <Header
          name={name}
          showCancelConfirm={showCancelConfirm}
          showResetConfirm={showResetConfirm}
          showSubmitConfirm={showSubmitConfirm}
          loading={loading}
        />
        <Divider />
        <BasicDetails loading={loading} />
        <Divider />
        <TaxDetails loading={loading} />
        <Divider />
        {productType === "default" && (
          <>
            <AdvanceDetails loading={loading} />
            <Divider />
            <ProductionAndCostingDetails loading={loading} />
          </>
        )}
      </Form>
    </div>
  );
}
