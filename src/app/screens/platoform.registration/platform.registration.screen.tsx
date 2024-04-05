import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { PlatformRegistrationForm } from './platform.registration.form';

export const PlatformRegistrationScreen = () => {
  return (
    <Container fluid>
      <Row className="m-2 mt-5 mb-5">
        <Card className="border-0 shadow-lg p-3 mb-5 bg-body rounded">
          <Row className="mt-5 mb-5">
            <h2>
              <strong>Cadastro Inícial</strong>
            </h2>
          </Row>

          <Row className="mb-5">
            <PlatformRegistrationForm />
          </Row>
        </Card>
      </Row>
    </Container>
  );
};
