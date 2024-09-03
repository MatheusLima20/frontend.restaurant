import React from 'react';
import { Button, Col, Form, Radio, Row, Tabs, TabsProps } from 'antd';
import { BiCheckCircle, BiHappy } from 'react-icons/bi';
import { FiXCircle } from 'react-icons/fi';
import { IoCalendarNumberOutline, IoDiamondOutline } from 'react-icons/io5';
import { MdBusinessCenter } from 'react-icons/md';
import { RiWhatsappFill } from 'react-icons/ri';
import { LiaCalendarWeekSolid } from 'react-icons/lia';

type Props = {
  handleChange: (value: any) => void;
};

const textContact =
  'Olá%20gostaria%20de%20tirar%20duvidas%20sobre%20o%20plano%20Premium';

export const ChoosePlans = (props: Props) => {
  const plans = (isMonth: boolean) => (
    <Col md={24}>
      <Form.Item
        name="plan"
        rules={[
          {
            required: true,
            message: <div className="mt-5">Por favor, escolha um plano!</div>,
          },
        ]}
      >
        <Radio.Group
          name="plan"
          onChange={(value) => props.handleChange(value)}
        >
          <Radio.Button value="Iniciante" className="h-100">
            <div title="Iniciante" className="m-4" style={{ width: 250 }}>
              <div>
                <Row align={'middle'} gutter={[70, 0]}>
                  <Col span={24} className="fs-6 text-center border-2 mt-1">
                    <strong>
                      <br />
                    </strong>
                  </Col>
                </Row>
              </div>
              <div className="mt-4 mb-3">
                <Row align={'middle'} gutter={[70, 0]}>
                  <Col>
                    <BiHappy size={30} />
                  </Col>
                  <Col className="fs-6">
                    <strong>Iniciante</strong>
                  </Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Pedidos Ilimitados</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">1 Caixa Por Dia</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">8 Mesas</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">4 Usuários</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <FiXCircle color="red" size={20} />
                  </Col>
                  <Col className="fs-6">Relatório de Gastos.</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <FiXCircle color="red" size={20} />
                  </Col>
                  <Col className="fs-6">Relatório de Vendas.</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <FiXCircle color="red" size={20} />
                  </Col>
                  <Col className="fs-6">Relatório de Lucro.</Col>
                </Row>
              </div>
              <div>
                <Row justify={'start'} align={'middle'}>
                  <Col>
                    <FiXCircle color="red" size={20} />
                  </Col>
                  <Col className="fs-6">Baixa automatica no estoque.</Col>
                </Row>
              </div>
              <div>
                <Row justify={'center'} align={'middle'}>
                  <Col className="fs-6">
                    {isMonth ? (
                      <strong>Apenas R$ 79,90/Mês</strong>
                    ) : (
                      <strong>Apenas R$ 598,80/Ano</strong>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </Radio.Button>
          <Radio.Button value="Profissional" className="h-100">
            <div title="Profissional" className="m-4" style={{ width: 250 }}>
              <div>
                <Row align={'middle'} gutter={[70, 0]}>
                  <Col span={24} className="text-center">
                    <div className="border rounded-pill border-danger border-2 ">
                      Mais Popular
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="mt-4 mb-3">
                <Row align={'middle'} gutter={[70, 0]}>
                  <Col>
                    <MdBusinessCenter size={30} />
                  </Col>
                  <Col className="fs-6">
                    <strong>Profissional</strong>
                  </Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Pedidos Ilimitados</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">3 Caixas Por Dia</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">20 Mesas</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">8 Usuários</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Relatório de Gastos.</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Relatório de Vendas.</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <FiXCircle color="red" size={20} />
                  </Col>
                  <Col className="fs-6">Relatório de Lucro.</Col>
                </Row>
              </div>
              <div>
                <Row justify={'start'} align={'middle'}>
                  <Col>
                    <FiXCircle color="red" size={20} />
                  </Col>
                  <Col className="fs-6">Baixa automatica no estoque.</Col>
                </Row>
              </div>
              <div>
                <Row justify={'center'} align={'middle'}>
                  <Col className="fs-6">
                    {isMonth ? (
                      <strong>Apenas R$ 149,90/Mês</strong>
                    ) : (
                      <strong>Apenas R$ 1798,80/Ano</strong>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </Radio.Button>
          <Radio.Button value="Premium" className="h-100">
            <div title="Premium" className="m-4" style={{ width: 250 }}>
              <div>
                <Row align={'middle'} gutter={[70, 0]}>
                  <Col span={24} className="fs-6 text-center border-2 mt-1">
                    <strong>
                      <br />
                    </strong>
                  </Col>
                </Row>
              </div>
              <div className="mt-4 mb-3">
                <Row align={'middle'} gutter={[70, 0]}>
                  <Col span={24}>
                    <strong> </strong>
                  </Col>
                  <Col>
                    <IoDiamondOutline size={30} />
                  </Col>
                  <Col className="fs-6">
                    <strong>Premium</strong>
                  </Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Pedidos Ilimitados.</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Caixas: Personalizado.</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Mesas: Personalizado.</Col>
                </Row>
              </div>
              <div>
                <Row justify={'start'} align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Usuários: Personalizado.</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Relatório de Gastos.</Col>
                </Row>
              </div>
              <div>
                <Row align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Relatório de Vendas.</Col>
                </Row>
              </div>
              <div>
                <Row justify={'start'} align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Relatório de Lucro.</Col>
                </Row>
              </div>
              <div>
                <Row justify={'start'} align={'middle'}>
                  <Col>
                    <BiCheckCircle color="green" size={20} />
                  </Col>
                  <Col className="fs-6">Baixa automatica no estoque.</Col>
                </Row>
              </div>
              <div>
                <Row justify={'center'} align={'middle'}>
                  <Col className="fs-6">
                    <Button
                      style={{ textDecoration: 'none' }}
                      target="_blank"
                      href={`https://api.whatsapp.com/send?phone=5585999099248&text=${textContact}`}
                    >
                      <strong>
                        <RiWhatsappFill color="green" size={30} /> Entrar em
                        contato
                      </strong>
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Col>
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      icon: <IoCalendarNumberOutline size={30} />,
      label: 'Plano Mensal',
      children: (
        <Row justify={'center'} className="text-center">
          {plans(true)}
        </Row>
      ),
    },
    {
      key: '0',
      icon: <LiaCalendarWeekSolid size={30} />,
      label: 'Plano Anual',
      children: (
        <Row justify={'center'} className="text-center">
          {plans(false)}
        </Row>
      ),
    },
  ];

  return (
    <Tabs
      className="mt-5"
      defaultActiveKey="1"
      centered
      size="large"
      items={items}
      onChange={(key) => {
        const event = {
          target: {
            name: 'isMonthPlan',
            value: key === '1',
          },
        };
        props.handleChange(event);
      }}
    />
  );
};
