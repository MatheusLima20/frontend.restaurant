import { Col, Row } from 'antd';
import { ProductMobileRegisterForm } from './product.mobile.register.form';

export const ProductRegisterMobileScreen = () => {
  return (
    <Row justify={'center'} gutter={[0, 30]}>
      <Col span={22}>
        <ProductMobileRegisterForm />
      </Col>
    </Row>
  );
};
