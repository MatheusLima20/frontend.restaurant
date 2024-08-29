import React from 'react';
import { Button, Col, Result, Row } from 'antd';
import { ProfitChart } from './profit.chat';
import { UserDataLogged } from '../../../../../types/user/user';
import { cookies } from '../../../../../controller/user/adm.cookies';
import { Plan } from '../../../../../types/plan/plan';
import { IoDiamondOutline } from 'react-icons/io5';

const user: UserDataLogged = cookies.get('data.user');

export const ProfitScreen = () => {
  const plan: Plan = user.plan as any;
  const isInitial = plan === 'Iniciante' || plan === 'Profissional';

  return (
    <Row className="mt-5">
      {!isInitial && (
        <Col span={22}>
          <ProfitChart />
        </Col>
      )}

      {isInitial && (
        <Col span={22}>
          <Result
            icon={<IoDiamondOutline size={70} />}
            title="Essa é uma funcionalidade Premium!"
            extra={<Button type="primary">Assinar Premium</Button>}
          />
        </Col>
      )}
    </Row>
  );
};
