import { Col, List, Row } from 'antd';
import React, { forwardRef } from 'react';
import { Order } from '../../../../../types/order/order';
import { TableRestaurant } from '../../../../../types/table/table';
import { ProductType } from '../../../../../types/product/product';
import dayjs from 'dayjs';
import { OrginizeArrays } from '../../../../../util/arrays/organize';

interface Props {
  tables: TableRestaurant[];
  orders: Order[];
}

const productTypes: ProductType[] = [
  'BEBIDA',
  'GUARNIÇÃO',
  'PETISCO',
  'PRATO',
  'SOBREMESA',
  'DRINK',
];

export const PrintPendings = forwardRef(function order(props: Props, ref: any) {
  const tables = props.tables;
  const orders = props.orders;

  return (
    <Row
      gutter={[0, 50]}
      ref={ref}
      justify={'center'}
      className="text-center mt-5 print-orders"
    >
      {orders.length &&
        productTypes.map((value, index) => {
          const tablesPrint: string[] = [];
          const hasProductType = orders.filter(
            (type) => type.productType === value,
          );

          if (!hasProductType.length) {
            return;
          }
          return (
            <Col span={24} key={index}>
              <div>
                <h3>
                  <strong>{value}</strong>
                </h3>
              </div>
              <List size="large">
                {OrginizeArrays.groupBy(orders, 'idTable')
                  .filter((product) => product.productType === value)
                  .map((item, index) => {
                    const tableName = tables.find(
                      (value) => value.id === item.idTable,
                    ).name;
                    tablesPrint.push(tableName);
                    const lessTwo =
                      tablesPrint.filter((value) => value === tableName)
                        .length < 2;
                    return (
                      <List.Item key={index}>
                        <Row
                          gutter={[20, 0]}
                          justify={'space-between'}
                          className="text-center"
                          style={{ width: '100%' }}
                        >
                          <Col span={24}>
                            <h5>
                              <strong>{lessTwo ? tableName : ''}</strong>
                            </h5>
                          </Col>
                          <Col span={6}>
                            <strong style={{ fontSize: 18 }}>
                              {item.productName}
                            </strong>
                          </Col>
                          <Col span={6}>
                            <div>
                              <strong style={{ fontSize: 18 }}>
                                {' ' + item.amount + ' '}
                              </strong>
                            </div>
                          </Col>
                          <Col span={24} className="text-center">
                            {dayjs(item.createdAt).format(
                              'DD/MM/YYYY HH:mm:ss',
                            )}
                          </Col>
                        </Row>
                      </List.Item>
                    );
                  })}
              </List>
              <div
                style={{
                  width: '100%',
                  borderBottom: 1,
                  borderColor: 'rgba(20, 20, 20, 0.369)',
                  borderBlockStyle: 'solid',
                }}
              ></div>
            </Col>
          );
        })}
    </Row>
  );
});
