import React from 'react';
import { Col, Row } from 'antd';
import { Spending } from '../../../../../types/spending/spending';
import { OrginizeArrays } from '../../../../../util/arrays/organize';
import dayjs from 'dayjs';

type Props = {
  spendig: Spending[];
  graphic: any;
};

export const ReportDetails = (props: Props) => {
  const graphic = props.graphic;
  const spendigs: Spending[] = OrginizeArrays.groupBy(props.spendig, 'amount');

  return (
    <Row justify={'center'}>
      <Col span={22} className="text-center">
        <h3>
          <strong>Detalhes</strong>
        </h3>
      </Col>
      <Col>
        <img src={graphic ? graphic.toDataURL() : ''} />
      </Col>
      <Col span={22} className="mt-5">
        <Row justify={'space-between'} gutter={[10, 10]}>
          <Col md={10}>
            <h2>
              <strong>Mais Comprados</strong>
            </h2>
            {spendigs
              .sort((a, b) => b.amount - a.amount)
              .slice(0, 20)
              .map((spending, index) => {
                const createdAt = dayjs(spending.createdAt).format('DD');
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{spending.name}</Col>
                    <Col> X {spending.amount} </Col>
                    <Col>{spending.unitMeasurement}</Col>
                    <Col>
                      <strong> Dia {createdAt}</strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
