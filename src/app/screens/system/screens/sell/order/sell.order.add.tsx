import { Button, Col, Form, Input, List, Row, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { GiHotMeal, GiMeal } from 'react-icons/gi';
import { ProductController } from '../../../../../controller/product/products.controller';
import { Order } from '../../../../../types/order/order';
import { OrderController } from '../../../../../controller/order/order.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { FaGlassWater } from 'react-icons/fa6';

interface Props {
  idTable: number;
  orders: Order[];
  total: number;
  getOrders: () => any;
}

export const SellOrderAdd = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(0);
  const total = props.total;

  useEffect(() => {
    getPlates();
  }, []);

  return (
    <Row justify={'center'}>
      {contextHolder}
      <Col>
        <GiHotMeal size={90} />
      </Col>
      <Col span={24} className="text-center">
        <p>Mesa: {props.idTable}</p>
      </Col>
      <Col className="text-center mb-" span={24}>
        <strong>Pedidos</strong>
      </Col>
      <Col span={22}>
        <Col span={24}>
          <Form name="basic" autoComplete="on" onFinish={save}>
            <Row justify={'center'}>
              <Col span={24}>
                <Row gutter={[10, 10]}>
                  <Col md={24}>
                    <Form.Item
                      label="Unidade"
                      name="unitMeasurement"
                      rules={[
                        {
                          message: 'Por favor, selecione um prato!',
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        onChange={(value: string) => {
                          const id = Number.parseInt(value);

                          setId(id);
                        }}
                        options={products.map((value) => {
                          return { value: value.id, label: value.name };
                        })}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={24}>
                    <Form.Item
                      label="Quantidade"
                      name="amount"
                      rules={[
                        {
                          required: true,
                          message: 'Digite a quantidade!',
                        },
                      ]}
                    >
                      <Input type="number" name="amount" prefix={<GiMeal />} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Form.Item>
              <Row justify={'center'} gutter={[20, 0]} className="mt-2">
                <Col>
                  <Button type="primary" htmlType="submit">
                    Adicionar
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    htmlType="reset"
                    onClick={() => {
                      //setValues(initialValues);
                    }}
                  >
                    Limpar
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Col>
      <Col className="orders" md={24}>
        <List
          size="small"
          bordered
          dataSource={props.orders}
          header={
            <Row justify={'end'}>
              <Col>
                Total R${' '}
                {total.toLocaleString('pt-br', {
                  minimumFractionDigits: 2,
                })}
              </Col>
            </Row>
          }
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  item.productName.includes('Suco') ? (
                    <FaGlassWater size={25} />
                  ) : (
                    <GiMeal size={30} />
                  )
                }
                title={
                  <strong style={{ fontSize: 14 }}>{item.productName}</strong>
                }
                description={
                  <div>
                    R${' '}
                    {item.value.toLocaleString('pt-br', {
                      minimumFractionDigits: 2,
                    })}{' '}
                    Quantidade: {item.amount}
                  </div>
                }
              ></List.Item.Meta>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );

  async function save(values: any) {
    const request = await OrderController.store({
      idProduct: id,
      idTable: props.idTable,
      amount: values.amount,
    } as any);

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    await props.getOrders();

    if (error) {
      messageApi.open({
        key: 'register.orders',
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
      return;
    }
  }

  async function getPlates() {
    const request = await ProductController.getPlates();

    const data = request.data;

    if (data) {
      setProducts(data);
    }
  }
};
