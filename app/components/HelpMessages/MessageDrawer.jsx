import { Alert, Col, Drawer, Row } from "antd";
import { useSelector } from "react-redux";

function MessageDrawer({ open, setOpen }) {
  const { helpInfo, helpWarning } = useSelector((state) => state.imsData);
  return (
    <Drawer
      title="Help"
      placement="right"
      onClose={() => setOpen(false)}
      open={open}
    >
      <Row gutter={[0, 6]}>
        <Col span={24}>
          {helpInfo && <Alert message={helpInfo} type="info" showIcon />}
        </Col>
        <Col span={24}>
          {helpWarning && <Alert message={helpWarning} type="error" showIcon />}
        </Col>
      </Row>
    </Drawer>
  );
}

export default MessageDrawer;
