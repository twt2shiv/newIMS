"use client";
import { Menu, Row, Tooltip } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import internalLinks from "../../../public/staticData/internalLinks";
import { setPageTittle, setHelpMessage, setShowFilterToggle } from "/app/store";
import { useDispatch } from "react-redux";

function InternalNav() {
  const [linksList, setLinksList] = useState([]);
  const [current, setCurrent] = useState("");
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    let key =
      linksList &&
      linksList
        ?.filter((link) => link.routePath == pathname)[0]
        ?.key.toString();
    setCurrent(key);
  }, [linksList]);
  useEffect(() => {
    let currentLink = {};
    let arr = [];
    let title = "";
    let helpInfo = "";
    let helpWarning = "";
    internalLinks.map((group) => {
      let matched = false;
      if (group.filter((link) => link.routePath == pathname)[0]) {
        arr = group;
      }
      currentLink = arr.filter((link) => link.routePath == pathname)[0];
    });
    // setting help message and help warning in the global state
    // if (currentLink?.help) {
    helpInfo = currentLink?.help?.info;
    helpWarning = currentLink?.help?.warning;
    dispatch(setHelpMessage({ info: helpInfo, warning: helpWarning }));
    // } else {
    //   dispatch(setHelpMessage({ info: null, warning: null }));
    // }
    arr = arr?.map((link, index) => {
      if (link.pageTittle) {
        title = link.pageTittle;
      }
      return {
        ...link,
        key: index,
      };
    });
    // show filter toggle button
    if (currentLink?.showFilter) {
      dispatch(setShowFilterToggle(true));
    } else {
      dispatch(setShowFilterToggle(false));
    }
    // setting the page title
    setLinksList(arr);
    dispatch(setPageTittle(title));
    const existingData = JSON.parse(
      localStorage && localStorage?.getItem("otherData")
        ? localStorage?.getItem("otherData")
        : "{}"
    );
    let obj = {
      ...existingData,
      pageTittle: title,
    };
    localStorage && localStorage?.setItem("otherData", JSON.stringify(obj));
    // console.log(arr);
  }, [pathname]);
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Row style={{ width: "100%" }}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        size="small"
        mode="horizontal"
        style={{
          marginBottom: 5,
          width: "100%",
          color: "#4d4d4d",
          background: "#F7F9FE",
        }}
        items={
          linksList &&
          linksList?.map((link, index) => ({
            key: link.key.toString(),
            label: (
              <Tooltip
                placement="bottomLeft"
                overlayStyle={{ fontSize: "0.7rem", color: "white" }}
                color="#245181"
                title={link.placeholder && link.placeholder}
              >
                <Link href={link.routePath ?? "/"}>
                  <span>{link.routeName}</span>
                  <span style={{ marginLeft: 5 }}>
                    {pathname == link.routePath && link.placeholder}
                  </span>
                </Link>
              </Tooltip>
            ),
          }))
        }
      />
    </Row>
  );
}

export default InternalNav;
