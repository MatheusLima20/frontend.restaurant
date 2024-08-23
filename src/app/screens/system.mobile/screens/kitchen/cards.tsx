import { Button, Card, Col, message, Popconfirm, Row, Switch } from 'antd';
import React, { useState } from 'react';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { Order } from '../../../../types/order/order';
import { TableRestaurant } from '../../../../types/table/table';
import { RawMaterialController } from '../../../../controller/raw.material/raw.material.controller';
import { TranslateController } from '../../../../controller/translate/translate.controller';

interface Props {
  order: Order;
  tables: TableRestaurant[];
  patchStatus: (id: number, productId: number, status: string) => void;
}

export const Cards = (props: Props) => {
  const processing = props.order;
  const isCancelled = processing.isCancelled;
  const status = isCancelled ? 'cancelado' : 'finalizado';
  const textWhite = isCancelled ? 'text-white' : '';
  const table = props.tables.find((table) => table.id === processing.idTable);
  const [low, setLow] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Card
      title={
        <div className={`text-center fs-1 ${textWhite}`}>{table.name}</div>
      }
      bordered={true}
      style={{
        backgroundColor: !isCancelled ? '#b5b5b5' : 'red',
      }}
      hoverable
      actions={[
        <Popconfirm
          key={processing.id}
          title="Finalizar pedido."
          description="Deseja realmente finalizar o pedido?"
          onConfirm={onConfirm}
          okText="Sim"
          cancelText="Não"
        >
          <Button size="large" type="text">
            {isCancelled ? (
              <BiXCircle size={40} color="red" />
            ) : (
              <BiCheckCircle size={40} color="green" />
            )}
          </Button>
        </Popconfirm>,
      ]}
    >
      <Row className="m-5">
        {contextHolder}
        <Col span={24} className={`text-center ${textWhite}`}>
          <h3>
            <strong>{isCancelled ? 'Cancelado' : ''}</strong>
          </h3>
        </Col>
        <Col span={24} className={`text-center ${textWhite}`}>
          <h3>
            <strong>{processing.productName}</strong>
          </h3>
          {processing.observation && (
            <h4>
              <strong>OBS: {processing.observation}</strong>
            </h4>
          )}
          <h4>
            <strong>x {processing.amount}</strong>
          </h4>
          {isCancelled && (
            <div>
              <Switch
                title="Baixa automatica"
                size="default"
                checkedChildren="Da Baixa"
                unCheckedChildren="Não dá Baixa"
                defaultChecked={false}
                onChange={() => setLow(!low)}
              />
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );

  function onConfirm() {
    const orderId = processing.id;
    const productId = processing.productId;
    props.patchStatus(orderId, productId, status);
    if (low) {
      patchLowStock(orderId, productId);
    }
    if (status !== 'cancelado') {
      patchLowStock(orderId, productId);
    }
  }

  async function patchLowStock(orderId: number, productId: number) {
    const request = await RawMaterialController.patchLowStock(
      orderId,
      productId,
    );

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    if (error) {
      setTimeout(() => {
        messageApi.open({
          key: 'stock.products',
          type: type,
          content: tranlateMessage.text,
          duration: 4,
        });
      }, 1000);
    }
  }
};
