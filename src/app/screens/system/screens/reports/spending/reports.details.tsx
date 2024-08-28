import React, { forwardRef } from 'react';
import { Col, Row } from 'antd';
import { Spending } from '../../../../../types/spending/spending';
import { OrginizeArrays } from '../../../../../util/arrays/organize';
import dayjs from 'dayjs';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';

type Props = {
  spendig: Spending[];
  graphic: any;
  total: number;
  ref: any;
};

export const ReportDetails = forwardRef(function ReportDetails(
  props: Props,
  ref: any,
) {
  const graphic = props.graphic;
  const spendigs: Spending[] = OrginizeArrays.groupBy(props.spendig, 'amount');
  const total = props.total;

  return (
    <Row justify={'center'} ref={ref}>
      <Col span={22} className="text-center">
        <h3>
          <strong>Detalhes</strong>
        </h3>
      </Col>
      <Col span={22} className="text-center mt-4">
        <h6>
          <strong>{StringFormatter.realNumber(total)}</strong>
        </h6>
      </Col>
      <Col>
        <img src={graphic ? graphic.toDataURL() : ''} />
      </Col>
      <Col span={22} className="mt-5">
        <Row justify={'space-between'} gutter={[10, 10]}>
          <Col md={10}>
            <h2>
              <strong>
                <BiPlusCircle /> Comprados
              </strong>
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
          <Col md={10}>
            <h2>
              <strong>
                <BiMinusCircle /> Comprados
              </strong>
            </h2>
            {spendigs
              .sort((a, b) => a.amount - b.amount)
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
      <Col span={22} className="mt-5">
        <Row justify={'space-between'} gutter={[10, 10]}>
          <Col md={10}>
            <h2>
              <strong>
                <BiPlusCircle /> Gastos
              </strong>
            </h2>
            {spendigs
              .sort((a, b) => {
                const totalA = a.amount * a.value;

                const totalB = b.amount * b.value;

                const total = totalB - totalA;

                return total;
              })
              .slice(0, 20)
              .map((spending, index) => {
                const createdAt = dayjs(spending.createdAt).format('DD');
                const total = spending.amount * spending.value;
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{spending.name}</Col>
                    <Col>{StringFormatter.realNumber(total)}</Col>
                    <Col>{spending.unitMeasurement}</Col>
                    <Col>
                      <strong> Dia {createdAt}</strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
          <Col md={10}>
            <h2>
              <strong>
                <BiMinusCircle /> Gastos
              </strong>
            </h2>
            {spendigs
              .sort((a, b) => {
                const totalA = a.amount * a.value;

                const totalB = b.amount * b.value;

                const total = totalA - totalB;

                return total;
              })
              .slice(0, 20)
              .map((spending, index) => {
                const createdAt = dayjs(spending.createdAt).format('DD');
                const total = spending.amount * spending.value;
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{spending.name}</Col>
                    <Col>{StringFormatter.realNumber(total)}</Col>
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
});
