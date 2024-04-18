import { Col, Row } from 'antd';
import React from 'react';
import { SellOrderAddTableScreen } from './sell.order.add.table';

export const SellOrderScreen = () => {
  return (
    <Row className="mt-5">
      <Col span={24} className="text-center">
        <h2>
          <strong>Pedidos</strong>
        </h2>
      </Col>
      <Col span={24}>
        <SellOrderAddTableScreen />
      </Col>
    </Row>
  );
};
