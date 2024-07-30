import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  message,
  Popconfirm,
  Row,
  Switch,
} from 'antd';
import { TableController } from '../../../../controller/table/table.controller';
import { TableRestaurant } from '../../../../types/table/table';
import { Order } from '../../../../types/order/order';
import { OrderController } from '../../../../controller/order/order.controller';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { TranslateController } from '../../../../controller/translate/translate.controller';

export const KitchenMobileCards = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [tables, setTables] = useState<TableRestaurant[]>([]);
  const [processings, setProcessings] = useState<Order[]>([]);

  useEffect(() => {
    getTablesRestaurant();
  }, []);

  useEffect(() => {
    setInterval(() => {
      getTablesRestaurant();
    }, 10000);
  }, []);

  return (
    <Row justify={'center'}>
      {contextHolder}
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
            <Form.Item layout="vertical" label="Guarnição">
              <Switch
                title="GUARNIÇÃO"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item layout="vertical" label="Bebida">
              <Switch
                title="BEBIDA"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item layout="vertical" label="Sobremesa">
              <Switch
                title="SOBREMESA"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item layout="vertical" label="Drink">
              <Switch
                title="DRINK"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={22}>
        {tables.length !== 0 && (
          <Row justify={'center'} gutter={[0, 40]}>
            {processings.map((processing, index) => {
              const table = tables.find(
                (table) => table.id === processing.idTable,
              );
              const isCancelled = processing.isCancelled;
              const textWhite = isCancelled ? 'text-white' : '';
              return (
                <Col key={index} span={24}>
                  <Card
                    title={
                      <div className={`text-center fs-1 ${textWhite}`}>
                        {table.name}
                      </div>
                    }
                    bordered={true}
                    style={{
                      backgroundColor: !isCancelled ? '#b5b5b5' : 'red',
                    }}
                    hoverable
                    actions={[
                      <Popconfirm
                        key={index}
                        title="Finalizar pedido."
                        description="Deseja realmente finalizar o pedido?"
                        onConfirm={() => {
                          const status = isCancelled
                            ? 'cancelado'
                            : 'finalizado';
                          patchStatus(processing.id, status);
                        }}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <Button size="large" type="text">
                          {isCancelled ? (
                            <BiXCircle size={40} color="red" />
                          ) : (
                            <BiCheckCircle size={40} color="green" />
                          )}
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    <Row className="m-5">
                      <Col span={24} className={`text-center ${textWhite}`}>
                        <h3>
                          <strong>{isCancelled ? 'Cancelado' : ''}</strong>
                        </h3>
                      </Col>
                      <Col span={24} className={`text-center ${textWhite}`}>
                        <h3>
                          <strong>{processing.productName}</strong>
                        </h3>
                        <h4>
                          <strong>x {processing.amount}</strong>
                        </h4>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Col>
    </Row>
  );

  async function patchStatus(id: number, status: string) {
    const orderId = id;

    const request = await OrderController.patch(orderId, {
      status: status,
    } as any);

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    messageApi.open({
      key: 'register.orders',
      type: type,
      content: tranlateMessage.text,
      duration: 4,
    });
    if (!error) {
      await getTablesRestaurant();
    }
  }

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
