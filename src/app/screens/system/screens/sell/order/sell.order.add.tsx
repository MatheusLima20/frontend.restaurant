import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  List,
  Popconfirm,
  Row,
  Select,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { GiMeal, GiReceiveMoney } from "react-icons/gi";
import { ProvisionsController } from "../../../../../controller/provisions/provisions.controller";
import { Order } from "../../../../../types/order/order";
import { OrderController } from "../../../../../controller/order/order.controller";
import { TranslateController } from "../../../../../controller/translate/translate.controller";
import { FaGlassWater } from "react-icons/fa6";
import { BiEditAlt, BiPrinter } from "react-icons/bi";
import { Product } from "../../../../../types/product/product";
import { StringFormatter } from "../../../../../util/string.formatter/string.formatter";
import { BsPrinterFill, BsSend, BsTrash } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import { PrintBill } from "./print.bill";
import { PrintOrder } from "./print.order";
import dayjs from "dayjs";
import { RawMaterialController } from "../../../../../controller/raw.material/raw.material.controller";
import { ResponseError } from "../../../../../types/axios/response.error";
import { OrginizeArrays } from "../../../../../util/arrays/organize";

interface Props {
  idTable: number;
  orders: Order[];
  total: number;
  tableName: string;
  pendings: Order[];
  loading: boolean;
  getOrders: () => any;
  onUpdate: () => any;
}

const initialValues = {
  orderId: 0,
  productId: 0,
  productName: "",
  observation: "",
  amount: 0,
  paymentMethod: "credito",
};

const txtButtonSave = "Salvar";

const txtButtonSubtract = "Subtrair";

