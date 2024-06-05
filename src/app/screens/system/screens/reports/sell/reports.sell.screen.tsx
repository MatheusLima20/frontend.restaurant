import React from 'react';
import { Col, Row } from 'antd';
import { ReportsSellChart } from './reports.sell.chart';

export const ReportsSellScreen = () => {
  return (
    <Row className="mt-5">
      <Col span={22}>
        <ReportsSellChart />
      </Col>
    </Row>
  );
};
