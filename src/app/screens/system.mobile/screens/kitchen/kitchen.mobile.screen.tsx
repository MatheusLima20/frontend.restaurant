import React from 'react';
import { Col, Row } from 'antd';
import { GiHotMeal } from 'react-icons/gi';
import { KitchenMobileCards } from './kitchen.mobile.cards';

export const KitchenMobileScreen = () => {
  return (
    <Row gutter={[0, 50]}>
      <Col
        span={24}
        className="text-start"
        style={{ backgroundColor: 'red', height: 50 }}
      >
        <h2 className="mt-2 ms-3 ">
          <GiHotMeal className="text-white " size={35} />{' '}
          <strong className="text-white ">Pedidos</strong>
        </h2>
      </Col>
      <Col span={24}>
        <KitchenMobileCards />
      </Col>
    </Row>
  );
};
