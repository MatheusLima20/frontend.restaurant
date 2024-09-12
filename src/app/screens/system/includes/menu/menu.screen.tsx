import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { BsBox2Fill, BsGraphUp } from 'react-icons/bs';
import { BiMoneyWithdraw, BiUserCircle } from 'react-icons/bi';
import { FaBoxOpen, FaMoneyBill, FaSellsy } from 'react-icons/fa';
import './menu.css';
import {
  GiArchiveRegister,
  GiHotMeal,
  GiMeal,
  GiReceiveMoney,
  GiTakeMyMoney,
} from 'react-icons/gi';
import { MdAccountCircle, MdDeliveryDining, MdSettings } from 'react-icons/md';
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
      <a href="/plates-register/" className="menu">
        Produtos
      </a>,
      'cad1',
      <GiMeal size={20} />,
    ),
    getItem(
      <a href="/stock-record/" className="menu">
        Estoque
      </a>,
      'cad2',
      <BsBox2Fill size={20} />,
    ),
    getItem(
      <a href="/box-day/" className="menu">
        Caixa
      </a>,
      'cad3',
      <FaBoxOpen size={20} />,
    ),
    getItem(
      <a href="/spending/" className="menu">
        Gastos
      </a>,
      'cad4',
      <FaSellsy size={20} />,
    ),
    getItem(
      <a href="/users" className="menu">
        Usuários
      </a>,
      'cad5',
      <BiUserCircle size={20} />,
    ),
  ]),
  getItem('Relatórios', 'sub4', <BsGraphUp size={20} />, [
    getItem(
      <a href="/reports/sells/" className="menu">
        Vendas
      </a>,
      'rel02',
      <GiReceiveMoney size={20} />,
    ),
    getItem(
      <a href="/reports/spending/" className="menu">
        Gastos
      </a>,
      'rel01',
      <FaMoneyBill size={20} />,
    ),
    getItem(
      <a href="/reports/profit/" className="menu">
        Lucro
      </a>,
      'rel03',
      <GiTakeMyMoney size={20} />,
    ),
  ]),
  getItem(
    'Conta',
    'sub5',
    <MdAccountCircle size={20} />,
    [
      getItem(
        <a href="/payments/system/" className="menu">
          Pagamentos
        </a>,
        'finan01',
        <BiMoneyWithdraw size={20} />,
      ),
    ],
    false,
  ),
  getItem(
    'Configurações',
    'sub6',
    <MdSettings size={20} />,
    [
      getItem(
        <a href="/system2/" className="menu">
          Investimentos
        </a>,
        'conf01',
        <FaMoneyBill size={20} />,
      ),
      getItem(
        <a href="/system2/" className="menu">
          Vendas
        </a>,
        'conf02',
        <GiReceiveMoney size={20} />,
      ),
      getItem(
        <a href="/system2/" className="menu">
          Lucro
        </a>,
        'conf03',
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
        defaultValue={0}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: 'white' }}
      >
        <Menu
          mode="inline"
          theme="light"
          defaultSelectedKeys={['sub2']}
          defaultOpenKeys={['sub2', 'sub3', 'sub4', 'sub5']}
          items={items}
        />
      </Layout.Sider>
    </div>
  );
};
