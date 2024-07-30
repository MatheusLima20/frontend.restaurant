import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Modal, Row } from 'antd';
import { TableRestaurant } from '../../../../../types/table/table';
import { TableController } from '../../../../../controller/table/table.controller';
import { SellOrderAddMobile } from './sell.order.add.mobile';
import { OrderController } from '../../../../../controller/order/order.controller';
import { Order } from '../../../../../types/order/order';
import { GiHotMeal } from 'react-icons/gi';
import './order.css';
import { MdTableBar } from 'react-icons/md';
import * as io from 'socket.io-client';
import { baseURL } from '../../../../../config/axios';
import { UserDataLogged } from '../../../../../types/user/user';
import { cookies } from '../../../../../controller/user/adm.cookies';

type Props = {
  style?: any;
};

const socket = io.connect(baseURL);

const user: UserDataLogged = cookies.get('data.user');
const platform = user.platformId;

export const SellOrderAddTableScreen = (props: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<TableRestaurant[]>([]);
  const [isOcuppied, setOcuppied] = useState<any[]>([]);
  const [amountPendings, setAmountPendings] = useState<any[]>([]);

  const [tableId, setTableId] = useState(0);
  const [tableName, setTableName] = useState('');

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const sendOrders = () => {
    socket.emit('send_orders', { message: 'ok', platform });
  };

  useEffect(() => {
    socket.emit('platform', platform);
  }, []);

  useEffect(() => {
    getTablesRestaurant(true);
  }, [loading]);

  useEffect(() => {
    socket.on('receive_orders', () => {
      getTablesRestaurant();
    });
  }, [socket]);

  return (
    <Row style={props.style} justify={'center'}>
      <Col span={24} className="text-center">
        <Row justify={'center'}>
          <Col span={24}>
            <Row
              gutter={[0, 30]}
              className="tables border border-2 rounded-3"
              style={{ backgroundColor: '#d6d6d6' }}
              justify={'center'}
            >
              {tables.map(({ id, name }, index) => {
                return (
                  <Col key={id} span={20} className="mt-3">
                    <Card
                      hoverable
                      bordered={true}
                      loading={loadingTable}
                      draggable={true}
                      onClick={() => {
                        showModal();
                        getOrdersByTable(id);
                        setTableId(id);
                        setTableName(name);
                      }}
                      cover={
                        <span>
                          {isOcuppied[index] ? (
                            amountPendings[index] !== 0 ? (
                              <Badge count={amountPendings[index]}>
                                <GiHotMeal size={100} />
                              </Badge>
                            ) : (
                              <GiHotMeal size={100} />
                            )
                          ) : (
                            <MdTableBar size={100} />
                          )}
                        </span>
                      }
                    >
                      {name}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Modal
          open={isModalOpen}
          onCancel={() => {
            handleOk();
            getTablesRestaurant(true);
          }}
          style={{ top: 20 }}
          width={'100%'}
          footer={() => (
            <>
              <Button onClick={handleOk}>Voltar</Button>
            </>
          )}
        >
          <SellOrderAddMobile
            getOrders={() => getOrdersByTable(tableId)}
            idTable={tableId}
            total={total}
            loading={loading}
            orders={orders}
            tableName={tableName}
            onUpdate={sendOrders}
          />
        </Modal>
      </Col>
    </Row>
  );

  async function getTablesRestaurant(hasLoading?: boolean) {
    if (hasLoading) {
      setLoadingTable(true);
    }

    const request = await TableController.get();

    const data = request.data;

    const tables = data.tables;
    const isOcuppied = data.isOcuppied;
    const amountPendings = data.amountPendings;

    if (data) {
      setTables(tables);
      setOcuppied(isOcuppied);
      setPendings(tables, amountPendings);
    }
    if (hasLoading) {
      setTimeout(() => {
        setLoadingTable(false);
      }, 1000);
    }
  }

  async function getOrdersByTable(id: number) {
    setLoading(true);
    setOrders([]);
    const request = await OrderController.getByTable(id);

    const data = request.data;
    const orders = data.orders;
    const total = data.total;

    setTotal(total);

    setTimeout(() => {
      if (orders) {
        setOrders(orders);
      }
      setLoading(false);
    }, 500);
  }

  function setPendings(tables: any, amountPendings: any) {
    const ordersPendings: Order[] = amountPendings;
    const amountOrdersPendings = [];
    for (let index = 0; index < tables.length; index++) {
      const amount = ordersPendings.filter(
        (value) => value.idTable === tables[index].id,
      ).length;
      amountOrdersPendings.push(amount);
    }
    setAmountPendings(amountOrdersPendings);
  }
};
