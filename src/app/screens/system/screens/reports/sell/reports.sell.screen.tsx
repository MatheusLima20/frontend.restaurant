import React from 'react';
import { Button, Col, Result, Row } from 'antd';
import { ReportsSellChart } from './reports.sell.chart';
import { cookies } from '../../../../../controller/user/adm.cookies';
import { UserDataLogged } from '../../../../../types/user/user';
import { Plan } from '../../../../../types/plan/plan';
import { IoDiamondOutline } from 'react-icons/io5';

const textContact = 'Olá%20gostaria%20de%20mudar%20o%20plano';

const user: UserDataLogged = cookies.get('data.user');

export const ReportsSellScreen = () => {
  const plan: Plan = user.plan as any;
  const isInitial = plan === 'Iniciante';

  return (
    <Row className="mt-5">
      {!isInitial && (
        <Col span={22}>
          <ReportsSellChart />
        </Col>
      )}

      {isInitial && (
        <Col span={22}>
          <Result
            icon={<IoDiamondOutline size={70} />}
            title="Essa é uma funcionalidade Pro e Premium!"
            extra={
              <Button
                style={{ textDecoration: 'none' }}
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=5585999099248&text=${textContact}`}
                type="primary"
              >
                Mudar Plano
              </Button>
            }
          />
        </Col>
      )}
    </Row>
  );
};
