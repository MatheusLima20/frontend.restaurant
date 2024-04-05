import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Menu } from '../includes/menu';
import { Home } from '../screens/home';
import { Col, Row } from 'antd';
import { Footer } from '../includes/footer';
import { ProductRegister } from '../screens/register.products';

export const SystemRoutes = () => {
  return userRoutes();

  function userRoutes() {
    return (
      <Row gutter={[30, 0]}>
        <Col span={5}>
          <Menu />
        </Col>
        <Col span={19}>
          <Routes>
            <Route index path="*" element={Home()} />
            <Route index path="/product-register" element={ProductRegister()} />
          </Routes>
        </Col>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    );
  }
};
