import React from 'react';
import { Col, Row } from 'antd';
import { ProfitChart } from './profit.chat';

export const ProfitScreen = () => {
  return (
    <Row className="mt-5">
      <Col span={22}>
        <ProfitChart />
      </Col>
    </Row>
  );
};
