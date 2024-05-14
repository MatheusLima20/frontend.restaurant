import { Col, Row, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/routes';
import { cookies } from './controller/user/adm.cookies';
import { UserDataLogged } from './types/user/user';
import { Content } from 'antd/es/layout/layout';
import { LoadingOutlined } from '@ant-design/icons';

const initialValues: UserDataLogged = {
  name: '',
  platformName: '',
  token: '',
  userType: '',
};

export const AppNavigation = () => {
  const [login, setLogin] = useState<UserDataLogged>(initialValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = cookies.get('data.user');

    const loginData = userData.token ? userData : initialValues;

    setLogin(loginData);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Router>
      {!loading && <AppRoutes dataUser={login} />}

      {loading && (
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
      )}
    </Router>
  );
};