export const SellOrderAdd = (props: Props) => {
  const billRef = useRef();
  const checkedBillRef = useRef();
  const orderRef = useRef();
  const pendings = props.pendings;

  const handlePrintCheckedBill = useReactToPrint({
    content: () => checkedBillRef.current,
  });

  const handlePrintBill = useReactToPrint({
    content: () => billRef.current,
  });

  const handlePrintOrder = useReactToPrint({
    content: () => orderRef.current,
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [order, setOrder] = useState(initialValues);
  const [products, setProducts] = useState<Product[]>([]);
  const [checkedOrders, setCheckedOrders] = useState<Order[]>([]);
  const [change, setChange] = useState(0);
  const [changeAlone, setChangeAlone] = useState(0);
  const [totalChecked, setTotalChecked] = useState(0);
  const [loandingPrint, setLoadingPrint] = useState(false);

  const orders = props.orders;

  const total = props.total;

  const loading = props.loading;

  useEffect(() => {
    setOrder(initialValues);
    getPlates();
  }, [loading]);

  return (
    <Row justify={"center"} style={{ height: 600 }}>
      {contextHolder}
      <Col span={24} className="text-center">
        <h4>{props.tableName}</h4>
      </Col>
      <Col span={22}>
        <Form
          name="basic"
          autoComplete="on"
          layout={"horizontal"}
          fields={[
            { name: "productName", value: order.productName },
            { name: "amount", value: order.amount },
            { name: "observation", value: order.observation },
          ]}
          onFinish={save}
        >
          <Row justify={"center"} align={"middle"}>
            <Col md={12}>
              <Form.Item
                label="Pedido"
                name="productName"
                rules={[
                  {
                    message: "Por favor, selecione um prato!",
                    required: true,
                  },
                ]}
              >
                <Select
                  showSearch
                  value={order.productName}
                  onSelect={(_value, values) => {
                    setOrder({
                      ...order,
                      productName: values.label,
                      productId: values.value,
                      amount: order.orderId === 0 ? 1 : 0,
                    });
                  }}
                  placeholder="Selecione..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (
                      StringFormatter.replaceSpecialChars(
                        option?.label
                      ).toLowerCase() ?? ""
                    ).includes(
                      StringFormatter.replaceSpecialChars(input).toLowerCase()
                    )
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={products.map((value) => {
                    return {
                      value: value.id as number,
                      label: `${value.name} R$ ${value.value.toLocaleString(
                        "pt-br",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}`,
                    };
                  })}
                />
              </Form.Item>
            </Col>

            <Col md={8}>
              <Form.Item
                label="Quantidade"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Digite a quantidade!",
                  },
                ]}
              >
                <Input
                  type="number"
                  name="amount"
                  value={order.amount}
                  onChange={(event) => {
                    const value = Number.parseFloat(event.target.value);
                    setOrder({ ...order, amount: value });
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Obs:"
                name="observation"
                rules={[
                  {
                    message: "Digite a observação!",
                  },
                ]}
              >
                <Input
                  name="observation"
                  value={order.observation}
                  onChange={(event) => {
                    const value = event.target.value;
                    setOrder({ ...order, observation: value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row
              justify={"center"}
              gutter={[40, 30]}
              className="mt-2 text-center"
            >
              <Col>
                <Button
                  type="primary"
                  disabled={order.orderId !== 0 || loading}
                  htmlType="submit"
                >
                  {txtButtonSave}
                </Button>
              </Col>
              <Col>
                <Button
                  type="dashed"
                  disabled={order.orderId === 0}
                  onClick={() => {
                    const amount = order.amount;

                    setOrder({ ...order, amount: amount });
                  }}
                  htmlType="submit"
                >
                  {txtButtonSubtract}
                </Button>
              </Col>
              <Col>
                <Button
                  type="default"
                  htmlType="reset"
                  onClick={() => {
                    setOrder(initialValues);
                  }}
                >
                  Limpar
                </Button>
              </Col>
              <PrintOrder
                ref={orderRef}
                tableName={props.tableName}
                orders={[
                  {
                    productName: order.productName.split("R$")[0],
                    amount: order.amount,
                  },
                ]}
              />
            </Row>
          </Form.Item>
        </Form>
      </Col>
      <Col className="orders" md={24} style={{ height: 250 }}>
        <List
          size="small"
          loading={loading}
          bordered
          dataSource={orders}
          header={
            <Row justify={"space-between"} align={"middle"} className="mb-3">
              <Col>
                <Button
                  onClick={handlePrintBill}
                  disabled={!orders.length}
                  size="large"
                  title="Imprimir Conta"
                >
                  <BsPrinterFill size={20} />
                </Button>
                <PrintBill
                  ref={billRef}
                  tableName={props.tableName}
                  orders={orders}
                  total={total}
                />
                <PrintBill
                  ref={checkedBillRef}
                  tableName={props.tableName}
                  orders={checkedOrders}
                  total={totalChecked}
                />
              </Col>
              <Col>
                Total
                {StringFormatter.realNumber(total)}
              </Col>
              <Col md={3}>
                <Input
                  type="number"
                  placeholder="Valor Pago"
                  onChange={(event) => {
                    const value: number = Number.parseFloat(event.target.value);
                    if (isNaN(value)) {
                      setChange(0);
                      return;
                    }
                    const change = value - total;
                    setChange(change);
                  }}
                />
              </Col>
              <Col>
                <Popconfirm
                  title="Enviar Para a Cozinha."
                  description="Deseja realmente enviar pedidos?"
                  onConfirm={sendCook}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button
                    disabled={!pendings.length}
                    title="Enviar para cozinha"
                    size="large"
                  >
                    <BsSend size={20} />
                  </Button>
                </Popconfirm>
              </Col>
              <Col>
                Troco
                {StringFormatter.realNumber(change)}
              </Col>
              <Col>
                <Select
                  defaultValue="credito"
                  style={{ width: 120 }}
                  value={order.paymentMethod}
                  onChange={(value: string) => {
                    setOrder({ ...order, paymentMethod: value });
                  }}
                  options={[
                    { value: "debito", label: "Débito" },
                    { value: "dinheiro", label: "Dinheiro" },
                    { value: "credito", label: "Crédito" },
                    { value: "pix", label: "Pix" },
                  ]}
                />
              </Col>
              <Col>
                <Popconfirm
                  title="Fechar Conta"
                  description="Deseja realmente fechar a conta?"
                  onConfirm={() => closeOrders(orders)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button
                    title="Fechar Conta"
                    danger
                    size="large"
                    disabled={!orders.length}
                  >
                    <GiReceiveMoney size={20} />
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          }
          renderItem={(item) => {
            const status = item.status;
            let backColor = "rgba(248, 92, 92, 0.2)";

            if (status === "processando") {
              backColor = "rgba(92, 191, 248, 0.2)";
            }

            if (status === "finalizado") {
              backColor = "rgba(0, 255, 0, 0.2)";
            }

            return (
              <List.Item
                key={item.id}
                style={{
                  backgroundColor: backColor,
                }}
                actions={[
                  <Checkbox
                    key={item.id}
                    onChange={(event) => {
                      const isChecked = event.target.checked;

                      const totalItem = item.value * item.amount;

                      const value = isChecked
                        ? totalChecked + totalItem
                        : totalChecked - totalItem;
                      setTotalChecked(value);

                      if (isChecked) {
                        checkedOrders.push(item);
                      } else {
                        const newArray = checkedOrders.filter(
                          (value) => value.id !== item.id
                        );
                        setCheckedOrders(newArray);
                      }
                    }}
                  ></Checkbox>,
                  <Button
                    key={item.id}
                    loading={loandingPrint}
                    onClick={() => {
                      setOrder({
                        ...order,
                        productName: item.productName,
                        amount: item.amount,
                      });
                      setLoadingPrint(true);
                      setTimeout(() => {
                        handlePrintOrder();
                        setLoadingPrint(false);
                      }, 500);
                    }}
                  >
                    <BiPrinter size={20} />
                  </Button>,
                  <Button
                    key={item.id}
                    loading={loandingPrint}
                    onClick={() => {
                      setOrder({
                        ...order,
                        orderId: item.id,
                        productName:
                          item.productName +
                          StringFormatter.realNumber(item.value),
                        productId: products.find(
                          (value) => value.name === item.productName
                        ).id,
                        amount: item.amount,
                      });
                    }}
                  >
                    <BiEditAlt size={20} />
                  </Button>,
                  <Popconfirm
                    key={item.id}
                    title="Cancelar Pedido"
                    description="Deseja realmente cancelar o pedido?"
                    onConfirm={() => {
                      cancel(item.id);
                    }}
                    okText="Sim"
                    cancelText="Não"
                  >
                    <Button
                      danger={true}
                      loading={loandingPrint}
                      onClick={() => {
                        setOrder({
                          ...order,
                          productName: item.productName,
                          amount: item.amount * -1,
                        });
                      }}
                    >
                      <BsTrash size={20} />
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    item.productType === "BEBIDA" ? (
                      <FaGlassWater size={25} />
                    ) : (
                      <GiMeal size={30} />
                    )
                  }
                  title={
                    <strong style={{ fontSize: 14 }}>{item.productName}</strong>
                  }
                  description={
                    <div>
                      <div>
                        {StringFormatter.realNumber(item.value * item.amount)}
                        Quantidade: {item.amount}
                      </div>
                      <div>Garçom: {item.createdBy}</div>
                      {item.observation && <div>Obs: {item.observation}</div>}
                      <div>
                        Criado às {dayjs(item.createdAt).format("HH:mm:ss")}
                      </div>
                    </div>
                  }
                ></List.Item.Meta>
              </List.Item>
            );
          }}
        />
      </Col>

      <Col span={24}>
        <Row justify={"space-evenly"} align={"middle"}>
          <Col>
            <Button
              disabled={checkedOrders.length === 0}
              onClick={handlePrintCheckedBill}
            >
              <BiPrinter size={20} />
            </Button>
          </Col>
          <Col>
            <Input
              type="number"
              placeholder="Valor Pago"
              onChange={(event) => {
                const value: number = Number.parseFloat(event.target.value);
                if (isNaN(value)) {
                  setChangeAlone(0);
                  return;
                }
                const change = value - totalChecked;
                setChangeAlone(change);
              }}
            />
          </Col>
          <Col>
            Total Individual: {StringFormatter.realNumber(totalChecked)}
          </Col>
          <Col>Troco: {StringFormatter.realNumber(changeAlone)}</Col>
          <Col>
            <Popconfirm
              title="Fechar Pedido"
              description="Deseja realmente fechar o(s) pedido(s)?"
              onConfirm={() => {
                closeOrders(checkedOrders);
              }}
              okText="Sim"
              cancelText="Não"
            >
              <Button
                title="Fechar Pedido"
                danger
                size="large"
                disabled={!checkedOrders.length}
              >
                <GiReceiveMoney size={20} />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  async function save(values: any) {
    const idOrder = order.orderId;

    let request: ResponseError;

    const observation = order.observation ? order.observation : undefined;

    if (!idOrder) {
      request = await OrderController.store({
        idProduct: order.productId,
        idTable: props.idTable,
        amount: values.amount,
        observation: observation,
      } as any);
    } else {
      request = await OrderController.patchSubtract(idOrder, {
        productId: order.productId,
        amount: values.amount,
      } as any);

      const isPrint = values.amount < 0;
      if (isPrint && !request.error) {
        handlePrintOrder();
      }
    }

    const error = request.error;

    const message = request.message;

    const type = error ? "error" : "success";

    const tranlateMessage = await TranslateController.get(message);

    messageApi.open({
      key: "register.orders",
      type: type,
      content: tranlateMessage.text,
      duration: 4,
    });
    if (!error) {
      setOrder(initialValues);
      setTimeout(() => {
        props.getOrders();
        props.onUpdate();
      }, 500);
    }
  }

  async function cancel(id: number) {
    const idOrder = id;
    handlePrintOrder();
    const request = await OrderController.patch(idOrder, {
      isCancelled: true,
      isOpen: false,
    } as any);

    const error = request.error;

    const message = request.message;

    const type = error ? "error" : "success";

    const tranlateMessage = await TranslateController.get(message);

    await props.getOrders();

    if (type === "success") {
      props.onUpdate();
    }

    messageApi.open({
      key: "register.orders",
      type: type,
      content: tranlateMessage.text,
      duration: 4,
    });
  }

  async function closeOrders(orders: Order[]) {
    setChange(0);
    setTotalChecked(0);
    let request;

    for (let index = 0; index < orders.length; index++) {
      const value = orders[index];
      request = await OrderController.patch(orders[index].id, {
        isOpen: false,
        paymentMethod: order.paymentMethod,
        status: "finalizado",
      } as any);
      if (value.status !== "finalizado") {
        patchLowStock(value.id, value.productId);
      }
    }

    const error = request.error;

    const message = request.message;

    const type = error ? "error" : "success";

    const tranlateMessage = await TranslateController.get(message);

    messageApi.open({
      key: "register.orders",
      type: type,
      content: tranlateMessage.text,
      duration: 4,
    });
    if (!error) {
      setCheckedOrders([]);
      setTimeout(() => {
        props.getOrders();
        props.onUpdate();
      }, 500);
    }
  }

  async function patchLowStock(orderId: number, productId: number) {
    const request = await RawMaterialController.patchLowStock(
      orderId,
      productId
    );

    const error = request.error;

    const message = request.message;

    const type = error ? "error" : "success";

    const tranlateMessage = await TranslateController.get(message);

    if (error) {
      setTimeout(() => {
        messageApi.open({
          key: "stock.products",
          type: type,
          content: tranlateMessage.text,
          duration: 4,
        });
      }, 1000);
    }
  }

  async function getPlates() {
    setTotalChecked(0);
    setCheckedOrders([]);
    const request = await ProvisionsController.getPlates();

    const data: Product[] = request.data;
    if (data) {
      setProducts(data.filter((product) => product.show));
    }
  }

  async function patchStatus(orders: any) {
    await OrderController.patchs(orders, "processando");

    setTimeout(() => {
      props.getOrders();
      props.onUpdate();
    }, 500);
  }

  async function sendCook() {
    const pendingOrders = pendings.filter(
      (pending) => pending.status === "pendente"
    );
    const orders = OrginizeArrays.groupBy(pendingOrders, "idTable");
    await patchStatus(orders);
  }
};
