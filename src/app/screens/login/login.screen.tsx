import React from 'react';
import { Content } from 'antd/es/layout/layout';
import { Button, Col, Form, Input, Row } from 'antd';

export const LoginScreen = () => {

  return (
    <Content>
      <Row justify={'center'} align={'middle'} className='mt-5' >
        <Col span={8}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="on"
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[{ required: true, message: 'Por favor, digite seu nome!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[{ required: true, message: 'Por favor, digite sua senha!' }]}
            >
              <Input.Password />
            </Form.Item>


            <Form.Item>
              <Row justify={'center'}>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>

                </Col>

                <Col className='ms-5'>
                  <Button type="default" htmlType="reset">
                    Limpar
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );

};
