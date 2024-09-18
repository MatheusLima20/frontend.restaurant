import { Col, Row } from 'antd';

type Props = {
  style: any;
};

export const HomeMobileScreen = (props: Props) => {
  return (
    <Row style={props.style}>
      <Col span={24}>Home</Col>
    </Row>
  );
};
