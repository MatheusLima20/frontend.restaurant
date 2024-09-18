import { Col, Row } from 'antd';
import { PaymentsForm } from './payment.form';

export const PaymentScreen = () => {
  return (
    <Row className="mt-5">
      <Col span={22}>
        <PaymentsForm />
      </Col>
    </Row>
  );
};
