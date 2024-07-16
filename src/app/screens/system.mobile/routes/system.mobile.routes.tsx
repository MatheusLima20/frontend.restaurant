import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { SellOrderMobile } from '../screens/sells/orders';
import { cookies } from '../../../controller/user/adm.cookies';
import { UserType } from '../../../types/user/user';
import { MenuMobile } from '../includes/menu';

const user = cookies.get('data.user');

export const SystemMobileRoutes = () => {
  return userRoutes();

  function userRoutes() {
    const userType: UserType = user.userType;

    if (userType === 'SUPER') {
      return (
        <Layout style={{ backgroundColor: 'white', height: '100%' }}>
          <Layout.Content style={{ height: '100%' }}>
            <MenuMobile />
          </Layout.Content>
        </Layout>
      );
    }

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
