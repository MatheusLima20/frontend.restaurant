import { Col, Row } from 'antd';
import React from 'react';
import { SellOrderAddTableScreen } from './sell.order.add.table.mobile';
import { MdTableBar } from 'react-icons/md';

export const SellOrderScreenMobile = () => {
  return (
    <Row gutter={[0, 40]} justify={'center'}>
      <Col
        span={24}
        className="text-start"
        style={{ backgroundColor: 'red', height: 50 }}
      >
        <h2 className="mt-2 ms-3 ">
          <MdTableBar className="text-white " size={35} />{' '}
          <strong className="text-white ">Pedidos</strong>
        </h2>
      </Col>
      <Col span={23}>
        <SellOrderAddTableScreen />
      </Col>
    </Row>
  );
};
