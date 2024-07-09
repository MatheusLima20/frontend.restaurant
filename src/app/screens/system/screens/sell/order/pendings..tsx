import React, { useRef } from 'react';
import { Badge, Button, Col, Row } from 'antd';
import { BiPrinter } from 'react-icons/bi';
import { Order } from '../../../../../types/order/order';
import { useReactToPrint } from 'react-to-print';
import { PrintPendings } from './print.pendings';
import { TableRestaurant } from '../../../../../types/table/table';
import { OrderController } from '../../../../../controller/order/order.controller';

type Props = {
  tables: TableRestaurant[];
  pendings: Order[];
  update: () => any;
};

export const Pendings = (props: Props) => {
  const tables = props.tables;
  const pendings = props.pendings;

  const printPendings = useRef();

  const handlePrintPendings = useReactToPrint({
    content: () => printPendings.current,
  });

  return (
    <Row>
      <Col>
        <Badge count={pendings.length}>
          <Button
            disabled={!pendings.length}
            onClick={() => {
              handlePrintPendings();
              for (let index = 0; index < pendings.length; index++) {
                const order = pendings[index];
                if (order.status === 'pendente') {
                  patchStatus(order.id);
                }
              }
            }}
            size="large"
          >
            <BiPrinter size={20} />
          </Button>
        </Badge>
      </Col>
      <Col>
        <PrintPendings ref={printPendings} orders={pendings} tables={tables} />
      </Col>
    </Row>
  );

  async function patchStatus(id: number) {
    const orderId = id;

    await OrderController.patch(orderId, {
      status: 'processando',
    } as any);

    props.update();
  }
};
