import React from 'react';
import { Col, Row } from 'antd';
import { ProfitMobileChart } from './profit.mobile.chat';

type Props = {
  style: any;
};

export const ProfitMobileScreen = (props: Props) => {
  return (
    <Row style={props.style}>
      <Col span={24}>
        <ProfitMobileChart />
      </Col>
    </Row>
  );
};
