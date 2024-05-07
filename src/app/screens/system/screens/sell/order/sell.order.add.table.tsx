import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineTableBar, MdRemoveCircle, MdTableBar } from 'react-icons/md';
import './order.css';
import { BiEdit } from 'react-icons/bi';
import { TableRestaurant } from '../../../../../types/table/table';
import { TableController } from '../../../../../controller/table/table.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { SellOrderAdd } from './sell.order.add';
import { OrderController } from '../../../../../controller/order/order.controller';
import { Order } from '../../../../../types/order/order';
import { GiHotMeal } from 'react-icons/gi';

export const SellOrderAddTableScreen = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<TableRestaurant[]>([]);
  const [isOcuppied, setOcuppied] = useState<any[]>([]);
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

  useEffect(() => {
    getTablesRestaurant();
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
          <Col span={24}>
            <Row gutter={[70, 20]} className="tables border">
              {tables.map(({ id, name }, index) => (
                <Col key={id} md={8} className="mt-3">
                  <Card
                    hoverable
                    loading={loadingTable}
                    draggable={true}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDragStart={() => {
                      console.log(id, ' start');
                    }}
                    onDragEnter={() => {
                      console.log(id, ' end');
                    }}
                    onDrop={() => {
                      console.log('ok');
                    }}
                    cover={
                      <span>
                        {isOcuppied[index] ? (
                          <GiHotMeal
                            onClick={() => {
                              showModal();
                              getOrdersByTable(id);
                              setTableId(id);
                              setTableName(name);
                            }}
                            size={100}
                          />
                        ) : (
                          <MdTableBar
                            onClick={() => {
                              showModal();
                              getOrdersByTable(id);
                              setTableId(id);
                              setTableName(name);
                            }}
                            size={100}
                          />
                        )}
                      </span>
                    }
                  >
                    {name}
                  </Card>
                  <Button type="text" size="large">
                    <BiEdit size={30} />
                  </Button>
                  <Button type="text" danger size="large">
                    <MdRemoveCircle size={30} />
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Modal
          open={isModalOpen}
          onCancel={() => {
            handleOk();
            getTablesRestaurant();
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

  async function getTablesRestaurant() {
    setLoadingTable(true);
    const request = await TableController.get();

    const data = request.data;

    const tables = data.tables;
    const isOcuppied = data.isOcuppied;

    if (data) {
      setTables(tables);
      setOcuppied(isOcuppied);
    }
    setTimeout(() => {
      setLoadingTable(false);
    }, 1000);
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
};
