import { Col, List, Row } from 'antd';
import { forwardRef } from 'react';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';
import { Order, PaymentMethod } from '../../../../../types/order/order';
import dayjs from 'dayjs';

interface Props {
  id: number;
  orders: Order[];
  total: number;
  date: string;
  isCancelled: boolean;
}

const paymentMethod: PaymentMethod[] = ['debito', 'dinheiro', 'pix', 'credito'];

export const PrintBoxDay = forwardRef(function boxday(props: Props, ref: any) {
  const id = props.id;
  const isCancelled = props.isCancelled;
  const orders = props.orders;

  return (
    <div style={{ display: 'none' }}>
      <Row ref={ref} justify={'center'} className="text-center mt-5">
        <Col span={24}>
          <h2>
            <strong>Caixa: {id}</strong>
          </h2>
        </Col>
        <Col span={24}>
          <h2>
            <strong>{isCancelled ? 'Cancelados' : ''}</strong>
          </h2>
        </Col>
        <Col span={24}>
          <List size="large">
            {orders.map((item) => {
              return (
                <List.Item key={item.id}>
                  <Row
                    gutter={[20, 0]}
                    justify={'space-between'}
                    className="text-center"
                    style={{ width: '100%' }}
                  >
                    <Col span={6}>
                      <strong style={{ fontSize: 14 }}>
                        {item.productName}
                      </strong>
                    </Col>
                    <Col span={6}>
                      <div>
                        <strong>
                          {StringFormatter.realNumber(item.value)} x
                        </strong>
                        <strong>{' ' + item.amount + ' = '}</strong>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div>
                        <strong>
                          {StringFormatter.realNumber(item.value * item.amount)}
                        </strong>
                      </div>
                    </Col>
                    <Col span={24}>
                      {item.paymentMethod
                        ? 'Metodo de Pagamento: ' + item.paymentMethod
                        : ''}
                    </Col>
                    <Col span={24}>
                      {isCancelled ? 'Cancelado Por: ' + item.updatedBy : ''}
                    </Col>
                    <Col span={24}>
                      {isCancelled
                        ? dayjs(item.updatedAt).format('DD/MM/YYYY hh:mm:ss')
                        : ''}
                    </Col>
                  </Row>
                </List.Item>
              );
            })}
          </List>
        </Col>
        {paymentMethod.map((method, index) => {
          const ordersMethod = orders.filter(
            (value) => value.paymentMethod === method,
          );
          let total = 0;

          ordersMethod.map((amount) => {
            total += amount.amount * amount.value;
          });

          return (
            <Col span={24} key={index} className="mb-4">
              <h3>
                <strong>
                  Total {method.toUpperCase()}{' '}
                  {StringFormatter.realNumber(total)}
                </strong>
              </h3>
            </Col>
          );
        })}
        <Col span={24}>
          <h3>
            <strong>
              Total do Caixa {StringFormatter.realNumber(props.total)}
            </strong>
          </h3>
        </Col>
        <Col span={24}>
          <h3>
            <strong>{props.date}</strong>
          </h3>
        </Col>
      </Row>
    </div>
  );
});
