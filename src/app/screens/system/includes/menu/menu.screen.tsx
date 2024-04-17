import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { BsGraphUp } from 'react-icons/bs';
import { BiHome, BiUserCircle } from 'react-icons/bi';
import { FaBox } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import './menu.css';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <a href="/" className="menu">
      Home
    </a>,
    'sub1',
    <BiHome size={20} />,
  ),
  getItem('Cadastro', 'sub2', <TfiWrite size={20} />, [
    getItem(
      <a href="/product-register/" className="menu">
        Produtos
      </a>,
      '2',
      <FaBox size={20} />,
    ),
    getItem(
      <a href="/user-register/" className="menu">
        Usuário
      </a>,
      '3',
      <BiUserCircle size={20} />,
    ),
  ]),
  getItem(
    <a href="/system2/" className="menu">
      Relatórios
    </a>,
    'sub3',
    <BsGraphUp size={20} />,
  ),

  getItem('Navigation One', 'sub4', <MailOutlined size={20} />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),

  getItem('Navigation Two', 'sub5', <AppstoreOutlined size={20} />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub6', null, [
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ]),
];

export const MenuScreen = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Layout style={{ backgroundColor: 'white' }}>
        <Button type="primary" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </Layout>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: 'white' }}
      >
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
      </Layout.Sider>
    </div>
  );
};
