import { Col, Row } from 'antd';
import { SpendingRegisterForm } from './spending.product.form';

export const SpendingRegisterScreen = () => {
  return (
    <Row gutter={[0, 30]}>
      <Col span={24}>
        <SpendingRegisterForm />
      </Col>
    </Row>
  );
};
