import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Spinner({ size }) {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: size === "small" ? 24 : 35,
      }}
      spin
    />
  );
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        background: "#ffffff60",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
}
