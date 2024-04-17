import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { ProductRegisterForm } from './register.product.form';
import { ProductRegisterTable } from './product.register.table';
import { ProductController } from '../../../../controller/product/products.controller';

export const ProductRegisterScreen = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Row gutter={[0, 30]}>
      <Col span={24}>
        <ProductRegisterForm />
      </Col>
      <Col span={22}>
        <ProductRegisterTable loading={false} valuesTable={values} />
      </Col>
    </Row>
  );

  async function getProduct() {
    const request = await ProductController.get();

    const data = request.data;

    if (data) {
      setValues(data);
    }
  }
};
