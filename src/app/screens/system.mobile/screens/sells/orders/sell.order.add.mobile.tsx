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
import { GiMeal } from 'react-icons/gi';
import { ProvisionsController } from '../../../../../controller/provisions/provisions.controller';
import { Order } from '../../../../../types/order/order';
import { OrderController } from '../../../../../controller/order/order.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { FaGlassWater } from 'react-icons/fa6';
import { Product } from '../../../../../types/product/product';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';
import { BsTrash } from 'react-icons/bs';
import { useReactToPrint } from 'react-to-print';
import { PrintOrder } from './print.order';
import dayjs from 'dayjs';

interface Props {
  idTable: number;
  orders: Order[];
  total: number;
  tableName: string;
  loading: boolean;
  getOrders: () => any;
  onUpdate: () => any;
}

const initialValues = {
  orderId: 0,
  productId: 0,
  productName: '',
  amount: 0,
  paymentMethod: 'credito',
};

const txtButtonSave = 'Salvar';

export const SellOrderAddMobile = (props: Props) => {
  const orderRef = useRef();

  const handlePrintOrder = useReactToPrint({
    content: () => orderRef.current,
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [order, setOrder] = useState(initialValues);
  const [products, setProducts] = useState<Product[]>([]);

  const orders = props.orders;

  const total = props.total;

  const loading = props.loading;

  useEffect(() => {
    setOrder(initialValues);
    getPlates();
  }, [loading]);

  return (
    <Row justify={'center'} style={{ height: 600 }}>
      {contextHolder}
      <Col span={24} className="text-center">
        <h4>{props.tableName}</h4>
      </Col>
      <Col span={24}>
        <Col span={24}>
          <Form
            name="basic"
            autoComplete="on"
            layout={'horizontal'}
            fields={[
              { name: 'productName', value: order.productName },
              { name: 'amount', value: order.amount },
            ]}
            onFinish={save}
          >
            <Row justify={'center'} align={'middle'}>
              <Col span={24}>
                <Row gutter={[0, 10]}>
                  <Col span={24}>
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
                        className="select-product"
                        showSearch
                        size="large"
                        value={order.productName}
                        onSelect={(value, values) => {
                          setOrder({
                            ...order,
                            productName: values.label,
                            productId: values.value,
                            amount: order.orderId === 0 ? 1 : 0,
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

                  <Col span={24}>
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
              <Row justify={'center'} gutter={[40, 0]} className="mt-2">
                <Col>
                  <Button
                    type="primary"
                    disabled={order.orderId !== 0}
                    htmlType="submit"
                  >
                    {txtButtonSave}
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    htmlType="reset"
                    onClick={() => {
                      setOrder(initialValues);
                    }}
                  >
                    Limpar
                  </Button>
                </Col>
                <PrintOrder
                  ref={orderRef}
                  tableName={props.tableName}
                  orders={[
                    {
                      productName: order.productName.split('R$')[0],
                      amount: order.amount,
                    },
                  ]}
                />
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Col>
      <Col className="orders" md={24} style={{ height: 250 }}>
        <List
          size="small"
          loading={loading}
          bordered
          dataSource={orders}
          header={
            <Row justify={'space-between'} align={'middle'} className="mb-3">
              <Col>
                <strong>Pedidos</strong>
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
              style={{
                backgroundColor:
                  item.status === 'pendente'
                    ? 'rgba(248, 92, 92, 0.2)'
                    : 'rgba(92, 191, 248, 0.2)',
              }}
              actions={[
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
                  <Button
                    danger={true}
                    onClick={() => {
                      setOrder({
                        ...order,
                        productName: item.productName,
                        amount: item.amount * -1,
                      });
                    }}
                  >
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
                    <div>
                      {StringFormatter.realNumber(item.value * item.amount)}
                      Quantidade: {item.amount}
                    </div>
                    <div>Garçom: {item.createdBy}</div>
                    <div>
                      Criado às {dayjs(item.createdAt).format('hh:mm:ss')}
                    </div>
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

      const isPrint = values.amount < 0;
      if (isPrint && !request.error) {
        handlePrintOrder();
      }
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
    handlePrintOrder();
    const request = await OrderController.patch(idOrder, {
      productId: id,
      isCancelled: true,
      isOpen: false,
    } as any);

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    await props.getOrders();

    if (type === 'success') {
      props.onUpdate();
    }

    messageApi.open({
      key: 'register.orders',
      type: type,
      content: tranlateMessage.text,
      duration: 4,
    });
    setOrder(initialValues);
  }

  async function getPlates() {
    const request = await ProvisionsController.getPlates();

    const data = request.data;
    if (data) {
      setProducts(data);
    }
  }
};
