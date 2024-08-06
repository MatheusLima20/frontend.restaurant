import React from 'react';
import { Col, Row } from 'antd';
import { Order } from '../../../../../types/order/order';

type Props = {
  orders: Order[];
  graphic: any;
};

export const ReportDetails = (props: Props) => {
  const graphic = props.graphic;
  return (
    <Row>
      <Col>
        <img src={graphic ? graphic.toDataURL() : ''} />
      </Col>
      <Col>Details</Col>
    </Row>
  );
};
