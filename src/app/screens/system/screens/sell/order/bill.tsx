import { Col, List, Row } from 'antd';
import React, { forwardRef } from 'react';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';
import { Order } from '../../../../../types/order/order';

interface Props {
  tableName: string;
  orders: Order[];
  total: number;
}

export const Bill = forwardRef(function bill(props: Props, ref: any) {
  return (
    <div style={{ display: 'none' }}>
      <Row ref={ref} justify={'center'} className="text-center mt-5">
        <Col span={24}>
          <h2>
            <strong>{props.tableName}</strong>
          </h2>
        </Col>
        <Col span={24}>
          <List size="large">
            {props.orders.map((item) => {
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
            <strong>Total {StringFormatter.realNumber(props.total)}</strong>
          </h3>
        </Col>
      </Row>
    </div>
  );
});
