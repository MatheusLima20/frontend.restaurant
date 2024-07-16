import React from 'react';
import { Col, Row } from 'antd';
import { ReportsMobileSellChart } from './reports.mobile.sell.chart';

export const ReportsMobileSellScreen = () => {
  return (
    <Row className="mt-5">
      <Col span={22}>
        <ReportsMobileSellChart />
      </Col>
    </Row>
  );
};
