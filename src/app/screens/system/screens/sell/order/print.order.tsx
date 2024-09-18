import { Col, List, Row } from 'antd';
import dayjs from 'dayjs';
import { forwardRef } from 'react';

type Order = {
  productName: string;
  amount: number;
};

interface Props {
  tableName: string;
  orders: Order[];
}

export const PrintOrder = forwardRef(function order(props: Props, ref: any) {
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
            {props.orders.map((item, index) => {
              return (
                <List.Item key={index}>
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
                        <strong>{' ' + item.amount + ' '}</strong>
                      </div>
                    </Col>
                    <Col span={24} className="text-center">
                      {item.amount < 0
                        ? 'Pedido excluido.'
                        : 'Pedido Adicionado.'}
                    </Col>
                    <Col span={24} className="text-center">
                      {dayjs().format('DD/MM/YYYY HH:mm:ss')}
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
