import React from 'react';
import { Col, Row } from 'antd';
import { ReportsMobileSpendingChart } from './reports.mobile.spending.chart';

type Props = {
  style: any;
};

export const ReportsMobileSpendingScreen = (props: Props) => {
  return (
    <Row style={props.style}>
      <Col span={24}>
        <ReportsMobileSpendingChart />
      </Col>
    </Row>
  );
};
