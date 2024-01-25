import { Skeleton } from 'antd';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/routes';
import { Col, Container, Row } from 'react-bootstrap';
import { cookies } from './controller/user/adm.cookies';
import { UserDataLogged } from './types/user/user';

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
        <Container className="m-0  g-0 mt-4">
          <Row className="g-0 align-items-start" style={{ textAlign: 'start' }}>
            <Col className="ms-4 align-self-start">
              <Skeleton.Image active style={{ width: 150 }} />
            </Col>
            <Col className="align-self-center">
              <Row className="justify-content-end">
                <Col md={10}>
                  <Skeleton.Input className="w-100" active size="large" />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="g-0 mt-5" style={{ textAlign: 'center' }}>
            <Skeleton className="w-100" active paragraph={{ rows: 15 }} />
          </Row>
        </Container>
      )}
    </Router>
  );
};
