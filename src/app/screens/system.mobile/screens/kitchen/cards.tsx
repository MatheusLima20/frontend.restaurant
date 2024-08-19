import { Button, Card, Col, Popconfirm, Row, Switch } from 'antd';
import React, { useState } from 'react';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { Order } from '../../../../types/order/order';
import { TableRestaurant } from '../../../../types/table/table';

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
          onConfirm={() => {
            props.patchStatus(processing.id, processing.productId, status);
          }}
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
};
