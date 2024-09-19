import { PlatformRegistrationForm } from "./platform.registration.form";
import { Col, Row } from "antd";

export const PlatformRegistrationScreen = () => {
  return (
    <Row justify={"center"}>
      <Col span={23}>
        <Row justify="center" className="mt-5 mb-5">
          <Col>
            <h2>
              <strong>Cadastro</strong>
            </h2>
          </Col>
        </Row>

        <Row>
          <Col span={24} className="mb-5">
            <PlatformRegistrationForm />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
