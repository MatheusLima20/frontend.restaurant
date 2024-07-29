import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Popconfirm, Row, Switch } from 'antd';
import { TableController } from '../../../../controller/table/table.controller';
import { TableRestaurant } from '../../../../types/table/table';
import { Order } from '../../../../types/order/order';
import { OrderController } from '../../../../controller/order/order.controller';
import { BiCheckCircle } from 'react-icons/bi';

export const KitchenMobileCards = () => {
  const [tables, setTables] = useState<TableRestaurant[]>([]);
  const [processings, setProcessings] = useState<Order[]>([]);

  useEffect(() => {
    getTablesRestaurant();
  }, []);

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
        <Row justify={'center'} gutter={[0, 40]}>
          {processings.map((processing, index) => {
            const table = tables.find(
              (table) => table.id === processing.idTable,
            );
            return (
              <Col key={index} span={24}>
                <Card
                  title={<div className="text-center fs-1">{table.name}</div>}
                  bordered={true}
                  style={{ backgroundColor: '#b5b5b5' }}
                  hoverable
                  actions={[
                    <Popconfirm
                      key={index}
                      title="Finalizar pedido."
                      description="Deseja realmente finalizar o pedido?"
                      okText="Sim"
                      cancelText="Não"
                    >
                      <Button>
                        <BiCheckCircle size={30} color="green" />
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <div className="text-center">
                    <h3>
                      <strong>{processing.productName}</strong>
                    </h3>
                    <h4>
                      <strong>x {processing.amount}</strong>
                    </h4>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );

  async function getTablesRestaurant() {
    const request = await TableController.get();

    const data = request.data;

    const tables = data.tables;

    if (tables) {
      setTables(tables);
      await getProcessing();
    }
  }

  async function getProcessing() {
    const request = await OrderController.getByStatus('processando');

    const data = request.data;

    const pendings = data;

    if (data) {
      setProcessings(pendings);
    }
  }
};
