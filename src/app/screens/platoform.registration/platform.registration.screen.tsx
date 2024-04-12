import React from 'react';
import { PlatformRegistrationForm } from './platform.registration.form';
import { Card, Col, Row } from 'antd';

export const PlatformRegistrationScreen = () => {
  return (
    <Row className="m-2 mt-5 mb-5">
      <Col span={24}>
        <Card className="border-0 shadow-lg p-3 mb-5 bg-body rounded">
          <Row justify="center" className="mt-5 mb-5">
            <Col>
              <h2>
                <strong>Cadastro Inícial</strong>
              </h2>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col span={24}>
              <PlatformRegistrationForm />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
