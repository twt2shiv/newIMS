import { Tooltip, Typography } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ToolTipEllipses({ text, type, copy, linkUrl }) {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  return (
    <Tooltip
      overlayStyle={{ fontSize: "0.7rem" }}
      placement="topLeft"
      title={text}
      color="#365958"
    >
      {type == "Paragraph" ? (
        <Typography.Text ellipsis={{ width: "100%" }}> {text} </Typography.Text>
      ) : (
        <Typography.Text
          copyable={copy && { tooltips: false }}
          style={{
            fontSize: windowWidth < 1600 ? "0.7rem" : "0.8rem",
            width: "100%",
          }}
          ellipsis={{ width: "100%" }}
        >
          {linkUrl && <Link href={linkUrl}>{text}</Link>}
          {!linkUrl && text}
        </Typography.Text>
      )}
    </Tooltip>
  );
}
