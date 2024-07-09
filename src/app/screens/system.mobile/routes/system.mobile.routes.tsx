import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { SellOrderMobile } from '../screens/sells/orders';

export const SystemMobileRoutes = () => {
  return userRoutes();

  function userRoutes() {
    return (
      <Layout style={{ backgroundColor: 'white' }}>
        <Layout.Content>
          <Routes>
            <Route index path="*" element={SellOrderMobile()} />
          </Routes>
        </Layout.Content>
      </Layout>
    );
  }
};
