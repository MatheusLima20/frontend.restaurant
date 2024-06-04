import React from 'react';
import { Col, Row } from 'antd';
import { ReportsSpendingChart } from './reports.spending.chart';

export const ReportsSpendingScreen = () => {
  return (
    <Row className="mt-5">
      <Col span={22}>
        <ReportsSpendingChart />
      </Col>
    </Row>
  );
};
