import { Card, Tree } from "antd";
import React from "react";
// my components
import Spinner from "app/components/Spinner/Spinner";

export default function LocationTree({ treeData, loading }) {
  return (
    <Card
      style={{ height: "92vh", overflowY: "hidden" }}
      bodyStyle={{ minheight: "92vh", maxHeight: "88vh", overflowY: "scroll" }}
      title="Locations"
      size="small"
    >
      {loading === "fetching" && <Spinner />}
      <Tree
        showLine={true}
        // style={{ overflowY: "scroll" }}
        // height="100%"
        treeData={treeData}
      />
    </Card>
  );
}
