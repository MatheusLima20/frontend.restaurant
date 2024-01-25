import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Menu } from '../includes/menu';
import { Home } from '../screens/home';
import { Col, Row } from 'antd';
import { Footer } from '../includes/footer';


export const SystemRoutes = () => {

  return userRoutes();

  function userRoutes() {
    return (
      <Row gutter={[30, 0]}>
        <Col>
          <Menu />
        </Col>
        <Col>
          <Routes>
            <Route index path="*" element={Home()} />
          </Routes>
          <Routes>
            <Route index path="/system/system2" element={Home()} />
          </Routes>
        </Col>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    );

  }
};
