import { Button, Col, Result, Row } from 'antd';
import { ReportsMobileSpendingChart } from './reports.mobile.spending.chart';
import { UserDataLogged } from '../../../../../types/user/user';
import { cookies } from '../../../../../controller/user/adm.cookies';
import { Plan } from '../../../../../types/plan/plan';
import { IoDiamondOutline } from 'react-icons/io5';

type Props = {
  style: any;
};

const user: UserDataLogged = cookies.get('data.user');

const textContact = 'Olá%20gostaria%20de%20mudar%20o%20plano';

export const ReportsMobileSpendingScreen = (props: Props) => {
  const plan: Plan = user.plan as any;
  const isInitial = plan === 'Iniciante';

  return (
    <Row style={props.style}>
      {!isInitial && (
        <Col span={22}>
          <ReportsMobileSpendingChart />
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
