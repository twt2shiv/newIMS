import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { downloadCSV } from "/app/utils/CSVDownload";

export default function DownloadButton({ rows, columns, name, type }) {
  const handleDownloadingExcelRows = () => {
    if (type === "standard") {
      downloadCSV(rows, columns, name);
    }
  };
  return (
    <Button
      size="large"
      style={{ position: "fixed", bottom: 15, right: 10, zIndex: 9 }}
      shape="circle"
      type="primary"
      onClick={handleDownloadingExcelRows}
      icon={<DownloadOutlined />}
    />
  );
}
