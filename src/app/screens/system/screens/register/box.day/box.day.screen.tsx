import { Col, Row } from 'antd';
import React from 'react';
import { BoxDayForm } from './box.day.form';

export const BoxDayScreen = () => {
  return (
    <Row>
      <Col span={22}>
        <BoxDayForm />
      </Col>
    </Row>
  );
};
