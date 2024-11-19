import { Col, Row } from "antd";
import { LogForm } from "./log.form";

export const LogScreen = () => {
  return (
    <Row className="mt-5">
      <Col span={22} className="text-center">
        <h3>
          <strong>Logs</strong>
        </h3>
      </Col>
      <Col span={22}>
        <LogForm />
      </Col>
    </Row>
  );
};
