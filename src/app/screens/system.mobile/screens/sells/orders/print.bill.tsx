import { Col, List, Row } from 'antd';
import React, { forwardRef } from 'react';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';
import { Order } from '../../../../../types/order/order';
import { OrginizeArrays } from '../../../../../util/arrays/organize';
import dayjs from 'dayjs';

interface Props {
  tableName: string;
  orders: Order[];
  total: number;
}

//const now = new Date().getTime().toString();
//const user: UserDataLogged = cookies.get('data.user');

export const PrintBill = forwardRef(function bill(props: Props, ref: any) {
  const orders = OrginizeArrays.joinItemsOrders(props.orders);
  const tableName = props.tableName;
  const total = props.total;
  return (
    <div style={{ display: 'none' }}>
      <Row ref={ref} justify={'center'} className="text-center mt-5">
        <Col span={24}>
          <h2>
            <strong>{tableName}</strong>
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
                  </Row>
                </List.Item>
              );
            })}
          </List>
        </Col>
        <Col span={24}>
          <h3>
            <strong>Total {StringFormatter.realNumber(total)}</strong>
          </h3>
        </Col>
        <Col span={24}>
          <h6>
            <strong>{dayjs().format('DD/MM/YYYY HH:mm:ss')}</strong>
          </h6>
        </Col>
      </Row>
    </div>
  );
});

/* 
<Col md={10}>
          <PIX
            pixkey="matheus2096lima@gmail.com"
            merchant={user.platformName}
            city="Paraipaba"
            cep="62685-000"
            code={'RQP' + now}
            amount={total}
            size={150}
          />
        </Col>
*/
