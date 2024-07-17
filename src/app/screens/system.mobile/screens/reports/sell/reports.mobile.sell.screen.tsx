import React from 'react';
import { Col, Row } from 'antd';
import { ReportsMobileSellChart } from './reports.mobile.sell.chart';

type Props = {
  style: any;
};

export const ReportsMobileSellScreen = (props: Props) => {
  return (
    <Row style={props.style}>
      <Col span={24}>
        <ReportsMobileSellChart />
      </Col>
    </Row>
  );
};
