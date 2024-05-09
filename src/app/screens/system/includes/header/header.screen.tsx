import React from 'react';
import { Col, Row } from 'antd';
import { Images } from '../../../../config/images';

export const HeaderScreen = () => {
  return (
    <Row className="mt-2 ms-1">
      <Col>
        <img src={Images.logo} width={'60%'} draggable={false} />
      </Col>
    </Row>
  );
};
