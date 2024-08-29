import React from 'react';
import { Button, Col, Result, Row } from 'antd';
import { ProfitMobileChart } from './profit.mobile.chat';
import { cookies } from '../../../../../controller/user/adm.cookies';
import { UserDataLogged } from '../../../../../types/user/user';
import { Plan } from '../../../../../types/plan/plan';
import { IoDiamondOutline } from 'react-icons/io5';

type Props = {
  style: any;
};

const user: UserDataLogged = cookies.get('data.user');

export const ProfitMobileScreen = (props: Props) => {
  const plan: Plan = user.plan as any;
  const isInitial = plan === 'Iniciante' || plan === 'Profissional';

  return (
    <Row style={props.style}>
      {!isInitial && (
        <Col span={22}>
          <ProfitMobileChart />
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
