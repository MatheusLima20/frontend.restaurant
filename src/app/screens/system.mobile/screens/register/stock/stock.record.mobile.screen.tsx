import { Col, Row } from 'antd';
import { StockRecordMobileForm } from './stock.record.mobile.form';

export const StockRecordMobileScreen = () => {
  return (
    <Row justify={'center'} gutter={[0, 30]}>
      <Col span={21}>
        <StockRecordMobileForm />
      </Col>
    </Row>
  );
};
