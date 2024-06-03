import React from 'react';
import { Col, Row } from 'antd';
import { StockRecordForm } from './stock.record.form';

export const StockRecordScreen = () => {
  return (
    <Row gutter={[0, 30]}>
      <Col span={24}>
        <StockRecordForm />
      </Col>
    </Row>
  );
};
