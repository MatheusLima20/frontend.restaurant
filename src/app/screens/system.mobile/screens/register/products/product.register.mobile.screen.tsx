import { Col, Row } from 'antd';
import { ProductMobileRegisterForm } from './product.mobile.register.form';

export const ProductRegisterMobileScreen = () => {
  return (
    <Row gutter={[0, 30]}>
      <Col span={24}>
        <ProductMobileRegisterForm />
      </Col>
    </Row>
  );
};
