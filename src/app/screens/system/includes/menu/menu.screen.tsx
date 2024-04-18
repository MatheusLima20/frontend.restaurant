import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { BsGraphUp } from 'react-icons/bs';
import { BiHome, BiUserCircle } from 'react-icons/bi';
import { FaBox, FaMoneyBill, FaMoneyBillWaveAlt } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import './menu.css';
import { GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import { MdSettings } from 'react-icons/md';

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
      '1',
      <FaBox size={20} />,
    ),
    getItem(
      <a href="/spending/" className="menu">
        Investimentos
      </a>,
      '2',
      <FaMoneyBillWaveAlt size={20} />,
    ),
    getItem(
      <a href="/user-register/" className="menu">
        Usuário
      </a>,
      '3',
      <BiUserCircle size={20} />,
    ),
  ]),

  getItem('Relatórios', 'sub3', <BsGraphUp size={20} />, [
    getItem(
      <a href="/system2/" className="menu">
        Investimentos
      </a>,
      'rel01',
      <FaMoneyBill size={20} />,
    ),
    getItem(
      <a href="/system2/" className="menu">
        Vendas
      </a>,
      'rel02',
      <GiReceiveMoney size={20} />,
    ),
    getItem(
      <a href="/system2/" className="menu">
        Lucro
      </a>,
      'rel03',
      <GiTakeMyMoney size={20} />,
    ),
  ]),
  getItem('Configurações', 'sub4', <MdSettings size={20} />, [
    getItem(
      <a href="/system2/" className="menu">
        Investimentos
      </a>,
      'sub01',
      <FaMoneyBill size={20} />,
    ),
    getItem(
      <a href="/system2/" className="menu">
        Vendas
      </a>,
      'sub02',
      <GiReceiveMoney size={20} />,
    ),
    getItem(
      <a href="/system2/" className="menu">
        Lucro
      </a>,
      'sub03',
      <GiTakeMyMoney size={20} />,
    ),
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
          defaultOpenKeys={['sub2', 'sub3']}
          inlineCollapsed={collapsed}
          items={items}
        />
      </Layout.Sider>
    </div>
  );
};
