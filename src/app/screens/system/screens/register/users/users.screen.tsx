import React from 'react';
import { Col, Row } from 'antd';
import { UsersForm } from './users.form';

export const UsersScreen = () => {
  return (
    <Row>
      <Col span={22}>
        <UsersForm />
      </Col>
    </Row>
  );
};
