import React from 'react';
import { Col, Row } from 'antd';
import { PaymentsForm } from './payment.form';

export const PaymentScreen = () => {
  return (
    <Row>
      <Col>
        <PaymentsForm />
      </Col>
    </Row>
  );
};
