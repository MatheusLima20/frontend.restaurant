import {
  Button,
  Col,
  Form,
  Input,
  List,
  Popconfirm,
  Row,
  Select,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { GiHotMeal, GiMeal } from 'react-icons/gi';
import { ProductController } from '../../../../../controller/product/products.controller';
import { Order } from '../../../../../types/order/order';
import { OrderController } from '../../../../../controller/order/order.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { FaGlassWater } from 'react-icons/fa6';
import { BiEditAlt } from 'react-icons/bi';
import { Product } from '../../../../../types/product/product';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';
import { BsPrinterFill, BsTrash } from 'react-icons/bs';
import { useReactToPrint } from 'react-to-print';
import { Bill } from './bill';

interface Props {
  idTable: number;
  orders: Order[];
  total: number;
  tableName: string;
  loading: boolean;
  getOrders: () => any;
}

const initialValues = {
  orderId: 0,
  productId: 0,
  productName: '',
  amount: 0,
};

export const SellOrderAdd = (props: Props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [order, setOrder] = useState(initialValues);
  const [products, setProducts] = useState<Product[]>([]);

  const orders = props.orders;

  const total = props.total;

  useEffect(() => {
    setOrder(initialValues);
    getPlates();
  }, [orders, total]);

  return (
    <Row justify={'center'}>
      {contextHolder}
      <Col>
        <GiHotMeal size={90} />
      </Col>
      <Col span={24} className="text-center">
        <p>{props.tableName}</p>
      </Col>
      <Col className="text-center mb-4" span={24}>
        <strong>Pedidos</strong>
      </Col>
      <Col span={22}>
        <Col span={24}>
          <Form
            name="basic"
            autoComplete="on"
            fields={[
              { name: 'productName', value: order.productName },
              { name: 'amount', value: order.amount },
            ]}
            onFinish={save}
          >
            <Row justify={'center'}>
              <Col span={24}>
                <Row gutter={[30, 10]}>
                  <Col md={12}>
                    <Form.Item
                      label="Pedido"
                      name="productName"
                      rules={[
                        {
                          message: 'Por favor, selecione um prato!',
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        value={order.productName}
                        onSelect={(value, id: any) => {
                          setOrder({
                            ...order,
                            productName: value,
                            productId: id.value,
                          });
                        }}
                        placeholder="Selecione..."
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label.toLowerCase() ?? '').includes(
                            input.toLowerCase(),
                          )
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={products.map((value) => {
                          return {
                            value: value.id as number,
                            label: `${value.name} R$ ${value.value.toLocaleString(
                              'pt-br',
                              {
                                minimumFractionDigits: 2,
                              },
                            )}`,
                          };
                        })}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={12}>
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
                      <Input
                        type="number"
                        name="amount"
                        value={order.amount}
                        onChange={(event) => {
                          const value = Number.parseFloat(event.target.value);
                          setOrder({ ...order, amount: value });
                        }}
                      />
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
          loading={props.loading}
          bordered
          dataSource={orders}
          header={
            <Row justify={'space-between'} align={'middle'} className="mb-3">
              <Col>
                <Button onClick={handlePrint} size="large">
                  <BsPrinterFill size={20} />
                </Button>
                <Bill
                  ref={componentRef}
                  tableName={props.tableName}
                  orders={orders}
                  total={total}
                />
              </Col>
              <Col>
                Total
                {StringFormatter.realNumber(total)}
              </Col>
            </Row>
          }
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Button
                  key={item.id}
                  onClick={() => {
                    setOrder({
                      ...order,
                      orderId: item.id,
                      productName:
                        item.productName +
                        StringFormatter.realNumber(item.value),
                      productId: products.find(
                        (value) => value.name === item.productName,
                      ).id,
                      amount: item.amount,
                    });
                  }}
                >
                  <BiEditAlt size={20} />
                </Button>,
                <Popconfirm
                  key={item.id}
                  title="Cancelar Pedido"
                  description="Deseja realmente cancelar o pedido?"
                  onConfirm={() => {
                    cancel(item.id);
                  }}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button danger={true}>
                    <BsTrash size={20} />
                  </Button>
                </Popconfirm>,
              ]}
            >
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
                    {StringFormatter.realNumber(item.value)}
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
    const idOrder = order.orderId;

    let request;

    if (!idOrder) {
      request = await OrderController.store({
        idProduct: order.productId,
        idTable: props.idTable,
        amount: values.amount,
      } as any);
    } else {
      request = await OrderController.patch(idOrder, {
        productId: order.productId,
        amount: values.amount,
      } as any);
    }

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
      setOrder(initialValues);
      setTimeout(() => {
        props.getOrders();
      }, 500);
    }
  }

  async function cancel(id: number) {
    const idOrder = id;

    const request = await OrderController.patch(idOrder, {
      productId: id,
      isCancelled: true,
    } as any);

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    await props.getOrders();

    messageApi.open({
      key: 'register.orders',
      type: type,
      content: tranlateMessage.text,
      duration: 4,
    });
    setOrder(initialValues);
  }

  async function getPlates() {
    const request = await ProductController.getPlates();

    const data = request.data;

    if (data) {
      setProducts(data);
    }
  }
};
