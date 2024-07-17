import React from 'react';
import { Col, Row, Tabs } from 'antd';
import { FaMoneyBill, FaSellsy } from 'react-icons/fa';
import { ReportsMobileSpending } from '../../screens/reports/spending';
import { ReportMobileSell } from '../../screens/reports/sell';
import { ProfitMobile } from '../../screens/reports/profit';
import { GiHotMeal, GiTakeMyMoney } from 'react-icons/gi';
import './menu.css';
import { SellOrderAddTableScreen } from '../../screens/sells/orders/sell.order.add.table.mobile';

const items = [
  { Icon: FaMoneyBill, label: 'Vendas', children: ReportMobileSell },
  { Icon: FaSellsy, label: 'Gastos', children: ReportsMobileSpending },
  { Icon: GiTakeMyMoney, label: 'Lucro', children: ProfitMobile },
  { Icon: GiHotMeal, label: 'Pedidos', children: SellOrderAddTableScreen },
];

const style = { height: window.innerHeight - 120 };

export const MenuMobileScreen = () => {
  return (
    <Row className="h-100">
      <Col span={24}>
        <Tabs
          defaultActiveKey="1"
          tabPosition="bottom"
          centered={true}
          items={items.map((value, i) => {
            const id = String(i + 1);
            const label = value.label;
            return {
              key: id,
              label: <strong>{label}</strong>,
              icon: <value.Icon size={20} />,
              children: <value.children style={style} />,
            };
          })}
        />
      </Col>
    </Row>
  );
};
