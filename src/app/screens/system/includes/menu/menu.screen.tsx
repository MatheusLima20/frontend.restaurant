import React, { useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import { Button, Col, Menu, Row } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { BsAndroid, BsGraphUp } from 'react-icons/bs';
import { BiHome } from 'react-icons/bi';
import { FaBox } from 'react-icons/fa';
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
    <a href="/system/" className="menu">
      Home
    </a>,
    '1',
    <BiHome size={25} />,
  ),
  getItem(
    <a href="/system/product-register/" className="menu">
      Cadastro de Produtos
    </a>,
    '2',
    <FaBox size={20} />,
  ),
  getItem(
    <a href="/system/system2/" className="menu">
      Relatórios
    </a>,
    '3',
    <BsGraphUp size={20} />,
  ),

  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [
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
    <Content>
      <Row>
        <Col>
          <div>
            <BsAndroid size={70} />
          </div>

          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
            items={items}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Col>
      </Row>
    </Content>
  );
};
