import React from 'react';
import { Button, Col, Form, Input, Row, Switch } from 'antd';

export const ProductRegisterScreen = () => {
  return (
    <Row className="mt-5" gutter={[0, 30]} justify={'center'}>
      <Col>
        <h2>
          <strong>Cadastro de produtos</strong>
        </h2>
      </Col>

      <Col span={24}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Row gutter={[20, 10]} justify={'center'}>
            <Col>
              <Form.Item
                label="Nome"
                name="name"
                rules={[
                  { required: true, message: 'Digite o nome do produto!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                label="Valor"
                name="value"
                rules={[{ required: true, message: 'Digite o valor!' }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="Ativo" name="active">
                <Switch
                  checkedChildren="Sim"
                  unCheckedChildren="Não"
                  defaultChecked
                />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="Exibir" name="show">
                <Switch
                  checkedChildren="Sim"
                  unCheckedChildren="Não"
                  defaultChecked
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row justify={'center'} gutter={[20, 0]} className="mt-2">
              <Col>
                <Button type="primary" htmlType="submit">
                  Enviar
                </Button>
              </Col>
              <Col>
                <Button type="default" htmlType="reset">
                  Limpar
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
