import React from 'react';
import { Col, Row, Tabs } from 'antd';
import './menu.css';
import { BiHome } from 'react-icons/bi';
import { FaMoneyBill, FaSellsy } from 'react-icons/fa';
import { HomeMobile } from '../../screens/home';
import { ReportsMobileSpending } from '../../screens/reports/spending';
import { ReportMobileSell } from '../../screens/reports/sell';

const items = [
  { Icon: BiHome, label: 'Home', children: HomeMobile },
  { Icon: FaSellsy, label: 'Gastos', children: ReportsMobileSpending },
  { Icon: FaMoneyBill, label: 'Vendas', children: ReportMobileSell },
];

export const MenuMobileScreen = () => {
  return (
    <Row className="border border-4">
      <Col span={24}>
        <Tabs
          defaultActiveKey="2"
          tabPosition="bottom"
          className="menu"
          centered={true}
          items={items.map((value, i) => {
            const id = String(i + 1);
            const label = value.label;
            return {
              key: id,
              label: <strong>{label}</strong>,
              icon: <value.Icon />,
              children: <value.children />,
            };
          })}
        />
      </Col>
    </Row>
  );
};
