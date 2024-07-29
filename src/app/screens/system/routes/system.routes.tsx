import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Menu } from '../includes/menu';
import { Layout } from 'antd';
import { Footer } from '../includes/footer';
import { ProductRegister } from '../screens/register/products';
import { SpendingRegister } from '../screens/register/spending';
import { SellOrder } from '../screens/sell/order';
import { BoxDay } from '../screens/register/box.day';
import { Header } from '../includes/header';
import { Users } from '../screens/register/users';
import { StockRecord } from '../screens/register/stock';
import { ReportsSpending } from '../screens/reports/spending';
import { ReportSell } from '../screens/reports/sell';
import { Profit } from '../screens/reports/profit';

export const SystemRoutes = () => {
  return userRoutes();

  function userRoutes() {
    return (
      <Layout style={{ backgroundColor: '#f0f0f0' }}>
        <Menu />

        <Layout style={{ backgroundColor: '#f0f0f0' }}>
          <Layout.Header style={{ backgroundColor: '#f0f0f0' }}>
            <Header />
          </Layout.Header>
          <Layout.Content className="ms-3">
            <Routes>
              <Route index path="*" element={ProductRegister()} />
              <Route index path="/spending/" element={SpendingRegister()} />
              <Route
                index
                path="/product-register"
                element={ProductRegister()}
              />
              <Route index path="/stock-record" element={StockRecord()} />

              <Route index path="/order" element={SellOrder()} />
              <Route index path="/box-day" element={BoxDay()} />
              <Route index path="/users" element={Users()} />

              <Route
                index
                path="/reports/spending/"
                element={ReportsSpending()}
              />
              <Route index path="/reports/sells/" element={ReportSell()} />
              <Route index path="/reports/profit/" element={Profit()} />
            </Routes>
          </Layout.Content>
          <Layout.Footer style={{ backgroundColor: '#f0f0f0' }}>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
};
