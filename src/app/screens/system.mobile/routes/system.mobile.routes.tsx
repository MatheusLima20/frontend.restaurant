import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

export const SystemMobileRoutes = () => {
  return userRoutes();

  function userRoutes() {
    return (
      <Layout style={{ backgroundColor: 'white' }}>
        <Layout.Content className="ms-3">
          <Routes>
            <Route index path="*" />
          </Routes>
        </Layout.Content>
        <Layout.Footer style={{ backgroundColor: 'white' }}></Layout.Footer>
      </Layout>
    );
  }
};
