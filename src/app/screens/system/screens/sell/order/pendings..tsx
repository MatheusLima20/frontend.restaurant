import React, { useRef } from 'react';
import { Badge, Button, Col, Row } from 'antd';
import { BiPrinter } from 'react-icons/bi';
import { Order } from '../../../../../types/order/order';
import { useReactToPrint } from 'react-to-print';
import { PrintPendings } from './print.pendings';
import { TableRestaurant } from '../../../../../types/table/table';
import { OrderController } from '../../../../../controller/order/order.controller';
import { OrginizeArrays } from '../../../../../util/arrays/organize';

type Props = {
  tables: TableRestaurant[];
  pendings: Order[];
  update: () => any;
};

export const Pendings = (props: Props) => {
  const tables = props.tables;
  const pendings = props.pendings.sort((a, b) =>
    OrginizeArrays.sorterByHour(a, b),
  );

  const printPendings = useRef();

  const handlePrintPendings = useReactToPrint({
    content: () => printPendings.current,
    onAfterPrint: () => {
      const pendingOrders = pendings.filter(
        (pending) => pending.status === 'pendente',
      );
      const orders = OrginizeArrays.groupBy(pendingOrders, 'idTable');
      patchStatus(orders);
    },
    removeAfterPrint: true,
  });

  return (
    <Row>
      <Col>
        <Badge count={pendings.length}>
          <Button
            onClick={() => {
              handlePrintPendings();
            }}
            disabled={!pendings.length}
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

  async function patchStatus(orders: any) {
    await OrderController.patchs(orders, 'processando');

    props.update();
  }
};
