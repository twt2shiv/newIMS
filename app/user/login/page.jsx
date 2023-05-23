"use client";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import Image from "next/image";
import styles from "./login.module.css";
// import Logo from "@/public/Icons/Header/Logo";
import { useEffect, useState } from "react";
import { imsAxios } from "app/utils/axiosInterceptor";
import { setUser } from "/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

function page() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useSelector((state) => state.imsData);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const submitHandler = async (values) => {
    const response = await imsAxios.post("/auth/signin", {
      username: values.email,
      password: values.password,
    });
    const data = response;
    if (data) {
      if (data.code === 200) {
        dispatch(setUser(data.data));
        router.push("/material-management/master/uom");
      } else {
        setErrorMessage(data.message);
      }
    }
  };
  useEffect(() => {
    if (user) {
      router.replace("/material-management/master/uom");
    } else {
      router.replace("/user/login");
    }
  }, [user, pathname]);
  useEffect(() => {
    if (user) {
      router.replace("/material-management/master/uom");
    } else {
      console.log("it is here");
      router.replace("/user/login");
    }
  }, []);
  return (
    <div className={styles.container}>
      <Row style={{ height: "100%" }} align="space-between" justify="center">
        <Col
          span={24}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Image height={150} width={150} src="/Icons/Header/Logo.svg" />
          <Typography.Title level={4}>
            Stay Tuned With Updated Stocks!
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Row justify="center">
            <Form
              onFinish={submitHandler}
              size="large"
              style={{ width: "30%" }}
              layout="vertical"
            >
              <Col span={24} offset={-12}>
                <Form.Item
                  label="E-mail / Mobile No. / Employee Id"
                  name="email"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Password" name="password">
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button htmlType="submit" block type="primary">
                  Log In
                </Button>
              </Col>
              <Col style={{ marginTop: 15 }} span={24}>
                <Typography.Text style={{ color: "#ff0000" }}>
                  {errorMessage}
                </Typography.Text>
              </Col>
            </Form>
          </Row>
        </Col>
        <Col span={24}>
          <Row
            style={{ height: "100%", alignItems: "flex-end" }}
            justify="center"
          >
            <Typography.Text>
              IMS from 2019 - 2022. All Rights reserved | Performance & security
              by
              <a style={{ marginLeft: 5 }} href="https://www.mscorpres.com">
                MSCorpres Automation Pvt. Ltd.
              </a>
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default page;
