import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { SellOrderMobile } from '../screens/sells/orders';
import { cookies } from '../../../controller/user/adm.cookies';
import { UserType } from '../../../types/user/user';
import { MenuMobile } from '../includes/menu';
import { Images } from '../../../config/images';
import { KitchenMobile } from '../screens/kitchen';

const user = cookies.get('data.user');

export const SystemMobileRoutes = () => {
  return userRoutes();

  function userRoutes() {
    const userType: UserType = user.userType;

    if (userType === 'SUPER') {
      return (
        <Layout style={{ backgroundColor: '#d3d3d3' }}>
          <Layout.Header style={{ backgroundColor: '#d3d3d3', height: 50 }}>
            <img
              src={Images.logo}
              width={40}
              style={{ marginTop: -15, marginLeft: -30 }}
            />
          </Layout.Header>
          <Layout.Content style={{ height: '100%' }}>
            <MenuMobile />
          </Layout.Content>
        </Layout>
      );
    }

    if (userType === 'COOK') {
      return (
        <Layout style={{ backgroundColor: '#d3d3d3' }}>
          <Layout.Content>
            <Routes>
              <Route index path="*" element={KitchenMobile()} />
            </Routes>
          </Layout.Content>
        </Layout>
      );
    }

    return (
      <Layout style={{ backgroundColor: '#d3d3d3' }}>
        <Layout.Content>
          <Routes>
            <Route index path="*" element={SellOrderMobile()} />
          </Routes>
        </Layout.Content>
      </Layout>
    );
  }
};
