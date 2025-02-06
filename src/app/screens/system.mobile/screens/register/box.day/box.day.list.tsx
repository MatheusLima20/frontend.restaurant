import { useRef, useState } from "react";

import { Button, Card, Col, List, Row } from "antd";

import dayjs from "dayjs";
import { BiEdit } from "react-icons/bi";
import { BsPrinter } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import { OrderController } from "../../../../../controller/order/order.controller";
import { BoxDay } from "../../../../../types/box.day/box.day";
import { PrintBoxDay } from "./print.box.day";

interface Props {
  valuesTable: BoxDay[];
  loading: boolean;
  getRowValues: (values: BoxDay) => any;
}

const initialValues = {
  id: 0,
  startValue: 0,
  total: 0,
  date: "",
  isCancelled: false,
};

export const BoxDayMobileList = (props: Props) => {
  const loading = props.loading;
  const ref = useRef();

  const [orders, setOrders] = useState([]);
  const [boxDay, setBoxDay] = useState(initialValues);
  const [loadingPrint, setLoadingPrint] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <Row className="m-0 mb-5 justify-content-center">
      <Col span={24}>
        <List
          pagination={{
            position: "bottom",
            pageSize: 3,
            showTotal: () => (
              <div className="text-black">
                <strong>Caixas: {props.valuesTable.length}</strong>
              </div>
            ),
          }}
          grid={{ gutter: 16, column: 1 }}
          loading={loading}
          dataSource={props.valuesTable}
          renderItem={(data) => (
            <List.Item>
              <Card
                title={
                  <Row className="text-center">
                    <Col span={24} className="fs-6">
                      <strong>Caixa: {data.id}</strong>
                    </Col>
                  </Row>
                }
              >
                <Row justify={"space-between"} gutter={[0, 40]}>
                  <Col>Aberto: {data.isOpen ? "Sim" : "Não"}</Col>
                  <Col>
                    Valor Inicial:{" "}
                    {data.startValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Col>
                  <Col>
                    Total Vendido:{" "}
                    {data.totalBoxDay.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Col>
                  <Col>
                    Total Com o Caixa:{" "}
                    {data.grandTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Col>
                  <Col>
                    Data: {dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                  </Col>
                  <Col span={24}>
                    <Row justify={"space-between"} gutter={[10, 20]}>
                      <Col>
                        <Button
                          title="Pedidos Efetuados"
                          onClick={() => {
                            getByBoxDay(data, false);
                          }}
                          loading={loadingPrint}
                        >
                          <BsPrinter size={20} />
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => {
                            getByBoxDay(data, true);
                          }}
                          danger={true}
                          title="Cancelados"
                          loading={loadingPrint}
                        >
                          <BsPrinter size={20} />
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          loading={loadingPrint}
                          onClick={() => {
                            props.getRowValues({
                              id: data.id,
                              isOpen: data.isOpen,
                              createdAt: data.createdAt,
                              ...(data as any),
                            });
                          }}
                        >
                          <BiEdit size={20} />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </Col>
      <PrintBoxDay
        ref={ref}
        orders={orders}
        id={boxDay.id}
        total={boxDay.total}
        date={boxDay.date}
        isCancelled={boxDay.isCancelled}
      />
    </Row>
  );

  async function getByBoxDay(values: BoxDay, isCancelled: boolean) {
    setOrders([]);
    setLoadingPrint(true);
    const request = await OrderController.getByBoxDay(values.id, isCancelled);

    const data = request.data;
    const orders = data.orders;
    const total = data.total;

    if (orders) {
      setBoxDay({
        id: values.id,
        startValue: values.startValue,
        total: total,
        date: values.createdAt,
        isCancelled: isCancelled,
      });
      setOrders(orders);
    }
    setTimeout(() => {
      setLoadingPrint(false);
      handlePrint();
    }, 1000);
  }
};
