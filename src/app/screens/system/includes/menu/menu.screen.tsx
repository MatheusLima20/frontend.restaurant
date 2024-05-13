import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { BsGraphUp } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { FaBoxOpen, FaMoneyBill, FaSellsy } from 'react-icons/fa';
import './menu.css';
import {
  GiArchiveRegister,
  GiHotMeal,
  GiMeal,
  GiReceiveMoney,
  GiTakeMyMoney,
} from 'react-icons/gi';
import { MdDeliveryDining, MdSettings } from 'react-icons/md';
import { FaHandHoldingDollar } from 'react-icons/fa6';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  disabled?: boolean,
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Vender', 'sub2', <FaHandHoldingDollar size={20} />, [
    getItem(
      <a href="/order/" className="menu">
        Pedidos
      </a>,
      'ven1',
      <GiHotMeal size={20} />,
    ),
    getItem(
      <div className="menu">Delivery</div>,
      'ven2',
      <MdDeliveryDining size={20} />,
      null,
      true,
    ),
  ]),
  getItem('Cadastro', 'sub3', <GiArchiveRegister size={20} />, [
    getItem(
      <a href="/product-register/" className="menu">
        Produtos
      </a>,
      'cad1',
      <GiMeal size={20} />,
    ),
    getItem(
      <a href="/box-day/" className="menu">
        Caixa
      </a>,
      'cad2',
      <FaBoxOpen size={20} />,
    ),
    getItem(
      <a href="/spending/" className="menu">
        Gastos
      </a>,
      'cad3',
      <FaSellsy size={20} />,
    ),
    getItem(
      <div className="menu">Usuários</div>,
      'cad4',
      <BiUserCircle size={20} />,
      undefined,
      true,
    ),
  ]),
  getItem(
    'Relatórios',
    'sub4',
    <BsGraphUp size={20} />,
    [
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
    ],
    true,
  ),
  getItem(
    'Configurações',
    'sub5',
    <MdSettings size={20} />,
    [
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
    ],
    true,
  ),
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
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
          inlineCollapsed={collapsed}
          items={items}
        />
      </Layout.Sider>
    </div>
  );
};
