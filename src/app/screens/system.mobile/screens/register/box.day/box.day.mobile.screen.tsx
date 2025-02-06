import { Col, Row } from "antd";
import { BoxDayMobileForm } from "./box.day.mobile.form";

export const BoxDayMobileScreen = () => {
  return (
    <Row justify="center">
      <Col span={23}>
        <BoxDayMobileForm />
      </Col>
    </Row>
  );
};
