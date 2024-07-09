import { Col, List, Row } from 'antd';
import React, { forwardRef } from 'react';
import { Order } from '../../../../../types/order/order';
import { TableRestaurant } from '../../../../../types/table/table';

interface Props {
  tables: TableRestaurant[];
  orders: Order[];
}

export const PrintPendings = forwardRef(function order(props: Props, ref: any) {
  const tables = props.tables;
  const orders = props.orders;

  return (
    <div style={{ display: 'none' }}>
      <Row ref={ref} justify={'center'} className="text-center mt-5">
        <Col span={24}>
          <List size="large">
            {orders.map((item, index) => {
              return (
                <List.Item key={index}>
                  <Row
                    gutter={[20, 0]}
                    justify={'space-between'}
                    className="text-center"
                    style={{ width: '100%' }}
                  >
                    <Col span={24}>
                      <h2>
                        <strong>
                          {
                            tables.find((value) => value.id === item.idTable)
                              .name
                          }
                        </strong>
                      </h2>
                    </Col>
                    <Col span={6}>
                      <strong style={{ fontSize: 14 }}>
                        {item.productName}
                      </strong>
                    </Col>
                    <Col span={6}>
                      <div>
                        <strong>{' ' + item.amount + ' '}</strong>
                      </div>
                    </Col>
                    <Col span={24} className="text-center">
                      {item.createdAt}
                    </Col>
                  </Row>
                </List.Item>
              );
            })}
          </List>
        </Col>
      </Row>
    </div>
  );
});
