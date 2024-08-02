import React, { useEffect } from 'react';
import { cookies } from '../../controller/user/adm.cookies';
import { Content } from 'antd/es/layout/layout';
import { Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const LogoutScreen = () => {
  useEffect(() => {
    logout();
  }, []);

  return (
    <Content>
      <Row>
        <Col span={24}>
          <Spin
            size="large"
            fullscreen={true}
            indicator={<LoadingOutlined style={{ fontSize: 70 }} />}
          />
        </Col>
      </Row>
    </Content>
  );

  function logout() {
    cookies.remove('data.user');
    setTimeout(() => {
      document.location = '/';
    }, 3000);
  }
};
