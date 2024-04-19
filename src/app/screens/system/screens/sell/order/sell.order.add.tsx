import { Col, Row } from 'antd';
import React from 'react';
import { GiHotMeal } from 'react-icons/gi';

export const SellOrderAdd = () => {
  return (
    <Row justify={'center'}>
      <Col>
        <GiHotMeal size={90} />
      </Col>
      <Col className="text-center mb-" span={24}>
        <strong>Pedidos</strong>
      </Col>
      <Col span={22}>
        <p>Arroz Branco</p>
        <p>Baião</p>
        <p>Peixe a Delicia</p>
      </Col>
    </Row>
  );
};
