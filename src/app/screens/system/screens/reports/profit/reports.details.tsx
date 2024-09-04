import React, { forwardRef } from 'react';
import { Col, Row } from 'antd';
import { Order } from '../../../../../types/order/order';
import { OrginizeArrays } from '../../../../../util/arrays/organize';
import { Product } from '../../../../../types/product/product';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';
import dayjs from 'dayjs';
import { GiMeal } from 'react-icons/gi';
import { FaGlassWater } from 'react-icons/fa6';

type Props = {
  products: Product[];
  orders: Order[];
  graphic: any;
};

export const ReportDetails = forwardRef(function ReportDetails(
  props: Props,
  ref: any,
) {
  const graphic = props.graphic;
  const orders = props.orders;
  const ordersJoin = OrginizeArrays.ordersByAmount(orders, 'productName');
  const products = props.products;
  const notSells = products.map((product) => {
    const order = orders.find((order) => order.productName === product.name);
    if (!order) {
      return product;
    }
    return;
  });

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
        <Row justify={'space-between'} gutter={[10, 10]}>
          <Col span={8}>
            <h2>
              <strong>+ Vendidos</strong>
            </h2>
            {ordersJoin
              .sort((a, b) => b.amount - a.amount)
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
                      {product.name}
                    </Col>
                    <Col>
                      <strong>X {product.amount}</strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      </Col>
      <Col span={22} className="mt-5">
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
                      <strong>{StringFormatter.realNumber(total)}</strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
          <Col md={10}>
            <h2>
              <strong>- Vendidos em R$</strong>
            </h2>
            {ordersJoin
              .sort((a, b) => {
                const totalA = a.value * a.amount;
                const totalB = b.value * b.amount;
                return totalA - totalB;
              })
              .slice(0, 10)
              .map((product, index) => {
                const total = product.amount * product.value;
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
                      <strong>{StringFormatter.realNumber(total)}</strong>
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
              <strong>Mais Rapidos</strong>
            </h2>
            {orders
              .filter((value) => value.deliveryDate)
              .sort((a, b) => {
                const date1A = dayjs(a.deliveryDate);
                const date2A = dayjs(a.createdAt);

                const minutesA = date1A.diff(date2A, 'minutes', true);

                const date1B = dayjs(b.deliveryDate);
                const date2B = dayjs(b.createdAt);

                const minutesB = date1B.diff(date2B, 'minutes', true);

                const totalMinutes = minutesA - minutesB;

                return totalMinutes;
              })
              .slice(0, 20)
              .map((product, index) => {
                const date1 = dayjs(product.deliveryDate);
                const date2 = dayjs(product.createdAt);

                const minutes = date1.diff(date2, 'minutes', true);

                const createdAt = dayjs(product.createdAt).format('HH:mm:ss');
                const deliveredAt = dayjs(product.deliveryDate).format(
                  'HH:mm:ss',
                );
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
                      <strong>{createdAt}</strong>
                    </Col>
                    <Col>
                      <strong>{deliveredAt}</strong>
                    </Col>
                    <Col>
                      <strong>{minutes.toFixed(2)} minutos</strong>
                    </Col>
                  </Row>
                );
              })}
          </Col>
          <Col md={10}>
            <h2>
              <strong>Mais Demorados</strong>
            </h2>
            {orders
              .filter((value) => value.deliveryDate)
              .sort((a, b) => {
                const date1A = dayjs(a.deliveryDate);
                const date2A = dayjs(a.createdAt);

                const minutesA = date1A.diff(date2A, 'minutes', true);

                const date1B = dayjs(b.deliveryDate);
                const date2B = dayjs(b.createdAt);

                const minutesB = date1B.diff(date2B, 'minute', true);

                const totalMinutes = minutesB - minutesA;

                return totalMinutes;
              })
              .slice(0, 20)
              .map((product, index) => {
                const date1 = dayjs(product.deliveryDate);
                const date2 = dayjs(product.createdAt);

                const minutes = date1.diff(date2, 'minute', true);

                const createdAt = dayjs(product.createdAt).format('HH:mm:ss');
                const deliveredAt = dayjs(product.deliveryDate).format(
                  'HH:mm:ss',
                );
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
                      <strong>{createdAt}</strong>
                    </Col>
                    <Col>
                      <strong>{deliveredAt}</strong>
                    </Col>
                    <Col>
                      <strong>{minutes.toFixed(2)} minutos</strong>
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
