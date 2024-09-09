import React, { forwardRef } from 'react';
import { Col, Row } from 'antd';
import { Profit } from '../../../../../types/product/product';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';
import { GiMeal } from 'react-icons/gi';
import { FaGlassWater } from 'react-icons/fa6';

type Props = {
  profit: Profit[];
  graphic: any;
  totalSell: number;
  totalSpending: number;
};

export const ReportDetails = forwardRef(function ReportDetails(
  props: Props,
  ref: any,
) {
  const graphic = props.graphic;
  const profit = props.profit;
  const totalSpending = props.totalSpending;
  const totalSell = props.totalSell;

  return (
    <Row justify={'center'} ref={ref}>
      <Col span={22} className="text-center">
        <h3>
          <strong>Detalhes</strong>
        </h3>
      </Col>
      <Col>
        <img src={graphic ? graphic.toDataURL() : ''} />
      </Col>
      <Col span={22} className="mt-5">
        <Row>
          <Col>
            <h5>
              <strong>
                Gastos: {StringFormatter.realNumber(totalSpending)}
              </strong>
            </h5>
          </Col>
          <Col>
            <h5>
              <strong>Vendas: {StringFormatter.realNumber(totalSell)}</strong>
            </h5>
          </Col>
          <Col>
            <h5>
              <strong>
                Lucro: {StringFormatter.realNumber(totalSell - totalSpending)}
              </strong>
            </h5>
          </Col>
        </Row>
      </Col>
      <Col span={22} className="mt-5">
        <Row justify={'space-between'} gutter={[10, 10]}>
          <Col span={12}>
            <h2>
              <strong>+ Lucrativos</strong>
            </h2>
            {profit
              .sort((a, b) => b.profit - a.profit)
              .slice(0, 10)
              .map((product, index) => {
                const isDrink =
                  product.productType === 'DRINK' ||
                  product.productType === 'BEBIDA';
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>
                      {!isDrink ? (
                        <GiMeal size={20} />
                      ) : (
                        <FaGlassWater size={20} />
                      )}{' '}
                      {product.productName}
                    </Col>
                    <Col>
                      <strong>
                        Venda:{' '}
                        {StringFormatter.realNumber(product.productValue)}
                      </strong>
                    </Col>
                    <Col>
                      <strong>
                        Lucro: {StringFormatter.realNumber(product.profit)}
                      </strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
          <Col span={12}>
            <h2>
              <strong>- Lucativos</strong>
            </h2>
            {profit
              .sort((a, b) => a.profit - b.profit)
              .slice(0, 10)
              .map((product, index) => {
                const isDrink =
                  product.productType === 'DRINK' ||
                  product.productType === 'BEBIDA';
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>
                      {!isDrink ? (
                        <GiMeal size={20} />
                      ) : (
                        <FaGlassWater size={20} />
                      )}
                      {product.productName}
                    </Col>
                    <Col>
                      <strong>
                        Venda:{' '}
                        {StringFormatter.realNumber(product.productValue)}
                      </strong>
                    </Col>
                    <Col>
                      <strong>
                        Lucro: {StringFormatter.realNumber(product.profit)}
                      </strong>
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
