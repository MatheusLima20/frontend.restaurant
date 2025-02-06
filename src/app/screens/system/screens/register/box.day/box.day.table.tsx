import { Button, Col, message, Modal, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsPrinter } from "react-icons/bs";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { OrderController } from "../../../../../controller/order/order.controller";
import { BoxDay } from "../../../../../types/box.day/box.day";
import { PrintBoxDay } from "./print.box.day";
import { WithdrawalForm } from "./withdrawal.or.reinforcement/withdrawl.reinforcement.form";

interface DataType {
  key: number;
  id: number;
  startValue: number;
  isOpen: boolean;
  createdAt: string;
  totalBoxDay: number;
  grandTotal: number;
  totalWithdrawals: number;
  totalReinforcement: number;
}

interface Props {
  valuesTable: BoxDay[];
  loading: boolean;
  getRowValues: (values: BoxDay) => any;
  update?: () => any;
}

const initialValues = {
  id: 0,
  startValue: 0,
  total: 0,
  date: "",
  isCancelled: false,
};

export const BoxDayTable = (props: Props) => {
  const loading = props.loading;
  const ref = useRef();

  const [orders, setOrders] = useState([]);
  const [boxDay, setBoxDay] = useState(initialValues);
  const [loadingPrint, setLoadingPrint] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isWithdrawal, setIsWithdrawal] = useState(false);

  const [boxdayId, setBoxDayId] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const columns: ColumnsType<DataType> = [
    {
      key: "isOpen",

      title: "Aberto",

      width: 100,

      dataIndex: "isOpen",

      render: (data: any) => {
        return <div>{data ? "Sim" : "Não"}</div>;
      },
    },
    {
      key: "startValue",

      title: "Início",

      dataIndex: "startValue",

      width: 100,

      render: (startValue: number) => {
        return (
          <div>
            {startValue.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
        );
      },
    },
    {
      key: "totalBoxDay",

      title: "Vendas",

      dataIndex: "totalBoxDay",

      width: 150,

      render: (total: number) => {
        return (
          <div>
            {total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
        );
      },
    },
    {
      key: "totalWithdrawals",

      title: "Retiradas",

      dataIndex: "totalWithdrawals",

      width: 100,

      render: (total: number) => {
        return (
          <div>
            {total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
        );
      },
    },
    {
      key: "totalReinforcement",

      title: "Reforço",

      dataIndex: "totalReinforcement",

      width: 120,

      render: (total: number) => {
        return (
          <div>
            {total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
        );
      },
    },
    {
      key: "grandTotal",

      title: "Total",

      dataIndex: "grandTotal",

      width: 150,

      render: (total: number) => {
        return (
          <div>
            {total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
        );
      },
    },
    {
      key: "createdAt",

      title: "Criado em",

      width: 130,

      dataIndex: "createdAt",
    },
    {
      key: "action",

      title: "Ações",

      width: 200,

      fixed: "right",

      render: (data: DataType) => {
        return (
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
            <Col>
              <Button
                title="Retirada"
                disabled={!data.isOpen}
                loading={loadingPrint}
                onClick={() => {
                  setIsWithdrawal(true);
                  setBoxDayId(data.id);
                  showModal();
                }}
              >
                <FaChevronCircleDown color="red" size={20} />
              </Button>
            </Col>
            <Col>
              <Button
                loading={loadingPrint}
                disabled={!data.isOpen}
                onClick={() => {
                  setIsWithdrawal(false);
                  setBoxDayId(data.id);
                  showModal();
                }}
              >
                <FaChevronCircleUp color="green" size={20} />
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Row className="m-0 mb-5 justify-content-center">
      {contextHolder}
      <Col span={24}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={initTable()}
          pagination={{
            defaultPageSize: 5,
            showTotal: () => (
              <div className="text-black">
                <strong>Caixas: {props.valuesTable.length}</strong>
              </div>
            ),
            pageSizeOptions: [5, 10, 20],
          }}
          scroll={{ y: 540, x: 200 }}
        />
      </Col>
      <Col>
        <PrintBoxDay
          ref={ref}
          orders={orders}
          id={boxDay.id}
          total={boxDay.total}
          date={boxDay.date}
          isCancelled={boxDay.isCancelled}
        />
      </Col>
      <Col span={20}>
        <Modal
          open={isModalOpen}
          onCancel={() => {
            handleOk();
          }}
          centered={true}
          width={"50%"}
          footer={() => (
            <>
              <Button onClick={handleOk}>Cancelar</Button>
            </>
          )}
        >
          <WithdrawalForm
            id={boxdayId}
            title={isWithdrawal ? "Retirada" : "Reforço"}
            type={isWithdrawal ? "WITHDRAWALBOXDAY" : "REINFORCEMENTBOXDAY"}
            onSave={(values) => {
              messageApi.open({
                key: "register.boxday.charges",
                type: values.type,
                content: values.text,
                duration: 4,
              });

              if (values.type === "success") {
                handleOk();
                props.update();
              }
            }}
          />
        </Modal>
      </Col>
    </Row>
  );

  function initTable(): DataType[] {
    const valuesData: BoxDay[] = props.valuesTable;

    const values: DataType[] = [];

    valuesData.map((value, index) => {
      const createdAt = dayjs(value.createdAt).format("DD/MM/YYYY HH:mm");

      return values.push({
        key: index,
        id: value.id,
        isOpen: value.isOpen,
        startValue: value.startValue,
        totalWithdrawals: value.totalWithdrawals,
        createdAt: createdAt,
        totalBoxDay: value.totalBoxDay,
        grandTotal: value.grandTotal,
        totalReinforcement: value.totalReinforcement,
      });
    });

    return values;
  }

  async function getByBoxDay(values: DataType, isCancelled: boolean) {
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
