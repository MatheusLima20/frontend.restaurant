import React from 'react';
import { Col, Row } from 'antd';
import { Order } from '../../../../../types/order/order';
import { OrginizeArrays } from '../../../../../util/arrays/organize';
import { Product } from '../../../../../types/product/product';

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
              <strong>Mais Vendidos</strong>
            </h2>
            {ordersJoin
              .sort((a, b) => b.amount - a.amount)
              .map((product, index) => {
                if (index > 9) {
                  return;
                }
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{product.productName}</Col>
                    <Col>X {product.amount}</Col>
                  </Row>
                );
              })}
          </Col>
          <Col span={8}>
            <h2>
              <strong>Menos Vendidos</strong>
            </h2>
            {ordersJoin
              .sort((a, b) => a.amount - b.amount)
              .map((product, index) => {
                if (index > 9) {
                  return;
                }
                return (
                  <Row key={index} gutter={[20, 20]}>
                    <Col>{product.productName}</Col>
                    <Col>X {product.amount}</Col>
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
                    <Col>X {product.amount}</Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
