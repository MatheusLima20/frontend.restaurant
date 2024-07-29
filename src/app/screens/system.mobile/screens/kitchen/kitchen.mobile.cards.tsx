import React from 'react';
import { Card, Col, Form, Row, Switch } from 'antd';

export const KitchenMobileCards = () => {
  return (
    <Row justify={'center'}>
      <Col span={22}>
        <Row justify={'center'} gutter={[30, 0]}>
          <Col md={4}>
            <Form.Item layout="vertical" label="Prato">
              <Switch
                title="Pratos"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item layout="vertical" label="Prato">
              <Switch
                title="Pratos"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item layout="vertical" label="Guarnição">
              <Switch
                title="Pratos"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item layout="vertical" label="Bebida">
              <Switch
                title="Pratos"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item layout="vertical" label="Drink">
              <Switch
                title="Pratos"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={22}>
        <Card title="Mesa 1" bordered={true} hoverable></Card>
      </Col>
    </Row>
  );
};
