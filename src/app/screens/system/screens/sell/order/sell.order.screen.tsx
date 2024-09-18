import { Col, Row } from 'antd';
import { SellOrderAddTableScreen } from './sell.order.add.table';

export const SellOrderScreen = () => {
  return (
    <Row justify={'end'} className="mt-5">
      <Col span={22} className="text-center">
        <h2>
          <strong>Pedidos</strong>
        </h2>
      </Col>
      <Col span={22}>
        <SellOrderAddTableScreen />
      </Col>
    </Row>
  );
};
