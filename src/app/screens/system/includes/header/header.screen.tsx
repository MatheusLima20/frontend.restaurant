import React from 'react';
import { Button, Col, Popconfirm, Row } from 'antd';
import { Images } from '../../../../config/images';
import { BiPowerOff } from 'react-icons/bi';

export const HeaderScreen = () => {
  const logout = () => {
    document.location = '/logout/';
  };

  return (
    <Row justify={'space-between'} align={'middle'} className="mt-2 ms-1">
      <Col>
        <img src={Images.logo} width={'50%'} draggable={false} />
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
  );
};
