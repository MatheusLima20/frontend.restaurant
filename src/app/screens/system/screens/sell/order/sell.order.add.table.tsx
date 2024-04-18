import React from 'react';
import { Button, Card, Col, Form, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineTableBar, MdRemoveCircle, MdTableBar } from 'react-icons/md';
import './order.css';
import { BiEdit } from 'react-icons/bi';

export const SellOrderAddTableScreen = () => {
  return (
    <Row className="mt-5">
      <Col md={23} className="text-center">
        <Form name="dynamic_form_nest_item" autoComplete="off">
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <Row justify={'center'}>
                <Col span={5}>
                  <Form.Item className="text-center">
                    <Button
                      type="dashed"
                      style={{ height: 80 }}
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      <MdOutlineTableBar size={40} />
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[70, 20]} className="tables">
                    {fields.map(({ key, name }) => (
                      <Col key={key} md={8}>
                        <Card hoverable cover={<MdTableBar size={100} />}>
                          {key}
                        </Card>
                        <Button type="text" size="large">
                          <BiEdit size={30} />
                        </Button>
                        <Button
                          type="text"
                          danger
                          size="large"
                          onClick={() => remove(name)}
                        >
                          <MdRemoveCircle size={30} />
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            )}
          </Form.List>
        </Form>
      </Col>
    </Row>
  );
};
