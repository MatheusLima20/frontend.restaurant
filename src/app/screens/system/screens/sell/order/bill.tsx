import { Col, List, Row } from 'antd';
import React, { forwardRef } from 'react';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';
import { Order } from '../../../../../types/order/order';
import { FaGlassWater } from 'react-icons/fa6';
import { GiMeal } from 'react-icons/gi';

interface Props {
  tableName: string;
  orders: Order[];
  total: number;
}

// eslint-disable-next-line react/display-name
export const Bill = forwardRef((props: Props, ref: any) => {
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
                    <Col>
                      {item.productName.includes('Suco') ? (
                        <FaGlassWater size={25} />
                      ) : (
                        <GiMeal size={30} />
                      )}
                    </Col>
                    <Col>
                      <strong style={{ fontSize: 14 }}>
                        {item.productName}
                      </strong>
                    </Col>
                    <Col>
                      <div>
                        {StringFormatter.realNumber(item.value)}
                        Quantidade: {item.amount}
                      </div>
                    </Col>
                  </Row>
                </List.Item>
              );
            })}
          </List>
        </Col>
        <Col span={24}>Total {StringFormatter.realNumber(props.total)}</Col>
      </Row>
    </div>
  );
});
