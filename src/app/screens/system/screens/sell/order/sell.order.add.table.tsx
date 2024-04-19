import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineTableBar, MdRemoveCircle, MdTableBar } from 'react-icons/md';
import './order.css';
import { BiEdit } from 'react-icons/bi';
import { TableRestaurant } from '../../../../../types/table/table';
import { TableController } from '../../../../../controller/table/table.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';

export const SellOrderAddTableScreen = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [tables, setTables] = useState<TableRestaurant[]>([]);

  useEffect(() => {
    getTablesRestaurant();
  }, []);

  return (
    <Row className="mt-5">
      {contextHolder}
      <Col md={23} className="text-center">
        <Row justify={'center'}>
          <Col span={5}>
            <Form.Item className="text-center">
              <Button
                type="dashed"
                style={{ height: 80 }}
                onClick={() => {
                  save();
                }}
                block
                icon={<PlusOutlined />}
              >
                <MdOutlineTableBar size={40} />
              </Button>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={[70, 20]} className="tables">
              {tables.map(({ id, name }) => (
                <Col key={id} md={8}>
                  <Card hoverable cover={<MdTableBar size={100} />}>
                    {name}
                  </Card>
                  <Button type="text" size="large">
                    <BiEdit size={30} />
                  </Button>
                  <Button type="text" danger size="large">
                    <MdRemoveCircle size={30} />
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  async function save() {
    const request = await TableController.store();

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    if (error) {
      messageApi.open({
        key: 'register.products',
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
      return;
    }
    await getTablesRestaurant();
  }

  async function getTablesRestaurant() {
    const request = await TableController.get();

    const data = request.data;

    if (data) {
      setTables(data);
    }
  }
};
