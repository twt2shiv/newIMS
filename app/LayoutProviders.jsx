"use client";
import { useState } from "react";
import { Col, ConfigProvider, Layout, Row, Space, Button } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import UserMenu from "./components/Header/UserMenu/UserMenu";
import SideBar from "./components/SideBar/SideBar";
import Icon from "@ant-design/icons";
import NotificationIcon from "public/Icons/Header/NotificationIcon";
import FavouriteIcon from "public/Icons/Header/FavouriteIcon";
import LiveStatusToggle from "./components/Header/LiveStatusToggle";
import SearchIcon from "public/Icons/Header/SearchIcon";
import PageTitle from "./components/Header/PageTitle";
import { FunnelPlotOutlined, QuestionOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { setCompanyBranch, setLoading, setCurrentSession } from "/app/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { imsAxios } from "./utils/axiosInterceptor";
import MySelect from "./components/Select/MySelect/MySelect";
import {
  branchOptions,
  sessionOptions,
} from "../public/staticData/headerSelectOptions";
// my components
import MessageDrawer from "./components/HelpMessages/MessageDrawer";

export function LayoutProviders({ children }) {
  const [showHelpInfo, setShowHelpInfo] = useState(false);
  const {
    showFilterToggle,
    user,
    companyBranch,
    currentSession,
    helpInfo,
    helpWarning,
  } = useSelector((state) => state.imsData);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  imsAxios.interceptors.request.use(
    (request) => {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, [60000]);
      return request;
    },
    (error) => {
      console.log("Can not connect to backend", error);
    }
  );

  useEffect(() => {
    if (!user) {
      router.replace("/user/login");
    }
  }, [user, pathname]);
  useEffect(() => {
    imsAxios.defaults.headers["x-csrf-token"] = user?.token;
    imsAxios.defaults.headers["Company-Branch"] = companyBranch;
    imsAxios.defaults.headers["Session"] = currentSession;
  }, [user, currentSession, companyBranch]);
  useEffect(() => {
    if (user) {
    } else {
      router.replace("/user/login");
    }
  }, []);
  // setting user when page reload
  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(user) ?? null);
  }, [user]);
  // setting current session when page reload
  useEffect(() => {
    const existingData = JSON.parse(
      localStorage && localStorage?.getItem("otherData")
        ? localStorage?.getItem("otherData")
        : "{}"
    );
    let obj = {
      ...existingData,
      currentSession: currentSession,
    };
    localStorage && localStorage?.setItem("otherData", JSON.stringify(obj));
  }, [currentSession]);
  // setting company branch when page reload
  useEffect(() => {
    const existingData = JSON.parse(
      localStorage && localStorage?.getItem("otherData")
        ? localStorage?.getItem("otherData")
        : "{}"
    );
    let obj = {
      ...existingData,
      companyBranch: companyBranch,
    };
    localStorage && localStorage?.setItem("otherData", JSON.stringify(obj));
  }, [companyBranch]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#04B0A8",
            borderRadius: 4,
            // margin: 0,
            // padding: 0,
          },
        }}
      >
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
          {user && <SideBar />}
          <Layout style={{ height: "100%" }}>
            {user && (
              <Header
                className="header"
                style={{
                  padding: "0 10px",
                  height: "40px",
                  background: "#F7F9FE",
                  zIndex: 1,
                  lineHeight: "auto",
                }}
              >
                <Row justify="space-between" style={{ height: 50, padding: 0 }}>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      margin: 0,
                    }}
                  >
                    {/* <Image
              onClick={handleSideBarOpen}
              height={35}
              width={35}
              src={hamburger}
              style={{ marginRight: 40 }}
            /> */}
                    <Space align="middle" size="large">
                      <div
                        style={{
                          height: "100%",
                          width: 200,
                          // background: "green",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MySelect
                          onChange={(value) =>
                            dispatch(setCompanyBranch(value))
                          }
                          bordered={false}
                          value={companyBranch}
                          borderLess={true}
                          options={branchOptions}
                        />
                      </div>
                      <div
                        style={{
                          height: "100%",
                          width: 200,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MySelect
                          onChange={(value) =>
                            dispatch(setCurrentSession(value))
                          }
                          value={currentSession}
                          borderLess={true}
                          options={sessionOptions}
                        />
                      </div>
                    </Space>
                  </Col>
                  <Col
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PageTitle />
                  </Col>
                  <Col
                    align="middle"
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Space
                      align="center"
                      size="large"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Icon component={SearchIcon} />
                      </div>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <LiveStatusToggle />
                      </div>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Icon component={FavouriteIcon} />
                      </div>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Icon component={NotificationIcon} />
                      </div>
                      <UserMenu />
                    </Space>
                  </Col>
                </Row>
              </Header>
            )}
            <Content style={{ height: "100%" }}>
              <Layout style={{ height: "100%" }}>
                <Content
                  style={{
                    padding: user && "0 10px",
                    paddingRight: user && 50,
                    // height: "100%",
                    background: "#F7F9FE",
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingBottom: user && 50,
                  }}
                >
                  {children}
                </Content>
              </Layout>
            </Content>
          </Layout>
        </Layout>
        <div
          style={{
            position: "fixed",
            top: "11%",
            right: 5,
            display: "flex",
            height: 100,
            gap: 10,
            flexDirection: "column",
          }}
        >
          {showFilterToggle && (
            <Button
              size="large"
              shape="circle"
              type="primary"
              icon={<FunnelPlotOutlined />}
            />
          )}
          {(helpInfo || helpWarning) && (
            <Button
              onClick={() => setShowHelpInfo(true)}
              size="large"
              shape="circle"
              type="primary"
              icon={<QuestionOutlined />}
            />
          )}

          {/* {showHelpButton &&} */}
          {/* <FloatButton
            trigger="click"
            type="primary"
            style={{
              right: 5,
              top: "15%",
            }}
            icon={<QuestionOutlined />}
          /> */}
        </div>
        <MessageDrawer open={showHelpInfo} setOpen={setShowHelpInfo} />
      </ConfigProvider>
    </>
  );
}
