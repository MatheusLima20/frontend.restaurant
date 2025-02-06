import { Col, Row } from 'antd';
import { UsersMobileForm } from './users.mobile.form';

export const UsersMobileScreen = () => {
  return (
    <Row justify={'center'}>
      <Col span={22}>
        <UsersMobileForm />
      </Col>
    </Row>
  );
};
