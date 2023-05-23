"use client";
import React from "react";
import {
  CloudUploadOutlined,
  EditFilled,
  PlusOutlined,
  EyeFilled,
  PrinterFilled,
  CloseOutlined,
  DownloadOutlined,
  CloudDownloadOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  DeleteFilled,
  SyncOutlined,
  CheckOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Button, Tooltip } from "antd";
import PrintIcon from "public/Icons/TableIcons/PrintIcon";
import DownloadIcon from "public/Icons/TableIcons/DownloadIcon";
import CrossIcon from "public/Icons/TableIcons/CrossIcon";
import EditWhiteIcon from "public/Icons/Others/EditWhiteIcon";
import CrossWhiteIcon from "public/Icons/Others/CrossWhiteIcon";
import PrintWhiteIcon from "public/Icons/Others/PrintWhiteIcon";
import DownloadWhiteIcon from "public/Icons/Others/DownloadWhiteIcon";
import UploadWhiteIcon from "public/Icons/Others/UploadWhiteIcon";
import AddRow from "public/Icons/TableIcons/AddRow";
import RemoveRow from "public/Icons/TableIcons/RemoveRow";
import EditIcon from "public/Icons/TableIcons/EditIcon";

export default function TableActions({ disabled, onClick, action, label }) {
  const MyIcon = () => {
    if (action === "add") {
      return (
        <PlusOutlined className={`action-icon ${disabled && "disable"}`} />
      );
    } else if (action === "view") {
      return <EyeFilled className={`action-icon ${disabled && "disable"}`} />;
    } else if (action === "download") {
      return (
        <Icon
          component={DownloadIcon}
          className={`action-icon ${disabled && "disable"}`}
        />
      );
    } else if (action === "print") {
      return (
        <Icon
          component={PrintIcon}
          className={`action-icon ${disabled && "disable"}`}
        />
      );
    } else if (action === "cancel") {
      return (
        <Icon
          component={CrossIcon}
          className={`action-icon ${disabled && "disable"}`}
        />
      );
    } else if (action === "upload") {
      return (
        <CloudUploadOutlined
          className={`action-icon ${disabled && "disable"}`}
        />
      );
    } else if (action === "edit") {
      return (
        <EditIcon
          disabled={disabled}
          className={`action-icon ${disabled && "disable"}`}
        />
      );
    } else if (action === "delete") {
      return (
        <DeleteFilled
          onClick={() => onClick}
          className={`action-icon ${disabled && "disable"}`}
        />
      );
    } else if (action === "addRow") {
      return (
        <Icon
          component={AddRow}
          className={`view-icon ${disabled && "disable"}`}
        />
      );
    } else if (action === "removeRow") {
      return (
        <Icon
          component={RemoveRow}
          className={`view-icon ${disabled && "disable"}`}
        />
      );
    }
  };
  return (
    <GridActionsCellItem
      icon={
        <Tooltip title={label}>
          <MyIcon />
        </Tooltip>
      }
      disabled={disabled}
      onClick={onClick}
      // label="Add"
    />
  );
}
export function CommonIcons({ action, onClick, disabled, loading, size }) {
  const Icon = () => {
    if (action === "addRow") {
      return (
        <Icon
          component={AddRow}
          className={`view-icon ${disabled && "disable"}`}
        />
      );
    } else if (action === "removeRow") {
      return (
        <MinusSquareOutlined
          onClick={onClick}
          style={{
            cursor: "pointer",
            fontSize: "1.2rem",
            justifySelf: "center",
          }}
        />
      );
    } else if (action === "downloadButton") {
      return (
        <Button
          size={size ?? "default"}
          type="primary"
          onClick={onClick}
          // shape="round"
          icon={<DownloadWhiteIcon />}
          disabled={disabled}
          loading={loading}
        />
      );
    } else if (action === "printButton") {
      return (
        <Button
          size={size ?? "default"}
          type="primary"
          onClick={onClick}
          // shape="round"
          icon={<PrintWhiteIcon />}
          disabled={disabled}
          loading={loading}
        />
      );
    } else if (action === "addButton") {
      return (
        <Button
          size={size ?? "default"}
          type="primary"
          onClick={onClick}
          // shape="round"
          icon={<PlusOutlined />}
          disabled={disabled}
          loading={loading}
        />
      );
    } else if (action === "refreshButton") {
      return (
        <Button
          size={size ?? "default"}
          type="primary"
          onClick={onClick}
          // shape="round"
          icon={<SyncOutlined />}
          disabled={disabled}
          loading={loading}
        />
      );
    } else if (action === "checkButton") {
      // console.log(size);
      return (
        <Button
          size={size}
          type="primary"
          onClick={onClick}
          // shape="round"
          icon={<CheckOutlined />}
          disabled={disabled}
          loading={loading}
        />
      );
    } else if (action === "closeButton") {
      // console.log(size);
      return (
        <Button
          size={size}
          type="primary"
          onClick={onClick}
          // shape="round"
          icon={<CrossWhiteIcon />}
          disabled={disabled}
          loading={loading}
        />
      );
    } else if (action === "searchButton") {
      // console.log(size);
      return (
        <Button
          size={size}
          type="primary"
          onClick={onClick}
          // shape="round"
          icon={<SearchOutlined />}
          disabled={disabled}
          loading={loading}
        />
      );
    } else if (action === "editButton") {
      // console.log(size);
      return (
        <Button
          size={size}
          type="primary"
          onClick={onClick}
          icon={<EditWhiteIcon />}
          disabled={disabled}
          loading={loading}
        />
      );
    } else if (action === "uploadButton") {
      // console.log(size);
      return (
        <Button
          size={size}
          type="primary"
          onClick={onClick}
          icon={<UploadWhiteIcon />}
          disabled={disabled}
          loading={loading}
        />
      );
    }
  };

  return <Icon />;
  // includes
  // addRow icon
  // removeRow icon
  // download csv button
}
