import React from 'react';
import { Button, Col, Popconfirm, Row } from 'antd';
import { GiHotMeal } from 'react-icons/gi';
import { KitchenMobileCards } from './kitchen.mobile.cards';
import { BiPowerOff } from 'react-icons/bi';

export const KitchenMobileScreen = () => {
  const logout = () => {
    document.location = '/logout/';
  };

  return (
    <Row gutter={[0, 50]}>
      <Col
        span={24}
        className="text-start"
        style={{ backgroundColor: 'red', height: 50 }}
      >
        <Row justify={'space-between'} align={'middle'} className="m-1">
          <Col>
            <h2 className="mt-2 ms-3 ">
              <GiHotMeal className="text-white " size={35} />{' '}
              <strong className="text-white ">Pedidos</strong>
            </h2>
          </Col>
          <Col>
            <Popconfirm
              title="Sair da Conta"
              placement="bottomLeft"
              description="Deseja realmente Sair?"
              onConfirm={logout}
              okText="Sim"
              cancelText="Não"
            >
              <Button type="primary" danger>
                <BiPowerOff size={20} />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <KitchenMobileCards />
      </Col>
    </Row>
  );
};
