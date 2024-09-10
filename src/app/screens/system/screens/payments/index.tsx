import React from 'react';
import { Col, Row } from 'antd';
import { PaymentScreen } from './payment.screen';

export const Payments = () => {
  return (
    <Row>
      <Col>
        <PaymentScreen />
      </Col>
    </Row>
  );
};
