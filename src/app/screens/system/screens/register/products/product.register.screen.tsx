import React from 'react';
import { Col, Row } from 'antd';
import { ProductRegisterForm } from './register.product.form';

export const ProductRegisterScreen = () => {
  return (
    <Row gutter={[0, 30]}>
      <Col span={24}>
        <ProductRegisterForm />
      </Col>
    </Row>
  );
};
