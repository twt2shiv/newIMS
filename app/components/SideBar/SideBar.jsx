"use client";
import "./SideBar.module.css";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import items from "./menuItems";

export default function SideBar() {
  return (
    <Sider
      style={{
        // background: "rgb(195, 229, 228)",
        border: "none",
        background: "white",
        height: "100%",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        width: 60,
      }}
      collapsedWidth={60}
      collapsible
      trigger={null}
      collapsed={true}
      width={100}
    >
      <div
        style={{
          // height: 40,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
          marginBottom: 20,
        }}
      >
        <img src="/Icons/Header/Logo.svg" />
      </div>
      <Menu
        forceSubMenuRender
        mode="vertical"
        triggerSubMenuAction="click"
        style={{
          height: "100%",
          // background: "#F7F9FE",
          padding: 0,
          width: 60,
          border: "none",
        }}
        items={items}
      />
    </Sider>
  );
}
