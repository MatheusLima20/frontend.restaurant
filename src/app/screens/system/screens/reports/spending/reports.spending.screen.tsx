import { Button, Col, Result, Row } from 'antd';
import { ReportsSpendingChart } from './reports.spending.chart';
import { cookies } from '../../../../../controller/user/adm.cookies';
import { UserDataLogged } from '../../../../../types/user/user';
import { Plan } from '../../../../../types/plan/plan';
import { IoDiamondOutline } from 'react-icons/io5';

const user: UserDataLogged = cookies.get('data.user');

const textContact = 'Olá%20gostaria%20de%20mudar%20o%20plano';

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
            extra={
              <Button
                style={{ textDecoration: 'none' }}
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=5585992669501&text=${textContact}`}
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
