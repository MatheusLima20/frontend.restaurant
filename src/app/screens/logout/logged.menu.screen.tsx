import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { cookies } from '../../controller/user/adm.cookies';

export const LogoutScreen = () => {
  useEffect(() => {
    logout();
  }, []);

  return (
    <Container className="g-0 m-0 p-0" style={{ minWidth: 250 }}>
      <Row className="p-0 g-0 m-0">
        <Col style={{ fontSize: 30 }}>
          <Spinner />
        </Col>
      </Row>
    </Container>
  );

  function logout() {
    cookies.remove('data.user');
    cookies.remove('primary.access');
    setTimeout(() => {
      document.location = '/';
    }, 3000);
  }
};
