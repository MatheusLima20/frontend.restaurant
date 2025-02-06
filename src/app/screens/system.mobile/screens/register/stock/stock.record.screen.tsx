import { Col, Row } from 'antd';
import { StockRecordMobileForm } from './stock.record.form';

export const StockRecordScreen = () => {
  return (
    <Row justify={'center'} gutter={[0, 30]}>
      <Col span={21}>
        <StockRecordMobileForm />
      </Col>
    </Row>
  );
};
