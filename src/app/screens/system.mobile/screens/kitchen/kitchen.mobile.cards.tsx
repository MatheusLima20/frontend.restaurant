import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Switch } from 'antd';
import { TableController } from '../../../../controller/table/table.controller';
import { TableRestaurant } from '../../../../types/table/table';
import { Order } from '../../../../types/order/order';
import { OrderController } from '../../../../controller/order/order.controller';
import { TranslateController } from '../../../../controller/translate/translate.controller';
import * as io from 'socket.io-client';
import { baseURL } from '../../../../config/axios';
import { cookies } from '../../../../controller/user/adm.cookies';
import { UserDataLogged } from '../../../../types/user/user';
import { ProductType } from '../../../../types/product/product';
import { Cards } from './cards';

const socket = io.connect(baseURL);

const user: UserDataLogged = cookies.get('data.user');
const platform = user.platformId;

const orderType: ProductType[] = [
  'BEBIDA',
  'DRINK',
  'GUARNIÇÃO',
  'PETISCO',
  'PRATO',
  'SOBREMESA',
  'LUNCH',
];

export const KitchenMobileCards = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [productType, setProductType] = useState(orderType);
  const [tables, setTables] = useState<TableRestaurant[]>([]);
  const [processings, setProcessings] = useState<Order[]>([]);

  const sendOrders = () => {
    socket.emit('send_orders', { message, platform });
  };

  useEffect(() => {
    socket.emit('platform', platform);
    getTablesRestaurant();
  }, []);

  useEffect(() => {
    socket.on('receive_orders', () => {
      getTablesRestaurant();
    });
  }, [socket]);

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
                onChange={() => handleChange('PRATO')}
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item layout="vertical" label="Lunch">
              <Switch
                title="Lunch"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
                onChange={() => handleChange('LUNCH')}
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
                onChange={() => handleChange('GUARNIÇÃO')}
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item layout="vertical" label="Petisco">
              <Switch
                title="PETISCO"
                checkedChildren="EXIBIR"
                unCheckedChildren="ESCONDER"
                defaultChecked
                onChange={() => handleChange('PETISCO')}
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
                onChange={() => {
                  handleChange('BEBIDA');
                }}
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
                onChange={() => handleChange('SOBREMESA')}
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
                onChange={() => handleChange('DRINK')}
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={22}>
        {tables.length !== 0 && (
          <Row justify={'center'} gutter={[0, 40]}>
            {filterProductsByType().map((processing, index) => {
              return (
                <Col key={index} span={24}>
                  <Cards
                    order={processing}
                    tables={tables}
                    patchStatus={patchStatus}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </Col>
    </Row>
  );

  async function patchStatus(id: number, productId: number, status: string) {
    const orderId = id;

    const request = await OrderController.patch(orderId, {
      productId: productId,
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
      getTablesRestaurant();
      sendOrders();
    }
  }

  async function getTablesRestaurant() {
    const request = await TableController.get();

    const data = request.data;

    const tables = data.tables;

    if (tables) {
      setTables(tables);
      getProcessing();
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

  function filterProductsByType() {
    let products: Order[] = [];

    productType.map((type) => {
      const product = processings.filter(
        (process) => process.productType === type,
      );
      products = products.concat(product);
    });

    const newArray = products.sort((a, b) => a.order - b.order);

    return newArray;
  }

  function handleChange(type: ProductType) {
    const hasType = productType.filter((value) => value === type);
    if (hasType.length) {
      const newArray = productType.filter((value) => value !== type);
      setProductType(newArray);
    } else {
      const newArray = productType.concat(type);
      setProductType(newArray);
    }
  }
};
