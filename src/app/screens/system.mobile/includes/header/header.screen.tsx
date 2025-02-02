import { Col, Row } from "antd";
import { Images } from "../../../../config/images";
import { MenuMobile } from "./menu";



export const HeaderMobileScreen = () => {
  return (
    <Row justify={"space-between"} align={"middle"}>
      <Col>
        <img
          src={Images.logo}
          width={40}
        />
      </Col>
      <Col className="mt-3">
        <MenuMobile />
      </Col>
    </Row>
  );
};
