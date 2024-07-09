import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Form, Modal, Row, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineTableBar, MdTableBar } from 'react-icons/md';
import { TableRestaurant } from '../../../../../types/table/table';
import { TableController } from '../../../../../controller/table/table.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { SellOrderAdd } from './sell.order.add';
import { OrderController } from '../../../../../controller/order/order.controller';
import { Order } from '../../../../../types/order/order';
import { GiHotMeal } from 'react-icons/gi';
import { NewNameTableForm } from './new.name.table.form';
import './order.css';
import { GrUpdate } from 'react-icons/gr';

const changeTableValues = {
  table01: 0,
  table02: 0,
};

export const SellOrderAddTableScreen = () => {
  const [messageApi, contextHolder] = message.useMessage();
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
  const [changeTable, setChangeTable] = useState(changeTableValues);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getTablesRestaurant(true);
  }, [loading]);

  useEffect(() => {
    setInterval(() => {
      getTablesRestaurant();
    }, 30000);
  }, []);

  return (
    <Row className="mt-5">
      {contextHolder}
      <Col span={24} className="text-center">
        <Row justify={'center'}>
          <Col span={5}>
            <Form.Item className="text-center">
              <Button
                type="dashed"
                style={{ height: 80 }}
                onClick={() => {
                  save();
                }}
                block
                icon={<PlusOutlined />}
              >
                <MdOutlineTableBar size={40} />
              </Button>
            </Form.Item>
          </Col>
          <Col span={24} className="mb-4 text-start">
            <Button size="large" onClick={() => getTablesRestaurant(true)}>
              <GrUpdate size={20} />
            </Button>
          </Col>
          <Col span={24}>
            <Row
              gutter={[120, 20]}
              className="tables border border-2 rounded-3"
              style={{ backgroundColor: '#d6d6d6' }}
            >
              {tables.map(({ id, name }, index) => {
                return (
                  <Col key={id} md={8} className="mt-3">
                    <Card
                      hoverable
                      bordered={true}
                      loading={loadingTable}
                      draggable={true}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDragStart={() => {
                        setChangeTable({ ...changeTable, table01: id });
                      }}
                      onDragEnter={() => {
                        setChangeTable({ ...changeTable, table02: id });
                      }}
                      onDrop={changeTableOrders}
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
                    <NewNameTableForm
                      id={id}
                      onUpdate={() => {
                        getTablesRestaurant(true);
                      }}
                    />
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
          width={'75%'}
          footer={() => (
            <>
              <Button onClick={handleOk}>Voltar</Button>
            </>
          )}
        >
          <SellOrderAdd
            getOrders={() => getOrdersByTable(tableId)}
            idTable={tableId}
            total={total}
            loading={loading}
            orders={orders}
            tableName={tableName}
          />
        </Modal>
      </Col>
    </Row>
  );

  async function save() {
    setLoadingTable(true);
    const request = await TableController.store();

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    if (error) {
      messageApi.open({
        key: 'register.tables',
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
      return;
    }
    await getTablesRestaurant();
  }

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
      setAmountPendings(amountPendings);
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

  async function changeTableOrders() {
    const table1 = changeTable.table01;
    const table2 = changeTable.table02;

    if (table1 === table2) {
      return;
    }

    const request = await OrderController.patchTableOrders(table1, table2);

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    if (error) {
      messageApi.open({
        key: 'register.tables',
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
    }

    await getTablesRestaurant();
  }
};
