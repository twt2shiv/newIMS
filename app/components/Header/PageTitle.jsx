import { Typography } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function PageTitle() {
  const { pageTittle } = useSelector((state) => state.imsData);
  useEffect(() => {
    const existingData = JSON.parse(
      localStorage && localStorage?.getItem("otherData")
        ? localStorage?.getItem("otherData")
        : "{}"
    );
    let obj = {
      ...existingData,
      pageTittle: pageTittle,
    };
    localStorage && localStorage?.setItem("otherData", JSON.stringify(obj));
  }, [pageTittle]);
  return (
    <Typography.Text style={{ color: "#365958", margin: 0, fontSize: 18 }}>
      {pageTittle ?? ""}
    </Typography.Text>
  );
}

export default PageTitle;
