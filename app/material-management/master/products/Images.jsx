"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  Row,
  Typography,
  Popconfirm,
  Skeleton,
} from "antd";
import { imsAxios } from "app/utils/axiosInterceptor";
import { DeleteOutlined } from "@ant-design/icons";
import { setLoading } from "/app/store";
import { useDispatch, useSelector } from "react-redux";

export default function Images({ product, refreshImages, setRefreshImages }) {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.imsData);
  //   getting images
  const getImages = async () => {
    setImages([]);
    dispatch(setLoading("fetching"));
    const data = await imsAxios.post("/products/fetchImageProduct", {
      product: product.productKey,
    });
    dispatch(setLoading(false));
    if (data.code === 200) {
      setImages(data.data);
    }
  };
  //   delete image handler
  const deleteImage = async (imageId) => {
    dispatch(setLoading(imageId));
    await imsAxios.post("/products/ProductDelete", {
      product: product.productKey,
      image: imageId,
    });
    dispatch(setLoading(false));
    getImages();
  };
  useEffect(() => {
    getImages();
  }, [product]);
  useEffect(() => {
    if (refreshImages) {
      getImages();
      setRefreshImages(false);
    }
  }, [refreshImages]);
  return (
    <Card
      size="small"
      title={product.productName}
      extra={"SKU: " + product.productSku}
      bodyStyle={{ height: "100%", maxHeight: "80vh", overflowY: "scroll" }}
      style={{ height: "100%" }}
    >
      {/* image list area */}
      <Row gutter={[0, 6]} justify="center">
        {images.length === 0 && loading !== "fetching" && (
          <Typography.Title level={5}>No Images found...</Typography.Title>
        )}
        {/* loading images */}
        <Col span={24}>
          {loading === "fetching" && (
            <>
              <Row justify="center">
                <Skeleton.Image size="large" active />
              </Row>
              <Row justify="center">
                <Skeleton.Image size="large" active />
              </Row>
              <Row justify="center">
                <Skeleton.Image size="large" active />
              </Row>
              <Row justify="center">
                <Skeleton.Image size="large" active />
              </Row>
            </>
          )}

          {images.length > 0 && (
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              {loading !== "fetching" && (
                <Row gutter={[0, 6]}>
                  {images.map((image, index) => (
                    <Col span={24}>
                      <Card size="small">
                        <Image
                          key={index}
                          width="95%"
                          src={image.image_url}
                          style={{ borderRadius: 8 }}
                        />
                        <Row style={{ marginTop: 5 }}>
                          <Col
                            span={24}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography.Text
                              style={{ textAlign: "center" }}
                              strong
                            >
                              {image.image_name}
                            </Typography.Text>
                          </Col>
                          <Col span={24}>
                            <Typography.Text strong>
                              Uploaded By :{" "}
                            </Typography.Text>
                            <Typography.Text>
                              {image.uploaded_by}
                            </Typography.Text>
                          </Col>
                          <Col span={24}>
                            <Row justify="space-between">
                              <Col>
                                <Typography.Text strong>
                                  Uploading Date :{" "}
                                </Typography.Text>
                                <Typography.Text>
                                  {image.uploaded_date}
                                </Typography.Text>
                              </Col>
                              <Col>
                                <Popconfirm
                                  title="Are you sure to delete this image"
                                  okText="Yes"
                                  cancelText="No"
                                  //   loading={image.image_id === deleteLoading}
                                  onConfirm={() => deleteImage(image.image_id)}
                                >
                                  <Button
                                    //   style={{ position: "absolute", right: 10, top: 10 }}
                                    type="primary"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                  />
                                </Popconfirm>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Image.PreviewGroup>
          )}
        </Col>
      </Row>
    </Card>
  );
}
