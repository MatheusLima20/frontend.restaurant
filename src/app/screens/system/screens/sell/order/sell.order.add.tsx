import { Button, Col, Form, Input, List, Row, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { GiHotMeal, GiMeal } from 'react-icons/gi';
import { ProductController } from '../../../../../controller/product/products.controller';
import { Order } from '../../../../../types/order/order';
import { OrderController } from '../../../../../controller/order/order.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';

interface Props {
  idTable: number;
  orders: Order[];
  getOrders: () => any;
}

export const SellOrderAdd = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(0);

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
      <Col md={24}>
        <List
          size="small"
          bordered
          dataSource={props.orders}
          renderItem={(item) => (
            <div>
              <List.Item title="Cod.">
                Cod:. {item.id} {item.productName} R$ {item.value}
              </List.Item>
            </div>
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
