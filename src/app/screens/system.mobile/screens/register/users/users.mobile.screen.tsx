import { Col, Row } from 'antd';
import { UsersMobileForm } from './users.mobile.form';

export const UsersMobileScreen = () => {
  return (
    <Row>
      <Col span={24}>
        <UsersMobileForm />
      </Col>
    </Row>
  );
};
