import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Menu } from '../includes/menu';
import { Home } from '../screens/home';
import { Layout } from 'antd';
import { Footer } from '../includes/footer';
import { ProductRegister } from '../screens/register/products';
import { BsAndroid } from 'react-icons/bs';
import { SpendingRegister } from '../screens/register/spending';

export const SystemRoutes = () => {
  return userRoutes();

  function userRoutes() {
    return (
      <Layout style={{ backgroundColor: 'white' }}>
        <Menu />

        <Layout style={{ backgroundColor: 'white' }}>
          <Layout.Header style={{ backgroundColor: 'white' }}>
            <BsAndroid size={70} />
          </Layout.Header>
          <Layout.Content className="ms-3">
            <Routes>
              <Route index path="*" element={Home()} />
              <Route index path="/spending/" element={SpendingRegister()} />
              <Route
                index
                path="/product-register"
                element={ProductRegister()}
              />
            </Routes>
          </Layout.Content>
          <Layout.Footer style={{ backgroundColor: 'white' }}>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
};
