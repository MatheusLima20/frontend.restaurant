import React from 'react';
import { Col, Row } from 'antd';
import { Order } from '../../../../../types/order/order';
import { OrginizeArrays } from '../../../../../util/arrays/organize';
import { Product } from '../../../../../types/product/product';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';

type Props = {
  products: Product[];
  orders: Order[];
  graphic: any;
};

export const ReportDetails = (props: Props) => {
  const graphic = props.graphic;
  const orders = props.orders;
  const ordersJoin = OrginizeArrays.byAmount(orders, 'productName');
  const products = props.products;
  const notSells = products.map((product) => {
    const order = orders.find((order) => order.productName === product.name);
    if (!order) {
      return product;
    }
    return;
  });

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
      <Col span={24} className="mt-5">
        <Row justify={'space-between'} gutter={[10, 10]}>
          <Col span={8}>
            <h2>
              <strong>+ Vendidos</strong>
            </h2>
            {ordersJoin
              .sort((a, b) => b.amount - a.amount)
              .slice(0, 10)
              .map((product, index) => {
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{product.productName}</Col>
                    <Col>
                      <strong>X {product.amount}</strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
          <Col span={8}>
            <h2>
              <strong>- Vendidos</strong>
            </h2>
            {ordersJoin
              .sort((a, b) => a.amount - b.amount)
              .slice(1, 10)
              .map((product, index) => {
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{product.productName}</Col>
                    <Col>
                      <strong>X {product.amount}</strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
          <Col span={8}>
            <h2>
              <strong>Não Vendidos</strong>
            </h2>
            {notSells
              .sort((a, b) => a.name.localeCompare(b.name))
              .filter((item) => item)
              .map((product, index) => {
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{product.name}</Col>
                    <Col>
                      <strong>X {product.amount}</strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      </Col>
      <Col span={24} className="mt-5">
        <Row justify={'space-between'} gutter={[10, 10]}>
          <Col md={8}>
            <h2>
              <strong>+ Vendidos em R$</strong>
            </h2>
            {ordersJoin
              .sort((a, b) => {
                const totalA = a.value * a.amount;
                const totalB = b.value * b.amount;
                return totalB - totalA;
              })
              .slice(0, 10)
              .map((product, index) => {
                const total = product.amount * product.value;
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{product.productName}</Col>
                    <Col>
                      <strong>{StringFormatter.realNumber(total)}</strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
          <Col md={8}>
            <h2>
              <strong>- Vendidos em R$</strong>
            </h2>
            {ordersJoin
              .sort((a, b) => {
                const totalA = a.value * a.amount;
                const totalB = b.value * b.amount;
                return totalA - totalB;
              })
              .slice(1, 10)
              .map((product, index) => {
                const total = product.amount * product.value;
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{product.productName}</Col>
                    <Col>
                      <strong>{StringFormatter.realNumber(total)}</strong>
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
