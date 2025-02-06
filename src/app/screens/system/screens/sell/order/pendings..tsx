import { useRef, useState } from 'react';
import { Badge, Button, Col, Modal, Popconfirm, Row } from 'antd';
import { BiPrinter } from 'react-icons/bi';
import { Order } from '../../../../../types/order/order';
import { useReactToPrint } from 'react-to-print';
import { PrintPendings } from './print.pendings';
import { TableRestaurant } from '../../../../../types/table/table';
import { OrderController } from '../../../../../controller/order/order.controller';
import { OrginizeArrays } from '../../../../../util/arrays/organize';
import { BsEyeFill, BsSend } from 'react-icons/bs';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const printPendings = useRef();

  const handlePrintPendings = useReactToPrint({
    content: () => printPendings.current,
    removeAfterPrint: true,
  });

  return (
    <Row>
      <Col>
        <Badge count={pendings.length}>
          <Button title="Pedidos Pendentes" onClick={showModal} disabled={!pendings.length}>
            <BsEyeFill />
          </Button>
        </Badge>
      </Col>
      <Col>
        <Modal
          open={isModalOpen}
          onCancel={() => {
            handleOk();
          }}
          style={{ top: 20 }}
          width={'75%'}
          footer={() => (
            <Row justify={'space-between'}>
              <Col>
                <Button
                  title="Imprimir"
                  onClick={() => {
                    handlePrintPendings();
                  }}
                  size="large"
                >
                  <BiPrinter size={20} />
                </Button>
              </Col>
              <Col>
                <Popconfirm
                  title="Enviar Para a Cozinha."
                  description="Deseja realmente enviar pedidos?"
                  onConfirm={sendCook}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button title="Enviar para cozinha" size="large">
                    <BsSend size={20} />
                  </Button>
                </Popconfirm>
              </Col>
              <Col>
                <Button title="voltar" size="large" onClick={handleOk}>
                  Voltar
                </Button>
              </Col>
            </Row>
          )}
        >
          <PrintPendings
            ref={printPendings}
            orders={pendings}
            tables={tables}
          />
        </Modal>
      </Col>
    </Row>
  );

  async function patchStatus(orders: any) {
    await OrderController.patchs(orders, 'processando');

    setTimeout(() => {
      props.update();
    }, 500);
  }

  async function sendCook() {
    const pendingOrders = pendings.filter(
      (pending) => pending.status === 'pendente',
    );
    const orders = OrginizeArrays.groupBy(pendingOrders, 'idTable');
    await patchStatus(orders);
    handleOk();
  }
};
