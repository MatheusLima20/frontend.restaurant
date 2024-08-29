import React from 'react';
import { Button, Col, Result, Row } from 'antd';
import { ReportsSpendingChart } from './reports.spending.chart';
import { cookies } from '../../../../../controller/user/adm.cookies';
import { UserDataLogged } from '../../../../../types/user/user';
import { Plan } from '../../../../../types/plan/plan';
import { IoDiamondOutline } from 'react-icons/io5';

const user: UserDataLogged = cookies.get('data.user');

export const ReportsSpendingScreen = () => {
  const plan: Plan = user.plan as any;
  const isInitial = plan === 'Iniciante';

  return (
    <Row className="mt-5">
      {!isInitial && (
        <Col span={22}>
          <ReportsSpendingChart />
        </Col>
      )}
      {isInitial && (
        <Col span={22}>
          <Result
            icon={<IoDiamondOutline size={70} />}
            title="Essa é uma funcionalidade Pro e Premium!"
            extra={<Button type="primary">Mudar Plano</Button>}
          />
        </Col>
      )}
    </Row>
  );
};
