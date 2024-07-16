import React from 'react';
import { Col, Row } from 'antd';
import { ReportsMobileSpendingChart } from './reports.mobile.spending.chart';

export const ReportsMobileSpendingScreen = () => {
  return (
    <Row className="mt-5">
      <Col span={22}>
        <ReportsMobileSpendingChart />
      </Col>
    </Row>
  );
};
